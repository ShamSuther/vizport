import { defineStyle } from "@chakra-ui/react";

export const inputs = [
  {
    name: "title",
    label: "Project Title",
    placeholder: "My Awesome Project",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Short description of your project...",
    type: "textarea",
  },
  {
    name: "liveLink",
    label: "Live Demo URL",
    placeholder: "your-project.com",
    type: "url",
  },
  {
    name: "githubLink",
    label: "GitHub Repo",
    placeholder: "github.com/username/repo",
    type: "url",
  },
  {
    name: "technologies",
    label: "Technologies Used",
    placeholder: "React, Node.js, MongoDB",
    type: "select",
  },
  {
    name: "images",
    label: "Image URLs",
    placeholder: "example.com/image.png",
    type: "attachments",
  },
  {
    name: "isPublished",
    label: "Make this public",
    placeholder: "true or false",
    type: "checkbox",
  },
];

export const initials = {
  title: "",
  description: "",
  images: [],
  liveLink: "",
  githubLink: "",
  technologies: [],
  isPublished: false,
};

export const allTechnologies = [
  // Core Programming Languages
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "c#" },
  { label: "Go", value: "go" },

  // Frontend Frameworks
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Next.js", value: "next.js" },

  // Backend Frameworks
  { label: "Express", value: "express" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Spring Boot", value: "spring boot" },
  { label: "Laravel", value: "laravel" },
  { label: "FastAPI", value: "fastapi" },
  { label: "NestJS", value: "nestjs" },

  // Databases
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "SQLite", value: "sqlite" },
  { label: "Firebase", value: "firebase" },
  { label: "Redis", value: "redis" },
];

export const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
