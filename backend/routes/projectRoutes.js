const express = require("express");
const router = express.Router();
const Project = require("../config/models/Project");
const requireClerkAuth = require("../middleware/clerkAuth");
const upload = require("../middleware/multer");
const { uploadToCloudinary } = require("../utils")
const User = require("../config/models/User");

// Create a new project
router.post("/", requireClerkAuth, upload.array("images", 5), async (req, resp) => {
    try {
        const {
            title,
            description,
            liveLink,
            githubLink,
            isPublished,
            technologies,
        } = req.body;

        const userId = req.auth.userId;

        console.log(userId);

        // Ensure user exists in DB
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }

        console.log(user);

        // Basic validation
        if (!title || !description) {
            return resp.status(400).json({ message: "Title and description are required" });
        }

        if (!req.files || req.files.length === 0) {
            return resp.status(400).json({ message: "No files were uploaded." });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map((file) =>
            uploadToCloudinary(file.buffer, "vizport/uploads")
        );

        const uploadedImages = await Promise.all(uploadPromises);
        const imageUrls = uploadedImages.map((img) => img.url);

        // Ensure technologies is always an array
        const techArray = Array.isArray(technologies)
            ? technologies
            : technologies?.split(",").map((tech) => tech.trim()) || [];

        const project = new Project({
            userId: user._id,
            title,
            description,
            images: imageUrls,
            liveLink,
            githubLink,
            technologies: techArray,
            isPublished: isPublished === "true" || isPublished === true,
        });

        await project.save();

        return resp.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        console.error("Error creating project:", error);
        return resp.status(500).json({ message: "Internal server error" });
    }
});


// get users projects
router.get("/", async (req, resp) => {
    resp.json({ message: "running!!!!!!!!!!!!!!!" })
});

// Get a single project
router.get("/:id", async (req, res) => {
    try {
        const excluded = "-__v -_id";
        const project = await Project.findById(req.params.id).select(excluded);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // Public or owner access only
        if (!project.isPublished && req.auth?.userId !== project.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: "Error fetching project" });
    }
});

// Update a project
router.put("/:id", requireClerkAuth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project.userId !== req.auth.userId)
            return res.status(403).json({ message: "Unauthorized" });

        Object.assign(project, req.body);
        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: "Failed to update project" });
    }
});

// Delete a project
router.delete("/:id", requireClerkAuth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate({ path: "userId", select: "-__v" }).select(excluded).exec();
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project.userId !== req.auth.userId)
            return res.status(403).json({ message: "Unauthorized" });

        await project.deleteOne();
        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete project" });
    }
});

// Public projects
router.get("/public/all", async (req, res) => {
    try {
        const excluded = "-__v -description -technologies";
        const projects = await Project.find({ isPublished: true }).populate({ path: "userId", select: "-__v" }).select(excluded).exec();

        if (projects && projects.length > 0) {
            return res.json(projects);
        }
        return res.status(404).json({ message: "No projects found!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message || "Failed to fetch public projects" });
    }
});

// Search public projects
// router.get("/public/search", async (req, res) => {
//     try {
//         const query = req.query.q || "";
//         const regex = new RegExp(query, "i");

//         const projects = await Project.find({
//             isPublished: true,
//             $or: [{ title: regex }, { technologies: regex }],
//         });

//         res.json(projects);
//     } catch (err) {
//         res.status(500).json({ message: "Search failed" });
//     }
// });

module.exports = router;