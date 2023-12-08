import React, { useState, useEffect, useContext } from "react";
import { Stack, styled, Text } from "tamagui";
import ProgressBar from "./ProgressBar"; // Import your ProgressBar component
import { AuthContext } from "../context/AuthContext"; // Assuming you have this context

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
  padding: 10,
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
              color="yellow"
              height={20}
              showText={true}
            />
          </ProgressBarContainer>
          <StatsRow>
            <ProgressBar
              maxWidth={140}
              maxValue={user.maxHp}
              value={user.currentHp}
              color="red"
              height={20}
              showText={true}
            />
            <LevelText>Level: {user.characterLevel}</LevelText>
            <ProgressBar
              maxWidth={140}
              maxValue={user.maxMana}
              value={user.currentMana}
              color="blue"
              height={20}
              showText={true}
            />
          </StatsRow>
        </>
      )}
    </UserStatsContainer>
  );
};

export default UserStats;
