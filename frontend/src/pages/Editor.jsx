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

const Editor = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initials,
  });

  const { formState, clearErrors } = form;
  const { errors } = formState;

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  const onSubmit = async (values) => {
    console.log(values);
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div>
      Editor
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
    </div>
  );
};

export default Editor;
