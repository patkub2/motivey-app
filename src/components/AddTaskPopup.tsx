import React from "react";
import { Modal, View, Text, Button } from "react-native";
import AddTaskForm from "./AddTaskForm";

type AddTaskPopupProps = {
  onClose: () => void;
};

const AddTaskPopup: React.FC<AddTaskPopupProps> = ({ onClose }) => {
  return (
    <Modal
      visible
      onRequestClose={onClose}
      animationType="slide"
      transparent={false}
    >
      <View style={{ padding: 20 }}>
        <AddTaskForm />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default AddTaskPopup;
