import { Field, Checkbox } from "@chakra-ui/react";
import { useController, useForm } from "react-hook-form";

export default function FormCheckbox({ id, form, fieldName, fieldConfig }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control: form.control,
  });

  const { label, placeholder } = fieldConfig;

  return (
    <Field.Root key={id} invalid={error ? true : false}>
      <Checkbox.Root
        variant={"subtle"}
        checked={field.value}
        onCheckedChange={({ checked }) => field.onChange(checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>{label}</Checkbox.Label>
      </Checkbox.Root>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
}
