import { Field, Input } from "@chakra-ui/react";
import { useController, useForm } from "react-hook-form";

export function FormInput({ id, form, fieldName, fieldConfig }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control: form.control,
  });

  const { name, label, placeholder, type } = fieldConfig;

  return (
    <Field.Root key={id} invalid={error ? true : false}>
      <Field.Label>{label}</Field.Label>
      <Input
        ref={field.ref}
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
