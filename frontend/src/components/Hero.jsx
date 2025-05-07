import React from "react";
import {
  Heading,
  Text,
  Container,
  Box,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import HeroBtn from "./HeroBtn";

const Hero = () => {
  return (
    <>
      <Center minHeight={"80dvh"}>
        <Container>
          <Box>
            <Flex direction={"column"} alignItems={"center"} gap={"2"}>
              <Text
                textStyle={"sm"}
                textAlign={"center"}
                color={"gray.200"}
                md={{ textStyle: "md" }}
              >
                Edit with Ease.
                <br /> Share Your Vision.
                <br /> Visualize Your Portfolio.
              </Text>
              <Heading
                className="limelight-regular"
                textStyle={{ base: "6xl", md: "7xl" }}
                fontWeight={"medium"}
                transition="all 150ms ease-in-out"
              >
                Vizport
              </Heading>
              <HeroBtn content={"Get started now"} icon={<ArrowRight />} />
            </Flex>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default Hero;
