import React from "react";
import { Center, Text, Box, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut, openUserProfile, user, openSignIn } = useClerk();

  const navLinks = [
    {
      text: "HOME",
      action: () => navigate("/"),
      show: true,
    },
    {
      text: "DASHBOARD",
      action: () => navigate("/dashboard"),
      show: user ? true : false,
    },
    {
      text: "PROFILE",
      action: () => openUserProfile(),
      show: user ? true : false,
    },
    {
      text: "LOGIN",
      action: () => openSignIn(),
      show: true,
    },
    {
      text: "LOGOUT",
      action: () => signOut({ redirectUrl: "/" }),
      show: user ? true : false,
    },
  ];

  return (
    <Box p={6} px={8}>
      <Center>
        <Flex
          width={"100%"}
          direction="row"
          gap={{ base: 2, md: 4 }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {navLinks.map((item, idx) => {
            if (item.show) {
              return (
                <Button
                  key={`item-${idx}`}
                  textStyle={{ base: "sm", md: "md" }}
                  color={{ _hover: "orange.500" }}
                  variant="plain"
                  gap={".25rem"}
                  p={0}
                  onClick={item.action}
                >
                  {item.text}
                </Button>
              );
            }
          })}
          {/* <Button
            textStyle={{ base: "sm", md: "md" }}
            color={{ _hover: "orange.500" }}
            variant="plain"
            gap={".25rem"}
            p={0}
            onClick={() => openUserProfile()}
          >
            HOME
            <Slash size={14} strokeWidth={2} />
          </Button>
          <Button
            textStyle={{ base: "sm", md: "md" }}
            color={{ _hover: "orange.500" }}
            variant="plain"
            gap={".25rem"}
            p={0}
            onClick={() => openUserProfile()}
          >
            DASHBOARD
            <ArrowDownLeft size={14} strokeWidth={2} />
          </Button>
          <Button
            textStyle={{ base: "sm", md: "md" }}
            color={{ _hover: "orange.500" }}
            variant="plain"
            gap={".25rem"}
            p={0}
            onClick={() => openUserProfile()}
          >
            PROFILE
            <ArrowDownLeft size={14} strokeWidth={2} />
          </Button>
          <Button
            textStyle={{ base: "sm", md: "md" }}
            color={{ _hover: "orange.500" }}
            variant="plain"
            gap={".25rem"}
            p={0}
            onClick={() => signOut({ redirectUrl: "/" })}
          >
            LEAVE
            <ArrowDownLeft size={14} strokeWidth={2} />
          </Button> */}
        </Flex>
      </Center>
    </Box>
  );
};

export default Navbar;
