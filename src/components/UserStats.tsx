import React, { useState, useEffect, useContext } from "react";
import { Image, Stack, styled, Text } from "tamagui";
import ProgressBar from "./ProgressBar"; // Import your ProgressBar component
import { AuthContext } from "../context/AuthContext"; // Assuming you have this context
import StatCard from "./StatCard";
import Icon from "./Icon";

type User = {
  characterLevel: number;
  maxExp: number;
  currentExp: number;
  maxHp: number;
  currentHp: number;
  maxMana: number;
  currentMana: number;
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
  const [user, setUser] = useState<User | null>(null);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.0.115:8080/api/user", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  return (
    <UserStatsContainer>
      {user && (
        <>
          <ProgressBarContainer>
            <ProgressBar
              maxWidth={300}
              maxValue={user.maxExp}
              value={user.currentExp}
              color="#D9B600"
              height={25}
              showText={true}
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
            maxValue={100}
            value={70}
            level={10}
          />
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/sword.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="AGI"
            maxValue={100}
            value={60}
            level={10}
          />
        </Stack>

        <Stack flex={2} alignItems="center" justifyContent="center">
          <Image
            source={require("../assets/armour/fox/SteelPlatedArmor.png")}
            style={{ width: 200, height: 290, zIndex: -1 }}
          />
        </Stack>

        <Stack flex={1} flexDirection="column">
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/sword.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="INT"
            maxValue={100}
            value={80}
            level={10}
          />
          <StatCard
            icon={
              <Icon
                source={require("../assets/images/sword.png")}
                style={{ width: 40, height: 40 }}
              />
            }
            stat="VIT"
            maxValue={100}
            value={90}
            level={10}
          />
        </Stack>
      </HeroSectionContainer>
    </UserStatsContainer>
  );
};

export default UserStats;
