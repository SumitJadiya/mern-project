require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors");

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

// DB connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        ~``
        console.log("DB connected")
    })

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)

// Port
const port = process.env.DATABASE_PORT;

// Server
app.listen(port, () => {
    console.log(`app is running at ${port}`)
});
