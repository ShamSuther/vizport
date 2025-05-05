import React, { useState, useEffect } from "react";
import { Text, Image, Card, Button, Center } from "@chakra-ui/react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
          console.log(result);
        }
      } else {
        result = await response.json();
        console.log(result);
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
          const { title, image, liveLink, githubLink } = projekt;
          const key = `${title}-${idx}`;
          return (
            <Card.Root
              key={key}
              className="project-card"
              maxW="sm"
              overflow="hidden"
              rounded={"2xl"}
              p={"4"}
            >
              <Image
                className="card-img"
                htmlWidth={"300px"}
                aspectRatio={4 / 3}
                rounded={"xl"}
                src={image}
                alt={key}
              />
              <Card.Body gap="2">
                <Card.Title>{title}</Card.Title>
              </Card.Body>
              <Card.Footer gap="2">
                <Button variant="solid" p={"2"} px="4" rounded={"xl"}>
                  View
                </Button>
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
