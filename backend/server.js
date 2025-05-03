// configs
require("dotenv").config();
require("./config");

// imports
const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(clerkMiddleware());
app.use("/api/user", userRoutes);

// not found endpoint

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});


// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});