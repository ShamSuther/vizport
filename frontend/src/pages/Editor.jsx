import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  VStack,
  Box,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { inputs, initials } from "@/constants";
import { formSchema } from "@/schemas/formSchema";
import {
  FormInput,
  FormTextArea,
  FormCheckbox,
  FormDropzone,
  FormSelect,
} from "@/components";
import { toaster } from "@/components/ui/toaster";
import { Footer, Navbar } from "@/components";
import { useAuth } from "@clerk/clerk-react";
import Btn from "@/components/Btn";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router";

const Editor = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initials,
  });

  const {
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = form;

  useEffect(() => {
    // if (!Object.keys(errors).length) return;

    // const toastErrors = () => {
    //   Object.entries(errors).forEach(([key, value]) => {
    //     toaster.create({
    //       duration: 2500,
    //       title: key.charAt(0).toUpperCase() + key.slice(1),
    //       description: value?.message,
    //       type: "info",
    //     });
    //   });
    // };

    // const microtask = setTimeout(toastErrors, 0);
    const clearTimer = setTimeout(clearErrors, 3000);

    return () => {
      // clearTimeout(microtask);
      clearTimeout(clearTimer);
    };
  }, [errors, clearErrors]);

  useEffect(() => {
    return () => {};
  }, []);

  const onSubmit = async (values) => {
    const formData = new FormData();

    // Append basic fields
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("liveLink", values.liveLink || "");
    formData.append("githubLink", values.githubLink || "");
    formData.append("isPublished", values.isPublished);

    // Append technologies
    values.technologies?.forEach((tech) => {
      formData.append("technologies", tech);
    });

    // Append image files
    values.images?.forEach((image) => {
      formData.append("images", image);
    });

    const token = await getToken();
    const response = await fetch("http://localhost:5050/api/projects/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json().catch(() => ({
      error: "Invalid JSON response from server",
    }));

    if (response.ok) {
      console.log("Project created:", result);
      toaster.create({
        title: response.message || "Project created!",
        type: "success",
      });
      navigate("/dashboard");
    } else {
      console.error("Failed to create project:", result);
      toaster.create({
        title: result.message || "Project not created!",
        type: "error",
      });
    }
  };

  const renderField = (field, idx) => {
    const key = `${field.name}-${idx}`;
    const sharedProps = {
      id: idx,
      form,
      fieldName: field.name,
      fieldConfig: field,
    };

    switch (field.type) {
      case "attachments":
        return <FormDropzone key={key} {...sharedProps} />;
      case "textarea":
        return <FormTextArea key={key} {...sharedProps} />;
      case "checkbox":
        return <FormCheckbox key={key} {...sharedProps} />;
      case "select":
        return <FormSelect key={key} {...sharedProps} />;
      case "url":
        return <FormInput key={key} addon="https://" {...sharedProps} />;
      default:
        return <FormInput key={key} {...sharedProps} />;
    }
  };

  return (
    <div>
      <Navbar />
      <Container minHeight={"100dvh"} py={"6rem"} px={{ base: 0, md: 8 }}>
        <Flex
          height={"100%"}
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-evenly"}
          alignItems={"flex-start"}
        >
          <Flex
            p={4}
            maxWidth={{ base: "none", md: "30%" }}
            height={"auto"}
            direction={"column"}
            justifyContent="center"
            textAlign={{ base: "center", md: "left" }}
            mt={12}
          >
            <Heading
              size={{ base: "2xl", md: "4xl" }}
              wordBreak="break-word"
              maxW="sm"
              mb={{ base: 2 }}
            >
              Create new{" "}
              <span style={{ position: "relative" }}>
                project
                <Pencil
                  style={{ position: "absolute", inset: "-0.7rem auto auto 0" }}
                />
              </span>
            </Heading>
            <Text color={"gray.300"} textStyle={{ base: "sm", md: "md" }}>
              Ready to showcase your work? Enter your project’s info — a great
              title, a solid description, some cool screenshots, and your links.
              Let the world see what you’ve built!
            </Text>
          </Flex>

          {/* Form Section */}
          <Card.Root
            maxW="lg"
            width="100%"
            rounded="2xl"
            p={{ base: 8 }}
            variant="elevated"
            px={{ base: 4, md: 8 }}
            flex={{ base: "none", md: 1 }}
            unstyled={true}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card.Body>
                <VStack gap={4} alignItems="flex-start">
                  {inputs.map((field, idx) => renderField(field, idx))}
                </VStack>
              </Card.Body>
              <Card.Footer mt={4}>
                <Btn content="Create" type="submit" />
              </Card.Footer>
            </form>
          </Card.Root>
        </Flex>
      </Container>
      <Footer />
    </div>
  );
};

export default Editor;
