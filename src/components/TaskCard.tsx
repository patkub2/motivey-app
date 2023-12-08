import React from "react";
import { Stack, styled, Text, Image } from "tamagui";

type TaskCardProps = {
  executionsCount: number;
  icon: React.ReactNode; // This allows you to pass any React element as an icon
  name: string; // The name of the task, e.g., "10 Push ups"
  description: string; // A short description of the task
  difficultyLevel: number; // Difficulty level indicated by the number of coins
};

const Card = styled(Stack, {
  padding: 10,
  borderRadius: 8,
  borderWidth: 3,
  borderColor: "#E0E0E0",
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});

const TaskInfo = styled(Stack, {
  flexDirection: "column",
  alignItems: "flex-start",
  flex: 1,
});

const TaskName = styled(Text, {
  fontWeight: "bold",
  fontSize: 18,
});

const TaskDescription = styled(Text, {
  color: "#555",
});

const TaskContainer = styled(Stack, {
  flexDirection: "column",
  paddingLeft: 10,
});

const Difficulty = styled(Stack, {
  flexDirection: "row",
});

const Container = styled(Card, {
  marginBottom: 8,
});
// Assuming you have a 'coin.png' in your assets to represent the difficulty
const CoinIcon = () => (
  <Image
    source={require("../assets/images/coin.png")} // Adjust the path to your image file
    style={{ width: 20, height: 20 }}
  />
);

const TaskCard: React.FC<TaskCardProps> = ({
  executionsCount,
  icon,
  name,
  description,
  difficultyLevel,
}) => {
  // Create an array of coins based on the difficulty level
  const coins = Array.from({ length: difficultyLevel }, (_, index) => (
    <CoinIcon key={index} />
  ));

  return (
    <Container>
      <TaskInfo>
        <Stack flexDirection="row" alignItems="center">
          <TaskName>{`${executionsCount}x`}</TaskName>
          {icon}
          <TaskContainer>
            <TaskName>{`${name}`}</TaskName>
            <TaskDescription>{description}</TaskDescription>
          </TaskContainer>
        </Stack>
      </TaskInfo>
      <Difficulty>{coins}</Difficulty>
    </Container>
  );
};

export default TaskCard;
