import { Field, Textarea, Presence } from "@chakra-ui/react";
import { useController, useForm } from "react-hook-form";

export default function FormTextArea({ id, form, fieldName, fieldConfig }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control: form.control,
  });

  const { label, placeholder, type } = fieldConfig;

  return (
    <Field.Root key={id} invalid={error ? true : false}>
      <Field.Label color={"gray.300"}>{label}</Field.Label>
      <Textarea
        py={2}
        px={3}
        ref={field.ref}
        rounded={"md"}
        resize={"none"}
        maxLength={1300}
        height={{ base: "3rem", md: "6rem" }}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        placeholder={placeholder}
        type={type}
      />
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
}
