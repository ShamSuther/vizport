import { Field, Select, createListCollection, Portal } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { allTechnologies } from "@/constants";

export default function FormSelect({ id, form, fieldName, fieldConfig }) {
  const frameworks = createListCollection({ items: allTechnologies });

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
      {/* <Field.Label>{label}</Field.Label>
      <Input
        py={1}
        px={3}
        ref={field.ref}
        rounded={"md"}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        placeholder={placeholder}
        transition={"all 150ms ease-in-out"}
        type={type}
      /> */}
      <Select.Root
      search
        value={field.value}
        onValueChange={(e) => field.onChange(e.value)}
        multiple
        collection={frameworks}
        size="sm"
        width="320px"
      >
        <Select.HiddenSelect />
        <Select.Label>{label}</Select.Label>
        <Select.Control>
          <Select.Trigger py={1} px={3}>
            <Select.ValueText placeholder="Select framework" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator py={1} px={3} />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content maxHeight={150}>
              {frameworks.items.map((framework) => (
                <Select.Item
                  py={1}
                  px={3}
                  item={framework}
                  key={framework.value}
                >
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
}
