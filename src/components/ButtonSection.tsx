import React, { useState, useEffect, useContext, useCallback } from "react";
import { Button, Stack, styled, Text, ScrollView, Image } from "tamagui";
import { AuthContext } from "../context/AuthContext"; // You'll need to implement this
import TaskCard from "./TaskCard";
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
  // Styles for your section container
  padding: 10,
  width: "100%",
  // Ensure the container takes up the full available height minus the button container height
  flex: 1,
});

const ContentSection = styled(ScrollView, {
  // Styles for the scrollable content section
  height: 200, // Set a static height for the content section
});

const ButtonContainer = styled(Stack, {
  // Styles for the button container
  padding: 10,
  flexDirection: "row",
  justifyContent: "space-between",
});

const Container = styled(Stack, {
  // Styles for the outer container
  width: "100%",
  borderWidth: 1,
  flexDirection: "column", // Stack children vertically
  flex: 1, // Ensure it fills the screen, adjust as necessary
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const { userToken } = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    if (!userToken) return;

    try {
      const response = await fetch("http://192.168.0.115:8080/api/tasks", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP status ${response.status}: ${errorText}`);
      }
      const tasksData: Task[] = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  }, [userToken]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSwipeRight = async (taskId: number) => {
    try {
      const response = await fetch(
        `http://192.168.0.115:8080/api/task/${taskId}/increment-counter`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to increment counter");
      }
      await fetchTasks();
    } catch (error) {
      console.error("Error incrementing counter:", error);
    }
  };

  const renderRightActions = () => {
    // Return an empty view or a view with desired width to control swipe distance
    return <View style={{ width: 1 }}></View>;
  };

  const renderTasks = (section: Section) => {
    return tasks
      .filter((task) => task.section === section)
      .map((task) => (
        <Swipeable
          key={task.id}
          renderRightActions={renderRightActions}
          onSwipeableOpen={(direction) => {
            if (direction == "right") {
              console.log("Swiped right" + task.id);
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
            description="test"
            difficultyLevel={task.difficultyLevel}
          />
        </Swipeable>
      ));
  };

  return (
    <Container>
      <ButtonContainer>
        <Button
          onPress={() => setActiveSection("HABITS")}
          style={{
            backgroundColor: activeSection === "HABITS" ? "blue" : "grey",
          }}
        >
          HABITS
        </Button>
        <Button
          onPress={() => setActiveSection("CHALLENGES")}
          style={{
            backgroundColor: activeSection === "CHALLENGES" ? "blue" : "grey",
          }}
        >
          CHALLENGES
        </Button>
        <Button
          onPress={() => setActiveSection("GOALS")}
          style={{
            backgroundColor: activeSection === "GOALS" ? "blue" : "grey",
          }}
        >
          GOALS
        </Button>
      </ButtonContainer>

      <SectionContainer>
        {activeSection === "HABITS" && (
          <ContentSection horizontal={false}>
            {renderTasks("HABITS")}
          </ContentSection>
        )}
        {activeSection === "CHALLENGES" && (
          <ContentSection horizontal={false}>
            {renderTasks("CHALLENGES")}
          </ContentSection>
        )}
        {activeSection === "GOALS" && (
          <ContentSection horizontal={false}>
            {renderTasks("GOALS")}
          </ContentSection>
        )}
      </SectionContainer>
    </Container>
  );
};

export default ButtonSection;
