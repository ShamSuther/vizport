import {
  Field,
  Input,
  InputGroup,
  Presence,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useController } from "react-hook-form";
import PresenceWrapper from "./Presence";

export default function FormInput({ id, form, fieldName, fieldConfig, addon }) {
  const { open, setOpen } = useDisclosure();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control: form.control,
  });

  const { label, placeholder, type } = fieldConfig;

  useEffect(() => {
    if (error) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error, setOpen]);

  if (addon) {
    return (
      <Field.Root key={id} invalid={error ? true : false}>
        <Field.Label>{label}</Field.Label>
        <InputGroup
          startElement={addon}
          startElementProps={{ color: "fg.muted", py: 1, px: 3 }}
        >
          <Input
            py={1}
            px={3}
            ps={`${addon.length - 1}ch`}
            ref={field.ref}
            rounded={"md"}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            placeholder={placeholder}
            transition={"all 150ms ease-in-out"}
            type={type}
          />
        </InputGroup>
        <Field.ErrorText transition={"all 150ms ease"}>
          {error?.message}
        </Field.ErrorText>
      </Field.Root>
    );
  }

  return (
    <Field.Root key={id} invalid={error ? true : false}>
      <Field.Label>{label}</Field.Label>
      <Input
        py={1}
        px={3}
        ref={field.ref}
        rounded={"lg"}
        onChange={field.onChange}
        onBlur={(e) => {
          let value = e.target.value;
          if (type === "url" && value && !/^https?:\/\//i.test(value)) {
            value = `https://${value}`;
            field.onChange(value);
          }
          field.onBlur();
        }}
        value={field.value}
        name={field.name}
        placeholder={placeholder}
        transition={"all 150ms ease-in-out"}
        type={type}
      />
      <PresenceWrapper>
        <Field.ErrorText>{error?.message}</Field.ErrorText>
      </PresenceWrapper>
    </Field.Root>
  );
}
