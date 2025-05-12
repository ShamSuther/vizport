const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, maxlength: 2000 },
        images: { type: [String], required: true },
        liveLink: { type: String, default: "" },
        githubLink: { type: String, default: "" },
        technologies: { type: [String], default: [] },
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);