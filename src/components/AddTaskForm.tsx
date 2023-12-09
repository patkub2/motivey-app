import React, { useState, useContext, useMemo } from "react";
import { Select, YStack, Button, Input, styled, Text, View } from "tamagui";
import { AuthContext } from "../context/AuthContext";
import CustomButton from "./CustomButton";
import Toast from "react-native-toast-message";

const sections = ["HABITS", "CHALLENGES", "GOALS"];
const types = ["INT", "STR", "AGI", "VIT"];

const StyledTextInput = styled(Input, {
  borderWidth: 1,
  borderColor: "#DDDDDD",
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
});

const StyledLabel = styled(Text, {
  // fontWeight: "bold",
  marginTop: 20,
  alignSelf: "center",
  marginBottom: 10,
});

const AddTaskForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState(sections[0]);
  const [difficultyLevel, setDifficultyLevel] = useState("1");
  const [type, setType] = useState(types[0]);
  const { userToken } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Task name cannot be empty",
      });
      return;
    }

    const taskData = {
      name,
      section,
      difficultyLevel: parseInt(difficultyLevel),
      experience: parseInt(difficultyLevel) * 10,
      daily_execution_counter: 0,
      type,
    };

    // POST request to add task
    try {
      const response = await fetch("http://192.168.0.115:8080/api/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      Toast.show({
        type: "success",
        text1: "Task added successfully!",
      });

      onClose && onClose();
      // Handle successful task addition here
    } catch (error) {
      console.error("Error adding task:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add task",
      });
    }
  };

  return (
    <YStack padding={10} justifyContent="space-around" width={"100%"}>
      <StyledLabel>Name of task:</StyledLabel>
      <StyledTextInput
        value={name}
        onChangeText={setName}
        placeholder="Name of task"
      />

      <StyledLabel>Section:</StyledLabel>
      <Select value={section} onValueChange={setSection}>
        {sections.map((s, index) => (
          <Select.Item key={s} value={s} index={index}>
            <Select.ItemText>{s}</Select.ItemText>
            <Select.ItemIndicator>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#D9B600",
                }}
              />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select>

      <StyledLabel>Difficulty Level:</StyledLabel>
      <YStack flexDirection="row" justifyContent="center" space>
        {["1", "2", "3", "4", "5"].map((level) => (
          <CustomButton
            key={level}
            title={level}
            onPress={() => setDifficultyLevel(level)}
            selected={difficultyLevel === level}
          />
        ))}
      </YStack>

      <StyledLabel>Type:</StyledLabel>
      <Select value={type} onValueChange={setType}>
        {types.map((t, index) => (
          <Select.Item key={t} value={t} index={index}>
            <Select.ItemText>{t}</Select.ItemText>
            <Select.ItemIndicator>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#D9B600",
                }}
              />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select>

      <Button onPress={handleSubmit} marginTop={20}>
        Add Task
      </Button>
    </YStack>
  );
};

export default AddTaskForm;
