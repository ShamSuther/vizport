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
  // Programming Languages
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "c++" },
  { label: "C#", value: "c#" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Ruby", value: "ruby" },
  { label: "TypeScript", value: "typescript" },
  { label: "PHP", value: "php" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "R", value: "r" },
  { label: "Dart", value: "dart" },
  { label: "Scala", value: "scala" },
  { label: "Perl", value: "perl" },
  { label: "Haskell", value: "haskell" },
  { label: "Objective-C", value: "objective-c" },
  { label: "Elixir", value: "elixir" },
  { label: "Lua", value: "lua" },

  // Frontend Frameworks
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "next.js" },
  { label: "Nuxt.js", value: "nuxt.js" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Alpine.js", value: "alpine.js" },
  { label: "SolidJS", value: "solidjs" },
  { label: "Qwik", value: "qwik" },

  // Backend Frameworks
  { label: "Express", value: "express" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Laravel", value: "laravel" },
  { label: "Spring Boot", value: "spring boot" },
  { label: "FastAPI", value: "fastapi" },
  { label: "NestJS", value: "nestjs" },
  { label: "Rails", value: "rails" },
  { label: "ASP.NET Core", value: "asp.net core" },
  { label: "Phoenix", value: "phoenix" },

  // Mobile Frameworks
  { label: "React Native", value: "react native" },
  { label: "Flutter", value: "flutter" },
  { label: "SwiftUI", value: "swiftui" },
  { label: "Kotlin Multiplatform", value: "kotlin multiplatform" },
  { label: "Xamarin", value: "xamarin" },
  { label: "Ionic", value: "ionic" },
  { label: "Cordova", value: "cordova" },

  // Database Tech
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "SQLite", value: "sqlite" },
  { label: "Redis", value: "redis" },
  { label: "Oracle", value: "oracle" },
  { label: "Firebase", value: "firebase" },
  { label: "Supabase", value: "supabase" },
  { label: "DynamoDB", value: "dynamodb" },
  { label: "MariaDB", value: "mariadb" },

  // Dev Tools and Others
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "Git", value: "git" },
  { label: "Webpack", value: "webpack" },
  { label: "Vite", value: "vite" },
  { label: "Babel", value: "babel" },
  { label: "ESLint", value: "eslint" },
  { label: "Prettier", value: "prettier" },
  { label: "Tailwind CSS", value: "tailwind css" },
  { label: "Sass", value: "sass" },
  { label: "GraphQL", value: "graphql" },
  { label: "REST API", value: "rest api" },
  { label: "OAuth", value: "oauth" },
  { label: "JWT", value: "jwt" },
  { label: "CI/CD", value: "ci/cd" },
  { label: "Nginx", value: "nginx" },
  { label: "Apache", value: "apache" }
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
