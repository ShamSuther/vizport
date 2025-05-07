import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toaster } from "@/components/ui/toaster";
import {
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  Badge,
  Link,
} from "@chakra-ui/react";
import { Footer } from "@/components";
import { Github, Globe, ArrowUpRight } from "lucide-react";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/api/projects/${id}`,
          {
            method: "GET",
          }
        );

        let result;
        if (response.ok && response.status == 200) {
          result = await response.json();
          setProject(result);
        } else {
          result = await response.json();
          console.log(result);
        }
      } catch (error) {
        setError(error);
        toaster.create({
          title: "Error",
          description: error.message,
          type: "error",
        });
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  if (project) {
    return (
      <>
        <Container p={"8"} px={"8"} flex={1} minHeight={"90dvh"}>
          <Flex direction={"column"} gap={{ base: 2, md: 4 }}>
            <Heading size={{ base: "lg", md: "xl" }}>{project.title}</Heading>
            <Stack direction={"row"} gap={4}>
              <Link
                textStyle={{ base: "sm", md: "md" }}
                variant="underline"
                href={project.liveLink}
                color={{ _hover: "orange.500" }}
                transition={"all 150ms ease-in"}
              >
                <Github size={14} strokeWidth={2} /> Source{" "}
              </Link>
              <Link
                textStyle={{ base: "sm", md: "md" }}
                variant="underline"
                href={project.liveLink}
                color={{ _hover: "orange.500" }}
                transition={"all 150ms ease-in"}
              >
                <ArrowUpRight size={14} strokeWidth={2} /> Preview{" "}
              </Link>
            </Stack>
            <Image
              width={{ base: "100%", md: "3/4", lg: "1/2" }}
              src={project.image}
              alt={project.title}
              aspectRatio={4 / 3}
            />
            <Text
              textStyle={{ base: "sm", md: "md" }}
              maxWidth={{ base: "100%", md: "3/4", lg: "8/12" }}
            >
              {project.description}
            </Text>
            <Stack
              direction={"row"}
              maxW={{ base: "100%", md: "1/2" }}
              wrap={"wrap"}
            >
              {project.technologies.map((tech, idx) => (
                <Badge
                  variant={"surface"}
                  key={`tech-${idx}`}
                  color={{ _hover: "orange.500" }}
                  transition={"all 150ms ease-in"}
                  p={1}
                  px={2}
                  rounded={"md"}
                >
                  {tech}
                </Badge>
              ))}
            </Stack>
          </Flex>
        </Container>
        <Footer />
      </>
    );
  }
};

export default Project;
