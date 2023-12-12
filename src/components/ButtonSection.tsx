import React, { useContext, useEffect, useState } from "react";
import { Button, Stack, styled, ScrollView, Image } from "tamagui";
import TaskCard from "./TaskCard";
import { Swipeable } from "react-native-gesture-handler";
import AddTaskButton from "./AddTaskButton";
import { GlobalContext } from "../context/GlobalContext"; // Import GlobalContext
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { View } from "tamagui";

type Task = {
  id: number;
  name: string;
  section: "HABITS" | "CHALLENGES" | "GOALS";
  difficultyLevel: number;
  experience: number;
  dailyExecutionCounter: number;
  completed: boolean;
  type: string;
  icon: string; // Assuming this is a path to an image file
};

type Section = "HABITS" | "CHALLENGES" | "GOALS";

const SectionContainer = styled(Stack, {
  padding: 10,
  width: "100%",
  flex: 1,
});

const ContentSection = styled(ScrollView, {
  height: 200, // Set a static height for the content section
});

const ButtonContainer = styled(Stack, {
  padding: 0,
  paddingHorizontal: 10,
  flexDirection: "row",
  justifyContent: "space-between", // Space buttons evenly
});

const Container = styled(Stack, {
  width: "100%",
  flexDirection: "column", // Stack children vertically
  flex: 1, // Ensure it fills the screen, adjust as necessary
});

const ButtonCustom = styled(Button, {
  // Styles for the button
  width: "31%",
  borderRadius: 20,
  padding: 5,
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  borderWidth: 3,
  borderColor: "#293558",
});

const getIconForType = (type: string) => {
  switch (type) {
    case "INT":
      return require("../assets/images/book.png");
    case "STR":
      return require("../assets/images/sword.png");
    case "AGI":
      return require("../assets/images/coinred.png");
    case "VIT":
      return require("../assets/images/potion.png");
    default:
      return require("../assets/images/test.png"); // Default icon if type doesn't match
  }
};

const ButtonSection = () => {
  const [activeSection, setActiveSection] = useState<Section>("HABITS");
  const { userToken } = useContext(AuthContext);
  const { tasks, fetchTasks, incrementTaskCounter } = useContext(GlobalContext);

  useEffect(() => {
    if (userToken) {
      fetchTasks(userToken);
    }
  }, [fetchTasks, userToken]);

  const handleSwipeRight = async (taskId: number) => {
    if (userToken) {
      await incrementTaskCounter(taskId, userToken);
    }
  };

  const renderRightActions = () => {
    // Return an empty view or a view with desired width to control swipe distance
    return <View style={{ width: 1 }}></View>;
  };

  return (
    <Container>
      <ButtonContainer>
        <ButtonCustom
          onPress={() => setActiveSection("HABITS")}
          style={{
            backgroundColor: activeSection === "HABITS" ? "#293558" : "#3B577D",
          }}
        >
          Habits
        </ButtonCustom>
        <ButtonCustom
          onPress={() => setActiveSection("CHALLENGES")}
          style={{
            backgroundColor:
              activeSection === "CHALLENGES" ? "#293558" : "#3B577D",
          }}
        >
          Challenges
        </ButtonCustom>
        <ButtonCustom
          onPress={() => setActiveSection("GOALS")}
          style={{
            backgroundColor: activeSection === "GOALS" ? "#293558" : "#3B577D",
          }}
        >
          Goals
        </ButtonCustom>
      </ButtonContainer>

      <SectionContainer>
        {["HABITS", "CHALLENGES", "GOALS"].map((section) => (
          <ContentSection
            key={section}
            horizontal={false}
            display={activeSection === section ? "flex" : "none"}
          >
            {tasks
              .filter((task) => task.section === section)
              .map((task) => (
                <Swipeable
                  key={task.id}
                  renderRightActions={renderRightActions}
                  onSwipeableOpen={(direction) => {
                    if (direction === "right") {
                      handleSwipeRight(task.id);
                    }
                  }}
                  friction={2}
                >
                  <TaskCard
                    executionsCount={task.dailyExecutionCounter}
                    icon={
                      <Image
                        source={getIconForType(task.type)}
                        style={{ width: 30, marginHorizontal: 5, height: 30 }}
                        resizeMode="center"
                      />
                    }
                    name={task.name}
                    difficultyLevel={task.difficultyLevel}
                  />
                </Swipeable>
              ))}
            <AddTaskButton />
          </ContentSection>
        ))}
      </SectionContainer>
    </Container>
  );
};

export default ButtonSection;
