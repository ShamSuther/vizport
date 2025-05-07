const express = require("express");
const router = express.Router();
const Project = require("../config/models/Project");
const requireClerkAuth = require("../middleware/clerkAuth")

// Create a new project
router.post("/", async (req, resp) => {
    try {
        const {
            title,
            description,
            image,
            liveLink,
            githubLink,
            technologies,
            isPublished,
        } = req.body;

        // Basic validation
        if (!title || !description) {
            return resp.status(400).json({ message: "Title and description are required" });
        }

        // const userId = req.params.id;
        const userId = req.auth.userId;

        const project = new Project({
            userId,
            title,
            description,
            image,
            liveLink,
            githubLink,
            technologies,
            isPublished,
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
    try {
        const userId = req.auth.userId;
        // const userId = req.params.id;

        const projects = await Project.find({ userId });

        if (projects && projects.length > 0) {
            resp.json(projects);
        }

        resp.status(404).json({ success: false, message: "No projects found" });
    } catch (err) {
        resp.status(500).json({ message: "Failed to fetch projects" });
    }
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
        const project = await Project.findById(req.params.id);
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
        const projects = await Project.find({ isPublished: true }).populate({path: "userId",select: "-__v"}).select(excluded).exec();

        if (projects && projects.length > 0) {
            projects.forEach((project) => {
                console.log(project);
            });
            return res.json(projects);
        }
        return res.status(404).json({ message: "No projects found!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message ||"Failed to fetch public projects" });
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