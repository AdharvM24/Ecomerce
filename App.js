const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const config = require("./config/config");
const configureBodyParser = require("./middleware/bodyParser");
require("dotenv").config();
const authenticateJWT = require("./middleware/authMiddleware");
const addProduct = require('./routes/adminRoutes')
const adminRoutes = require('./routes/adminRoutes')
const logger = require("./middleware/logger");
const app = express();
const port = process.env.PORT;

//middleware
configureBodyParser(app);
app.use(logger);
// Routes
app.use("/api/auth", authRoutes, adminRoutes);
app.use("/api", authenticateJWT, authRoutes, adminRoutes);
app.use('/admin', adminRoutes)
// Connect to MongoDB
mongoose.connect(config.databaseUrl).then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    })
    .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    });
