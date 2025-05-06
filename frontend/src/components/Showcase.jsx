import React from "react";
import { Heading, Container, Flex } from "@chakra-ui/react";
import Projects from "./Projects";

const Showcase = () => {
  return (
    <section>
      <Container p={"8"} px={"8"}>
        <Flex
          style={{
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={"4"}
        >
          <Heading size="lg" color={"gray.300"}>
            Project
          </Heading>
          <Heading size="lg" color={"gray.300"}>
            Showcase
          </Heading>
        </Flex>
        <Projects />
      </Container>
    </section>
  );
};

export default Showcase;
