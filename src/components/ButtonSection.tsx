import React, { useState, useEffect, useContext } from "react";
import { Button, Stack, styled, Text, ScrollView, Image } from "tamagui";
import { AuthContext } from "../context/AuthContext"; // You'll need to implement this
import TaskCard from "./TaskCard";

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
  borderWidth: 1,
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

  useEffect(() => {
    const fetchTasks = async () => {
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
    };

    if (userToken) {
      fetchTasks();
    }
  }, [userToken]);

  const renderTasks = (section: Section) => {
    return tasks
      .filter((task) => task.section === section)
      .map((task) => (
        <TaskCard
          key={task.id}
          executionsCount={task.dailyExecutionCounter}
          icon={
            <Image
              source={getIconForType(task.type)}
              style={{ width: 30, marginHorizontal: 5, height: 30 }}
              resizeMode="center" // Set resizeMode as a separate prop
            />
          }
          name={task.name}
          description="test" // Update with actual description if available
          difficultyLevel={task.difficultyLevel}
        />
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
