import React from "react";
import { Modal, View } from "react-native";
import { Button, YStack, styled } from "tamagui";
import AddTaskForm from "./AddTaskForm";

type AddTaskPopupProps = {
  onClose: () => void;
};

const StyledModalView = styled(View, {
  padding: 20,
});

const AddTaskPopup: React.FC<AddTaskPopupProps> = ({ onClose }) => {
  return (
    <Modal
      visible
      onRequestClose={onClose}
      animationType="slide"
      transparent={false}
    >
      <StyledModalView>
        <AddTaskForm />
        <YStack alignItems="center" margin={10}>
          <Button onPress={onClose}>Close</Button>
        </YStack>
      </StyledModalView>
    </Modal>
  );
};

export default AddTaskPopup;
