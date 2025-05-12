import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Card,
  Button,
  Center,
  Grid,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { ArrowDownRight, Github } from "lucide-react";
import { useNavigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { user } = useClerk();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/projects/public/all",
          {
            method: "GET",
          }
        );

        let result;
        if (response.ok && response.status == 200) {
          result = await response.json();

          if (result && result.length > 0) {
            setProjects(result);
          }
        } else {
          result = await response.json();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    console.log(user);
    return () => {};
  }, [user]);

  // userId
  // title
  // description
  // images
  // liveLink
  // githubLink
  // technologies
  // isPublished

  if (projects.length > 0) {
    return (
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={{ base: 3, md: 6 }}
      >
        {projects.map((projekt, idx) => {
          const { _id, title, images, liveLink, githubLink } = projekt;
          const key = `${title}-${idx}`;
          return (
            <Card.Root
              key={key}
              className="project-card"
              maxW="sm"
              maxH="sm"
              overflow="hidden"
              border={"none"}
              background={"transparent"}
            >
              <Box position={"relative"}>
                <Image
                  className="card-img"
                  width={400}
                  height={{ base: 200, md: 300 }}
                  aspectRatio={4 / 3}
                  rounded={{ base: "lg", md: "3xl" }}
                  src={images[0]}
                  borderWidth={2}
                  alt={key}
                />
                <Card.Body
                  position={"absolute"}
                  visibility={{ base: "hidden", md: "visible" }}
                  inset={"auto .5rem .5rem auto"}
                >
                  <Avatar.Root
                    shape={"full"}
                    size={{ base: "md", md: "lg" }}
                    cursor={"pointer"}
                    shadow={"xs"}
                  >
                    <Avatar.Fallback name={projekt.userId.username} />
                    <Avatar.Image src={projekt.userId.imageUrl} />
                  </Avatar.Root>
                </Card.Body>
              </Box>
              <Card.Footer gap="2">
                <Flex
                  className="card-text"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Card.Title textStyle={{ base: "xs", md: "sm" }} truncate>
                    {title}
                  </Card.Title>
                  <Button
                    textStyle={{ base: "xs", md: "sm" }}
                    color={{ _hover: "orange.500" }}
                    variant="plain"
                    gap={".15rem"}
                    p={0}
                    onClick={() => navigate(`/project/${_id}`)}
                  >
                    VIEW
                    <ArrowDownRight size={14} strokeWidth={2} />
                  </Button>
                </Flex>
              </Card.Footer>
            </Card.Root>
          );
        })}
      </Grid>
    );
  }

  return (
    <Center>
      <Text textAlign={"center"}>No projects to showcase</Text>
    </Center>
  );
};

export default Projects;
