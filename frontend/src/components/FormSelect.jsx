import React, { useMemo } from "react";
import { Field, Select, createListCollection, Portal } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { allTechnologies } from "@/constants";

export default function FormSelect({ id, form, fieldName, fieldConfig }) {
  const frameworks = useMemo(
    () => createListCollection({ items: allTechnologies }),
    []
  );

  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control: form.control,
  });

  const { name, label, placeholder, type } = fieldConfig;

  return (
    <Field.Root key={id} invalid={!!error}>
      <Select.Root
        value={field.value}
        onValueChange={({ value }) => {
          field.onChange(value);
        }}
        multiple
        collection={frameworks}
        size="sm"
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
