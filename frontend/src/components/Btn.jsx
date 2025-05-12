import React from "react";
import { Button } from "@chakra-ui/react";

const Btn = ({ content, type, icon, onClick }) => {
  return (
    <Button
      p={"4"}
      type={type}
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
      onClick={onClick}
    >
      {content} {icon && icon}
    </Button>
  );
};

export default Btn;
