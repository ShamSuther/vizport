import React from "react";
import {
  Heading,
  Text,
  Container,
  Box,
  Flex,
  Button,
  Center,
  Highlight,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import Btn from "./Btn";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

const Hero = () => {
  const { openSignUp,openSignIn, isSignedIn } = useClerk();
  const navigate = useNavigate();

  return (
    <>
      <Center className="hero-section" minHeight={"80dvh"}>
        <Container zIndex={1}>
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
                textStyle={{ base: "5xl", md: "6xl" }}
                fontWeight={"medium"}
                transition="all 150ms ease-in-out"
              >
                Vizport
              </Heading>
              <Btn
                content={"Get started now"}
                type={"button"}
                icon={<ArrowRight />}
                onClick={() => {
                  if (isSignedIn) {
                    navigate("/editor");
                  } else {
                    // navigate("/sign_up");
                    // openSignUp({ fallbackRedirectUrl: "/" });
                    openSignIn({ fallbackRedirectUrl: "/" });
                  }
                }}
              />
            </Flex>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default Hero;
