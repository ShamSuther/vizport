import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initials, inputs } from "@/constants";
import { Button, VStack } from "@chakra-ui/react";
import { formSchema } from "@/schemas/formSchema";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextarea";
import FormCheckbox from "@/components/FormCheckbox";
import { FormDropzone } from "@/components/FormDropdone";
import FormSelect from "@/components/FormSelect";
import { toaster } from "@/components/ui/toaster";
import { Footer, Navbar } from "@/components";

const Editor = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initials,
  });

  const { formState, clearErrors } = form;
  const { errors } = formState;

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      setTimeout(() => {
        for (const key in errors) {
          const title = key.charAt(0).toUpperCase() + key.slice(1);
          toaster.create({
            duration: 2500,
            title: title || "Error",
            description: errors[key]?.message,
            type: "info",
          });
        }
      }, 0);
      const timer = setTimeout(() => {
        clearErrors();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [clearErrors, errors]);

  const onSubmit = async (values) => {
    console.log(values);
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VStack gap={4}>
          {inputs.map((field, idx) => {
            const key = `${field.name}-${idx}`;
            const { name, type } = field;

            if (type === "attachments") {
              return (
                <FormDropzone
                  id={idx}
                  key={key}
                  form={form}
                  fieldName={name}
                  fieldConfig={field}
                />
              );
            }

            if (type === "textarea") {
              return (
                <FormTextArea
                  id={idx}
                  key={key}
                  form={form}
                  fieldName={name}
                  fieldConfig={field}
                />
              );
            }

            if (type === "checkbox") {
              return (
                <FormCheckbox
                  id={idx}
                  key={key}
                  form={form}
                  fieldName={name}
                  fieldConfig={field}
                />
              );
            }

            if (type === "select") {
              return (
                <FormSelect
                  id={idx}
                  key={key}
                  form={form}
                  fieldName={name}
                  fieldConfig={field}
                />
              );
            }

            if (type === "url") {
              return (
                <FormInput
                  id={idx}
                  key={key}
                  form={form}
                  fieldName={name}
                  fieldConfig={field}
                  addon={"https://"}
                />
              );
            }

            return (
              <FormInput
                id={idx}
                key={key}
                form={form}
                fieldName={name}
                fieldConfig={field}
              />
            );
          })}
        </VStack>
        <Button type="submit">Submit</Button>
      </form>
      <Footer />
    </div>
  );
};

export default Editor;
