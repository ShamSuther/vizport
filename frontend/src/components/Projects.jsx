import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Card,
  Button,
  Center,
  Grid,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { ArrowDownRight, Github } from "lucide-react";
import { useNavigate } from "react-router";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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

  // userId
  // title
  // description
  // image
  // liveLink
  // githubLink
  // technologies
  // isPublished

  if (projects.length > 0) {
    return (
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {projects.map((projekt, idx) => {
          const { _id, title, image, liveLink, githubLink } = projekt;
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
              <Image
                className="card-img"
                aspectRatio={4 / 3}
                rounded={"xl"}
                src={image}
                alt={key}
              />
              <Card.Footer gap="2">
                <Flex
                  className="card-text"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Card.Title textStyle={"sm"}>{title}</Card.Title>
                  <Button
                    textStyle={"sm"}
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
