import React, { useState, useEffect, useContext } from "react";
import { Text, Button, YStack, styled } from "tamagui";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext
import { Modal } from "react-native";
import { parseISO, differenceInSeconds } from "date-fns";
interface Skill {
  name: string;
  description: string;
  cooldown: number; // in hours
  isActive: boolean;
  remainingTime?: number; // in seconds
}

const skillsData: Skill[] = [
  {
    name: "Life's Bounty",
    description: "Boost VIT tasks",
    cooldown: 2, // 2 Hours cooldown
    isActive: false,
  },
  {
    name: "Titan's Grip",
    description: "Enhance STR tasks",
    cooldown: 6, // 6 Hours cooldown
    isActive: false,
  },
  {
    name: "Iron Resolve",
    description: "Better HP regeneration",
    cooldown: 12, // 12 Hours cooldown
    isActive: false,
  },
  {
    name: "Wisdom Wave",
    description: "Boost INT tasks",
    cooldown: 5, // 5 Hours cooldown
    isActive: false,
  },
  {
    name: "Arcane Insight",
    description: "Enhance mana regeneration",
    cooldown: 4, // 4 Hours cooldown
    isActive: false,
  },
  {
    name: "Nimble Mind",
    description: "Boost AGI tasks",
    cooldown: 2, // 2 Hours cooldown
    isActive: false,
  },
  {
    name: "Mind Surge",
    description: "Gain extra MP",
    cooldown: 3, // 3 Hours cooldown
    isActive: false,
  },
];

const SkillsModal = ({ visible, onClose }) => {
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const { userToken } = useContext(AuthContext);

  const updateRemainingTimes = () => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => {
        // Ensure a default value of 0 if remainingTime is undefined
        const remainingTime = skill.remainingTime ?? 0;

        // Update remaining time for both active skills and cooldowns
        if ((skill.isActive || remainingTime > 0) && remainingTime > 0) {
          return { ...skill, remainingTime: remainingTime - 1 };
        }
        return skill;
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
              a.abilityType === skill.name.toUpperCase().replace(/\s/g, "_")
          );
          if (activeAbility) {
            const startTime = parseISO(activeAbility.startTime);
            const durationInSeconds = differenceInSeconds(
              startTime,
              currentTime
            );
            return {
              ...skill,
              isActive: durationInSeconds > 0,
              remainingTime: durationInSeconds,
            };
          }
          return skill;
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
              c.abilityType === skill.name.toUpperCase().replace(/\s/g, "_")
          );
          return cooldown
            ? { ...skill, remainingTime: cooldown.remainingCooldown }
            : skill;
        })
      );
    } catch (error) {
      // Error handling
    }
  };

  const activateSkill = async (skillName: string) => {
    try {
      // Convert skill name to uppercase and replace spaces with underscores
      const formattedSkillName = skillName.toUpperCase().replace(/\s/g, "_");

      // Find the skill details from skillsData
      const skillDetails = skillsData.find((skill) => skill.name === skillName);

      if (!skillDetails) {
        console.error("Skill details not found for:", skillName);
        return;
      }
      console.log(
        "skillDetails",
        JSON.stringify({
          abilityType: formattedSkillName,
          effectMagnitude: 10, // You might want to update this based on specific skill details
          duration: `PT${skillDetails.cooldown}H`, // Using the cooldown as the duration (assuming 1 hour per cooldown unit)
          cooldown: `PT${skillDetails.cooldown * 2}M`, // Example calculation for cooldown
          manaCost: 0, // Assuming zero mana cost, update if needed
        })
      );
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
            duration: `PT${skillDetails.cooldown}H`, // Using the cooldown as the duration (assuming 1 hour per cooldown unit)
            cooldown: `PT${skillDetails.cooldown * 2}H`, // Example calculation for cooldown
            manaCost: 0, // Assuming zero mana cost, update if needed
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to activate ability");
      }

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
      <YStack>
        {skills.map((skill) => (
          <YStack key={skill.name}>
            <Text>{skill.name}</Text>
            <Text>{skill.description}</Text>
            <Button
              disabled={skill.isActive || (skill.remainingTime ?? 0) > 0}
              onPress={() => activateSkill(skill.name)}
            >
              Activate
            </Button>
            {skill.isActive && (
              <Text>Active for: {skill.remainingTime ?? 0} seconds</Text>
            )}
            {skill.remainingTime && skill.remainingTime > 0 && (
              <Text>Cooldown: {skill.remainingTime} seconds</Text>
            )}
          </YStack>
        ))}

        <Button onPress={onClose}>Close</Button>
      </YStack>
    </Modal>
  );
};

export default SkillsModal;
