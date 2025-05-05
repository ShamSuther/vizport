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

const Hero = () => {
  return (
    <>
      <Center minHeight={"80dvh"}>
        <Container p={"4"} px={"8"}>
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
              <Button
                p={"4"}
                rounded="xl"
                variant={"outline"}
                borderWidth={"2px"}
                colorPalette={"gray"}
                size={{ base: "sm", md: "md" }}
                fontSize={{ base: "sm", md: "md" }}
                color={{ base: "gray.900", _hover: "gray.300" }}
                bg={{ base: "gray.300", _hover: "gray.900" }}
                borderColor={{ base: "gray.300", _hover: "gray.300" }}
                transition="all 150ms ease-in-out"
              >
                Get started now <ArrowRight />
              </Button>
            </Flex>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default Hero;
