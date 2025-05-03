const express = require("express");
const router = express.Router();
const User = require("../config/models/User");
const requireClerkAuth = require("../middleware/clerkAuth")
const { clerkClient } = require("@clerk/express");

router.post("/sync", requireClerkAuth, async (req, resp) => {
    try {
        const { users } = clerkClient;
        const clerkUserId = req.auth.userId;
        const clerkUser = await users.getUser(clerkUserId);

        if (clerkUser) {
            const email = clerkUser.emailAddresses?.[0]?.emailAddress;
            const imageUrl = clerkUser.imageUrl;
            const fullName = clerkUser.firstName && clerkUser.lastName
                ? `${clerkUser.firstName} ${clerkUser.lastName}`
                : null;
            const username = clerkUser.username || fullName || clerkUser.firstName || "Unknown";

            // Check if user already exists in MongoDB
            let user = await User.findOne({ clerkId: clerkUserId }).select("-__v -_id");

            if (!user) {
                user = new User({
                    clerkId: clerkUserId,
                    email,
                    imageUrl,
                    username
                });
                await user.save();
            }

            return resp.status(200).json({ success: true, user });
        }

        // fallback response (if clerkUser doesn't exist)
        resp.status(404).json({ success: false, message: "Clerk user not found" });
    } catch (error) {
        console.error("User sync error:", error);
        resp.status(500).json({ success: false, message: "Server error" });
    }

});

module.exports = router;