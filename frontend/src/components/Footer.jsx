import React from "react";
import { Center, Text, Box, Flex } from "@chakra-ui/react";
import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <Box p={6} px={8}>
      <Center>
        <Flex direction="row" gap={"1"} textStyle={"md"} alignItems={"center"}>
          <Copyright size={"1rem"} strokeWidth={2} />{" "}
          <span style={{ fontStyle: "italic", fontWeight: 500 }}>
            {new Date().getFullYear()}
          </span>
        </Flex>
      </Center>
    </Box>
  );
};

export default Footer;
