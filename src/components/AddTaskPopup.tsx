import React from "react";
import { Modal } from "react-native";
import { YStack, styled } from "tamagui";
import AddTaskForm from "./AddTaskForm";
import { Button } from "tamagui";
import Toast from "react-native-toast-message";

type AddTaskPopupProps = {
  onClose: () => void;
};

const StyledModalView = styled(YStack, {
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
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
        <AddTaskForm onClose={onClose} />
        <YStack alignItems="center" margin={10}>
          <Button onPress={onClose}>Close</Button>
        </YStack>
      </StyledModalView>
      <Toast />
    </Modal>
  );
};

export default AddTaskPopup;
