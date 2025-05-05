const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    username: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;