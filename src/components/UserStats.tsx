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
  // Styles for the user stats container
  padding: 10,
  flexDirection: "column",
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
          <ProgressBar
            maxWidth={300}
            maxValue={user.maxExp}
            value={user.currentExp}
            color="blue"
            height={30}
            showText={true}
          />
          <Stack flexDirection="row" justifyContent="space-between">
            <ProgressBar
              maxWidth={140}
              maxValue={user.maxHp}
              value={user.currentHp}
              color="red"
              height={25}
              showText={true}
            />
            <Text>Level: {user.characterLevel}</Text>
            <ProgressBar
              maxWidth={140}
              maxValue={user.maxMana}
              value={user.currentMana}
              color="purple"
              height={25}
              showText={true}
            />
          </Stack>
        </>
      )}
    </UserStatsContainer>
  );
};

export default UserStats;
