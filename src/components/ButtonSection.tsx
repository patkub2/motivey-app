import React, { useState } from "react";
import { Button, Stack, styled, Text } from "tamagui";

// Define a styled container for the sections
const SectionContainer = styled(Stack, {
  // Styles for your section container
  padding: 10,
  width: "100%",
});

const ContentSection = styled(Stack, {
  // Styles for each content section
  padding: 10,
  // You may want to add display: 'none' to hide inactive sections or handle visibility through React state
});

const ButtonConteiner = styled(Stack, {
  // Styles for each content section
  padding: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  borderWidth: 1,
  // You may want to add display: 'none' to hide inactive sections or handle visibility through React state
});

const Conteiner = styled(Stack, {
  // Styles for each content section
  width: "100%",
  borderWidth: 1,
  // You may want to add display: 'none' to hide inactive sections or handle visibility through React state
});

const ButtonSection = () => {
  const [activeSection, setActiveSection] = useState("section1");

  return (
    <Conteiner>
      <ButtonConteiner>
        <Button
          onPress={() => setActiveSection("section1")}
          // Change the background color based on the active state
          // Adjust the styling to match your design
          style={{
            backgroundColor: activeSection === "section1" ? "blue" : "grey",
          }}
        >
          Section 1
        </Button>
        <Button
          onPress={() => setActiveSection("section2")}
          style={{
            backgroundColor: activeSection === "section2" ? "blue" : "grey",
          }}
        >
          Section 2
        </Button>
        <Button
          onPress={() => setActiveSection("section3")}
          style={{
            backgroundColor: activeSection === "section3" ? "blue" : "grey",
          }}
        >
          Section 3
        </Button>
      </ButtonConteiner>

      <SectionContainer>
        {activeSection === "section1" && (
          <ContentSection>
            <Text>Content for Section 1</Text>
          </ContentSection>
        )}
        {activeSection === "section2" && (
          <ContentSection>
            <Text>Content for Section 2</Text>
          </ContentSection>
        )}
        {activeSection === "section3" && (
          <ContentSection>
            <Text>Content for Section 3</Text>
          </ContentSection>
        )}
      </SectionContainer>
    </Conteiner>
  );
};

export default ButtonSection;
