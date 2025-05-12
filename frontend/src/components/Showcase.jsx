import React from "react";
import { Heading, Container, Flex } from "@chakra-ui/react";
import Projects from "./Projects";

const Showcase = () => {
  return (
    <section>
      <Container p={{ base: "4", md: "8" }}>
        <Flex
          style={{
            direction: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          mb={{base:4,md:8}}
        >
          <Heading size="lg" color={"gray.300"}>
            Project Showcase
          </Heading>
        </Flex>
        <Projects />
      </Container>
    </section>
  );
};

export default Showcase;
