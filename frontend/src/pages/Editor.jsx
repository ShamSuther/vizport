import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, VStack } from "@chakra-ui/react";
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

const Editor = () => {
  const { getToken } = useAuth();
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
    if (!Object.keys(errors).length) return;

    const toastErrors = () => {
      Object.entries(errors).forEach(([key, value]) => {
        toaster.create({
          duration: 2500,
          title: key.charAt(0).toUpperCase() + key.slice(1),
          description: value?.message,
          type: "info",
        });
      });
    };

    const microtask = setTimeout(toastErrors, 0);
    const clearTimer = setTimeout(clearErrors, 3000);

    return () => {
      clearTimeout(microtask);
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
    formData.append("liveLink", values.liveLink);
    formData.append("githubLink", values.githubLink);
    formData.append("isPublished", values.isPublished);

    // Append technologies as JSON string or individual items
    values.technologies.forEach((tech) => {
      formData.append("technologies", tech);
    });

    // Append image files
    values.images.forEach((image, _) => {
      formData.append("images", image);
    });

    try {
      const token = await getToken();
      const response = await fetch("http://localhost:5050/api/projects/", {
        method: "post",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      let result;
      if (response.ok && response.status == 200) {
        result = await response.json();
        console.log(result);
      } else {
        result = await response.json(); // 🔥 throws error if response is HTML
        console.log(result);
      }
    } catch (error) {
      console.error(error);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4}>
          {inputs.map((field, idx) => renderField(field, idx))}
        </VStack>
        <Button type="submit" mt={4}>
          Submit
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default Editor;
