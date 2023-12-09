import React, { useState, useContext, useMemo } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { Select, Sheet, YStack, styled } from "tamagui";
import { AuthContext } from "../context/AuthContext";

const sections = ["HABITS", "CHALLENGES", "GOALS"];
const types = ["INT", "STR", "AGI", "VIT"];

const StyledTextInput = styled(TextInput, {
  borderWidth: 1,
  borderColor: "#DDDDDD",
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
});

const StyledLabel = styled(Text, {
  // fontWeight: "bold",
  marginTop: 4,
  alignSelf: "center",
  marginBottom: 4,
});

const AddTaskForm = () => {
  const [name, setName] = useState("");
  const [section, setSection] = useState(sections[0]);
  const [difficultyLevel, setDifficultyLevel] = useState("1");
  const [type, setType] = useState(types[0]);
  const { userToken } = useContext(AuthContext);

  const handleSubmit = async () => {
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
      // Handle successful task addition here
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const difficultyOptions = useMemo(
    () =>
      ["1", "2", "3", "4", "5"].map((level, index) => ({
        name: level,
        value: level,
        index,
      })),
    []
  );

  return (
    <YStack padding={20}>
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
      <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
        {difficultyOptions.map((item) => (
          <Select.Item key={item.value} value={item.value} index={item.index}>
            <Select.ItemText>{item.name}</Select.ItemText>
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

      <Button title="Add Task" onPress={handleSubmit} />
    </YStack>
  );
};

export default AddTaskForm;
