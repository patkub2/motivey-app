import React, { useState, useEffect, useContext } from "react";
import { Button, Image, Stack, styled, Text } from "tamagui";
import ProgressBar from "./ProgressBar"; // Import your ProgressBar component
import { AuthContext } from "../context/AuthContext"; // Assuming you have this context
import StatCard from "./StatCard";
import Icon from "./Icon";
import { GlobalContext } from "../context/GlobalContext"; // Import GlobalContext
import OptionsModal from "./OptionsModal";
import SkillsModal from "./SkillsModal";

type Stat = {
  level: number;
  currentExp: number;
  maxExp: number;
};

const UserStatsContainer = styled(Stack, {
  // Enhanced styles for the user stats container
  paddingHorizontal: 6,
  marginTop: 40, // Add top padding
  alignItems: "center", // Center the content
  flexDirection: "column",
});

const LevelText = styled(Text, {
  // Styling for the level text
  marginHorizontal: 10, // Add horizontal margin for spacing
  alignSelf: "center", // Center the text
});

const ProgressBarContainer = styled(Stack, {
  // Container for individual progress bars
  width: "100%",
  marginBottom: 5, // Add margin at the bottom
  flexDirection: "row", // Align elements horizontally
  display: "flex",
  justifyContent: "space-evenly",
});

const StatsRow = styled(Stack, {
  // Styling for the row containing HP and Mana bars
  flexDirection: "row",
  justifyContent: "space-evenly", // Space elements evenly
  width: "100%",
  marginTop: 5, // Add top margin for spacing

  // borderWidth: 1,
});

const HeroSectionContainer = styled(Stack, {
  flexDirection: "row", // Horizontal layout
  justifyContent: "space-between",
  padding: 10,
});

const UserStats = () => {
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [armour, setArmour] = useState(
    "../assets/armour/fox/SteelPlatedArmor.png"
  );
  const { user, fetchUserData } = useContext(GlobalContext);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    if (userToken) {
      fetchUserData(userToken);
    }
  }, [fetchUserData, userToken]);

  const armorImages = {
    "Adventurer Cloths, Medieval": require("../assets/armour/fox/AdventurerClothsMedieval.png"),
    "Leather Armour": require("../assets/armour/fox/LeatherArmour.png"),
    "Basic Iron Chainmail": require("../assets/armour/fox/BasicIronChainmail.png"),
    "Steel Plated Armor": require("../assets/armour/fox/SteelPlatedArmor.png"),
    "Crystalline Vanguard Armour": require("../assets/armour/fox/CrystallineVanguardArmour.png"),
  };

  return (
    <UserStatsContainer>
      {user && (
        <>
          <ProgressBarContainer>
            <Button
              onPress={() => setSkillsModalVisible(true)}
              width={20}
              height={25}
            >
              <Icon
                source={require("../assets/images/shield.png")}
                style={{ width: 25, height: 25 }}
              />
            </Button>
            <SkillsModal
              visible={skillsModalVisible}
              onClose={() => setSkillsModalVisible(false)}
            />
            <ProgressBar
              maxWidth={300}
              maxValue={user.maxExp}
              value={user.currentExp}
              color="#D9B600"
              height={25}
              showText={true}
            />
            <Button
              onPress={() => setModalVisible(true)}
              width={20}
              height={25}
            >
              <Icon
                source={require("../assets/images/setting-icon.png")}
                style={{ width: 20, height: 20 }}
              />
            </Button>
            <OptionsModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </ProgressBarContainer>
          <StatsRow>
            <ProgressBar
              maxWidth={140}
              maxValue={user.maxHp}
              value={user.currentHp}
              color="#A81725"
              height={20}
              showText={true}
            />
            <LevelText>Level: {user.characterLevel}</LevelText>
            <ProgressBar
              maxWidth={140}
              maxValue={user.maxMana}
              value={user.currentMana}
              color="#1726A8"
              height={20}
              showText={true}
            />
          </StatsRow>
        </>
      )}
      <HeroSectionContainer>
        <Stack flex={1} flexDirection="column">
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/sword.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="STR"
            maxValue={user?.strStat.maxExp ?? 100}
            value={user?.strStat.currentExp ?? 0}
            level={user?.strStat.level ?? 1}
          />
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/coinred.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="AGI"
            maxValue={user?.agiStat.maxExp ?? 100}
            value={user?.agiStat.currentExp ?? 0}
            level={user?.agiStat.level ?? 1}
          />
        </Stack>
        <Stack flex={2} alignItems="center" justifyContent="center">
          <Image
            source={armorImages[String(user?.currentArmorId)]}
            style={{ width: 200, height: 290, zIndex: -1 }}
          />
        </Stack>

        <Stack flex={1} flexDirection="column">
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/book.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="INT"
            maxValue={user?.intStat.maxExp ?? 100}
            value={user?.intStat.currentExp ?? 0}
            level={user?.intStat.level ?? 1}
          />
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/potion.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="VIT"
            maxValue={user?.vitStat.maxExp ?? 100}
            value={user?.vitStat.currentExp ?? 0}
            level={user?.vitStat.level ?? 1}
          />
        </Stack>
      </HeroSectionContainer>
    </UserStatsContainer>
  );
};

export default UserStats;
