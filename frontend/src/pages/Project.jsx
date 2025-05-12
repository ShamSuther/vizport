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
  Card,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { Footer, Navbar } from "@/components";
import { Github, House, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Project = () => {
  const { id } = useParams();
  const [projekt, setProject] = useState(null);
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
    console.log(projekt);
  }, [projekt]);

  if (loading) {
    return (
      <Center height={"100dvh"}>
        <Text>
          <Spinner color={"orange.500"} size={{ base: "smd", md: "md" }} />
        </Text>
      </Center>
    );
  }

  if (projekt != null) {
    return (
      <>
        <title>Project: Vizport;</title>
        <Navbar />
        <Container p={8} px={8} flex={1} minHeight={"90dvh"} centerContent>
          <Flex
            w={"100%"}
            direction={"column"}
            mb={{ base: 4, md: 8 }}
            gap={{ base: 2, md: 4 }}
          >
            <Heading size={{ base: "lg", md: "xl" }}>{projekt.title}</Heading>
            <Stack direction={"row"} gap={4}>
              <Link
                textStyle={{ base: "sm", md: "md" }}
                variant="underline"
                href={projekt.githubLink}
                color={{ _hover: "orange.500" }}
                transition={"all 150ms ease-in"}
              >
                <Github size={14} strokeWidth={2} /> Source{" "}
              </Link>
              <Link
                textStyle={{ base: "sm", md: "md" }}
                variant="underline"
                href={projekt.liveLink}
                color={{ _hover: "orange.500" }}
                transition={"all 150ms ease-in"}
              >
                <ArrowUpRight size={14} strokeWidth={2} /> Preview{" "}
              </Link>
            </Stack>

            {projekt.images && projekt.images.length > 1 ? (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                }}
              >
                {projekt.images.map((url, idx) => (
                  <SwiperSlide style={{ background: "gray" }} key={idx}>
                    <Image
                      objectFit={"contain"}
                      objectPosition={"center"}
                      src={url}
                      alt={projekt.title}
                      aspectRatio={4 / 3}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Image
                width={{ base: "100%", md: "3/4", lg: "1/2" }}
                src={projekt.images[0]}
                objectFit={"contain"}
                objectPosition={"center"}
                alt={projekt.title}
                aspectRatio={4 / 3}
              />
            )}

            <Text
              textStyle={{ base: "sm", md: "md" }}
              maxWidth={{ base: "100%", md: "3/4", lg: "8/12" }}
            >
              {projekt.description}
            </Text>
            <Stack
              direction={"row"}
              maxW={{ base: "100%", md: "1/2" }}
              wrap={"wrap"}
            >
              {projekt.technologies.map((tech, idx) => (
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
            {/* account */}
            <Card.Root
              p={4}
              mt={4}
              flex={0.5}
              cursor={"pointer"}
              rounded={{ base: "xl" }}
              width={{ base: "100%", md: "320px" }}
              variant={"elevated"}
            >
              <Card.Body gap="2">
                <HStack key={projekt.userId.email} gap="4">
                  <Avatar.Root>
                    <Avatar.Fallback name={projekt.userId.username} />
                    <Avatar.Image src={projekt.userId.imageUrl} />
                  </Avatar.Root>
                  <Stack gap="0">
                    <Text fontWeight="medium">{projekt.userId.username}</Text>
                    <Text color="fg.muted" textStyle="sm">
                      {projekt.userId.email}
                    </Text>
                  </Stack>
                </HStack>
              </Card.Body>
            </Card.Root>
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
