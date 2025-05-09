import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initials, inputs } from "@/constants";
import { Button } from "@chakra-ui/react";
import { formSchema } from "@/schemas/formSchema";
import { FormInput } from "@/components/FormInput";

const Editor = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initials,
  });

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Editor
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {inputs.map((field, idx) => {
          const key = `${field.name}-${idx}`;
          const { name } = field;
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Editor;
