import { Upload } from "lucide-react";
import { useController } from "react-hook-form";
import { Field, Box, FileUpload, Icon } from "@chakra-ui/react";

export const FormDropzone = ({ id, form, fieldName, fieldConfig }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control: form.control,
  });

  const handleFileAccept = ({ files }) => {
    const existingFiles = field.value || [];

    // Create a Set of existing file names
    const existingFileNames = new Set(existingFiles.map((f) => f.name));

    // Filter out duplicates by name
    const uniqueNewFiles = files.filter((f) => !existingFileNames.has(f.name));

    // Combine with existing files, up to max limit
    const combinedFiles = [...existingFiles, ...uniqueNewFiles].slice(0, 5);

    field.onChange(combinedFiles);
  };

  const { name, label, placeholder, type } = fieldConfig;
  return (
    <Field.Root key={id} invalid={error ? true : false}>
      <Field.Label>{label}</Field.Label>
      <FileUpload.Root
        accept={["image/*"]}
        value={field.value || []}
        onFileAccept={handleFileAccept}
        maxW="xl"
        alignItems="stretch"
        maxFiles={5}
        maxFileSize={5000000} // 5MB
      >
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone>
          <Icon size="md" color="fg.muted">
            <Upload />
          </Icon>
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.List showSize clearable />
      </FileUpload.Root>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};
