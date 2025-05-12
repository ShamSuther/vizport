import React from "react";
import { Navbar, Footer, ProjectTable } from "@/components";
import { Heading, Container, Flex } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container p={8} px={8} flex={1} minHeight={"90dvh"}>
        <Flex
          w={"100%"}
          direction={"column"}
          mb={{ base: 4, md: 8 }}
          gap={{ base: 2, md: 4 }}
        >
          <Heading size={{ base: "lg", md: "xl" }} textAlign={"center"}>Your Projects</Heading>
          <ProjectTable />
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
