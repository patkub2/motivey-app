import React, { useState, useEffect, useContext } from "react";
import { Text, Button, YStack, styled } from "tamagui";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext
import { Modal } from "react-native";
import { parseISO, differenceInSeconds } from "date-fns";

const SkillContainer = styled(YStack, {
  padding: 10,
  borderRadius: 10,
  backgroundColor: "#f0f0f0",
  marginBottom: 10,
  alignItems: "center",
});

const SkillName = styled(Text, {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 5,
});

const SkillDescription = styled(Text, {
  fontSize: 14,
  color: "#666",
  marginBottom: 10,
});

const SkillButton = styled(Button, {
  backgroundColor: "#293558",
  color: "white",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 5,
  variants: {
    disabled: {
      true: {
        backgroundColor: "#A9A9A9", // Gray color when the button is disabled
      },
      false: {
        backgroundColor: "#293558", // Original color when the button is not disabled
      },
    },
  },
});

const SkillStatusText = styled(Text, {
  marginTop: 5,
  fontSize: 12,
  color: "#FF5722",
});

const SkillsGrid = styled(YStack, {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%", // Ensures the grid takes the full width
});

const SkillItem = styled(YStack, {
  width: "48%", // Adjust the width for two items per row
  padding: 10,
  borderRadius: 10,
  backgroundColor: "#f0f0f0",
  marginBottom: 10,
  alignItems: "center",
});

const FullWidthButton = styled(Button, {
  width: "100%", // Button takes full width
  backgroundColor: "#666",
  color: "white",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginTop: 10,
});
interface Skill {
  name: string;
  description: string;
  cooldown: number; // in hours
  activationDuration: number; // in hours
  isActive: boolean;
  remainingActivationTime?: number; // in seconds
  remainingCooldown?: number; // in seconds
}

const skillsData: Skill[] = [
  {
    name: "Life's Bounty",
    description: "Boost VIT tasks",
    cooldown: 2,
    isActive: false,
    activationDuration: 1,
  },
  {
    name: "Titan's Grip",
    description: "Enhance STR tasks",
    cooldown: 6,
    isActive: false,
    activationDuration: 2,
  },
  {
    name: "Iron Resolve",
    description: "Better HP regeneration",
    cooldown: 12,
    isActive: false,
    activationDuration: 3,
  },
  {
    name: "Wisdom Wave",
    description: "Boost INT tasks",
    cooldown: 5,
    isActive: false,
    activationDuration: 1,
  },
  {
    name: "Arcane Insight",
    description: "Enhance mana regeneration",
    cooldown: 4,
    isActive: false,
    activationDuration: 5,
  },
  {
    name: "Nimble Mind",
    description: "Boost AGI tasks",
    cooldown: 2,
    isActive: false,
    activationDuration: 1,
  },
  {
    name: "Mind Surge",
    description: "Gain 50extra MP",
    cooldown: 3,
    isActive: false,
    activationDuration: 0,
  },
  {
    name: "Steadfast",
    description: "Gain 50 extra HP",
    cooldown: 3,
    isActive: false,
    activationDuration: 0,
  },
];

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
};

