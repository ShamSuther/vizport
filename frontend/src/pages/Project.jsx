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
  Center,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { Footer, Navbar } from "@/components";
import { Github, House, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          setProject(null);
          setError(new Error(result?.message || "Project not found"));
        }
      } catch (error) {
        setError(error);
        setProject(null);
        toaster.create({
          title: "Error",
          description: error.message,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  if (loading) {
    return (
      <Center height={"100dvh"}>
        <Text>
          <Spinner color={"orange.500"} size={{ base: "smd", md: "md" }} />
        </Text>
      </Center>
    );
  }

  if (project != null) {
    return (
      <>
        <title>Project: Vizport;</title>
        <Navbar />
        <Container p={"8"} px={"8"} flex={1} minHeight={"90dvh"}>
          <Flex direction={"column"} gap={{ base: 2, md: 4 }}>
            <Heading size={{ base: "lg", md: "xl" }}>{project.title}</Heading>
            <Stack direction={"row"} gap={4}>
              <Link
                textStyle={{ base: "sm", md: "md" }}
                variant="underline"
                href={project.githubLink}
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
  return (
    <Center height={"100dvh"}>
      <Container p={"4"} px={"8"}>
        <Flex direction={"column"} alignItems={"center"} gap={2}>
          <Heading
            textStyle={{ base: "md", sm: "xl", md: "2xl" }}
            fontWeight={"medium"}
            transition="all 150ms ease-in-out"
          >
            "{id}"
          </Heading>
          <Box
            color={"gray.200"}
            textStyle={{ base: "sm", sm: "md" }}
            textAlign={"center"}
          >
            <Text>{error ? error.message : "PROJECT NOT FOUND"}</Text>
          </Box>
          <Link
            color={{ _hover: "orange.500" }}
            p={2}
            onClick={() => navigate("/")}
            transition={"all"}
          >
            <House />
          </Link>
        </Flex>
      </Container>
    </Center>
  );
};

export default Project;
