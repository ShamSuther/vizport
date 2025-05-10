import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .nonempty("Project title is required!")
    .min(10, "Title must be at least 10 characters"),

  description: z
    .string()
    .nonempty("Project description is required!")
    .min(50, "Description must be at least 50 characters"),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .nonempty("At least one image is required"),

  liveLink: z
    .string()
    .url("Live project URL must be valid")
    .nonempty("Project URL is required!")
    .min(10, "Project URL must be at least 10 characters"),

  githubLink: z
    .string()
    .url("GitHub link must be a valid URL")
    .nonempty("GitHub link is required"),

  // technologies: z
  //   .array(z.string().min(1, "Technology name can't be empty"))
  //   .nonempty("At least one technology is required"),

  isPublished: z.boolean(),
});