const SkillsModal = ({ visible, onClose }) => {
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const { userToken } = useContext(AuthContext);

  const updateRemainingTimes = () => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => {
        const updatedSkill = { ...skill };

        // Check if remainingActivationTime is defined and greater than 0
        if (
          updatedSkill.remainingActivationTime &&
          updatedSkill.remainingActivationTime > 0
        ) {
          updatedSkill.remainingActivationTime -= 1;
          updatedSkill.isActive = updatedSkill.remainingActivationTime > 0;
        } else {
          updatedSkill.isActive = false; // Deactivate if remaining time is not positive
        }

        // Check if remainingCooldown is defined and greater than 0
        if (
          updatedSkill.remainingCooldown &&
          updatedSkill.remainingCooldown > 0
        ) {
          updatedSkill.remainingCooldown -= 1;
        }

        return updatedSkill;
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTimes();
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const fetchActiveAbilities = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.115:8080/api/user-abilities",
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch active abilities");
      }

      const activeAbilities = await response.json();
      const currentTime = new Date();
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          const activeAbility = activeAbilities.find(
            (a) =>
              a.abilityType ===
              skill.name.toUpperCase().replace(/[\s\u0027]/g, "_")
          );
          if (activeAbility) {
            const startTime = parseISO(activeAbility.startTime);
            const activationEndTime = new Date(
              startTime.getTime() + skill.activationDuration * 3600000
            );
            const remainingActivationTime = differenceInSeconds(
              activationEndTime,
              currentTime
            );
            return {
              ...skill,
              isActive: remainingActivationTime > 0,
              remainingActivationTime,
            };
          }
          return { ...skill, isActive: false, remainingActivationTime: 0 };
        })
      );
    } catch (error) {
      console.error("Error fetching active abilities:", error);
    }
  };

  const fetchCooldowns = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.115:8080/api/ability-cooldowns",
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cooldowns");
      }

      const cooldowns = await response.json();
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          const cooldown = cooldowns.find(
            (c) =>
              c.abilityType ===
              skill.name.toUpperCase().replace(/[\s\u0027]/g, "_")
          );
          if (cooldown) {
            return { ...skill, remainingCooldown: cooldown.remainingCooldown };
          }
          return skill;
        })
      );
    } catch (error) {
      console.error("Error fetching cooldowns:", error);
    }
  };

  const activateSkill = async (skillName: string) => {
    try {
      // Convert skill name to uppercase and replace spaces with underscores

      const formattedSkillName = skillName
        .toUpperCase()
        .replace(/[\s\u0027]/g, "_");

      // Find the skill details from skillsData
      const skillDetails = skillsData.find((skill) => skill.name === skillName);

      if (!skillDetails) {
        console.error("Skill details not found for:", skillName);
        return;
      }

      const response = await fetch(
        "http://192.168.0.115:8080/api/activate-ability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            abilityType: formattedSkillName,
            effectMagnitude: 10, // You might want to update this based on specific skill details
            duration: `PT${skillDetails.activationDuration}H`, // Using the cooldown as the duration (assuming 1 hour per cooldown unit)
            cooldown: `PT${skillDetails.cooldown}H`, // Example calculation for cooldown
            manaCost: 0, // Assuming zero mana cost, update if needed
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to activate ability");
      }
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.name === skillName
            ? {
                ...skill,
                isActive: true,
                remainingActivationTime: skillDetails.activationDuration * 3600,
                remainingCooldown: skillDetails.cooldown * 3600,
              }
            : skill
        )
      );
      const result = await response.text();
      console.log(result);
      await fetchActiveAbilities();
      await fetchCooldowns();
    } catch (error) {
      console.error("Error activating ability:", error);
    }
  };

  useEffect(() => {
    fetchActiveAbilities();
    fetchCooldowns();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <YStack padding={20} alignItems="center" space>
        <SkillsGrid>
          {skills.map((skill) => (
            <SkillItem key={skill.name}>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
              <SkillButton
                disabled={skill.isActive || (skill.remainingCooldown ?? 0) > 0}
                onPress={() => activateSkill(skill.name)}
              >
                Activate
              </SkillButton>
              {skill.isActive && (
                <SkillStatusText>
                  Active for: {formatTime(skill.remainingActivationTime ?? 0)}
                </SkillStatusText>
              )}
              {skill.remainingCooldown && skill.remainingCooldown > 0 && (
                <SkillStatusText>
                  Cooldown: {formatTime(skill.remainingCooldown)}
                </SkillStatusText>
              )}
            </SkillItem>
          ))}
        </SkillsGrid>
        <FullWidthButton onPress={onClose}>Close</FullWidthButton>
      </YStack>
    </Modal>
  );
};

export default SkillsModal;
