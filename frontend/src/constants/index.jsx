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
    name: "image",
    label: "Image URLs",
    placeholder: "https://example.com/image.png",
    type: "array",
  },
  {
    name: "liveLink",
    label: "Live Demo URL",
    placeholder: "https://your-project.com",
    type: "url",
  },
  {
    name: "githubLink",
    label: "GitHub Repo",
    placeholder: "https://github.com/username/repo",
    type: "url",
  },
  {
    name: "technologies",
    label: "Technologies Used",
    placeholder: "React, Node.js, MongoDB",
    type: "array",
  },
  {
    name: "isPublished",
    label: "Published",
    placeholder: "true or false",
    type: "checkbox",
  },
];

export const initials = {
  title: "",
  description: "",
  image: [],
  liveLink: "",
  githubLink: "",
  technologies: [],
  isPublished: false,
};
