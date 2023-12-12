// OptionsModal.tsx
import React, { useContext } from "react";
import { Modal } from "react-native";
import { YStack, Button, Text, styled } from "tamagui";
import { AuthContext } from "../context/AuthContext"; // Adjust path as necessary

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const FullScreenModalView = styled(YStack, {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
});

const OptionsModal: React.FC<OptionsModalProps> = ({ visible, onClose }) => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
    onClose(); // Close the modal after logging out
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <FullScreenModalView>
        <Text color="$color">Options</Text>
        <Button onPress={handleLogout} width={"90%"} margin={20}>
          Logout
        </Button>
        <Button onPress={onClose} width={"90%"}>
          Close
        </Button>
      </FullScreenModalView>
    </Modal>
  );
};

export default OptionsModal;
