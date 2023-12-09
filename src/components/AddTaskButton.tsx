import React, { useState } from "react";
import { Button, Stack } from "tamagui";
import AddTaskPopup from "./AddTaskPopup"; // Import the AddTaskPopup component

const AddTaskButton = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <Stack>
      <Button onPress={() => setIsPopupVisible(true)}>Add Task</Button>
      {isPopupVisible && (
        <AddTaskPopup onClose={() => setIsPopupVisible(false)} />
      )}
    </Stack>
  );
};

export default AddTaskButton;
