const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: String, // Clerk user ID
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        images: {
            type: [String], // image URL (e.g., Cloudinary)
            default: [],
            required: true,
        },
        liveLink: {
            type: String,
            default: "",
        },
        githubLink: {
            type: String,
            default: "",
        },
        technologies: {
            type: [String], // e.g., ["React", "Node.js", "MongoDB"]
            default: [],
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
