import React from "react";
import { Center, Text, Box, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut, openUserProfile, isSignedIn, openSignIn } = useClerk();

  const navLinks = [
    {
      text: "HOME",
      action: () => navigate("/"),
      show: true,
    },
    {
      text: "DASHBOARD",
      action: () => navigate("/dashboard"),
      show: isSignedIn ? true : false,
    },
    {
      text: "CREATE",
      action: () => navigate("/editor"),
      show: isSignedIn ? true : false,
    },
    {
      text: "PROFILE",
      action: () => openUserProfile(),
      show: isSignedIn ? true : false,
    },
    {
      text: "LOGIN",
      action: () => openSignIn(),
      show: isSignedIn ? false : true,
    },
    {
      text: "LOGOUT",
      action: () => signOut({ redirectUrl: "/" }),
      show: isSignedIn ? true : false,
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
        </Flex>
      </Center>
    </Box>
  );
};

export default Navbar;
