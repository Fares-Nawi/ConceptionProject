const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");

const connectDB = require("./server/database/connection");

const PORT = process.env.PORT || 4000;
//Import Routes
const userRouter = require("./server/routes/userRouter");
const projectRouter = require("./server/routes/projectRouter");
const loginRouter = require("./server/routes/loginRouter");
const resetPasswordRouter = require("./server/routes/resetPasswordRouter");
const sendMail = require("./server/services/emailService")




dotenv.config();

//Connect DB

connectDB();


// Enable CORS for all routes
app.use(cors());
//Middlewear
app.use(express.json());
//Route Middlewares
app.use("/api/users", userRouter);
app.use("/api/users", loginRouter);
app.use("/api/project", projectRouter);
app.use("/api/users", resetPasswordRouter);



app.listen(PORT, () => console.log("Running"));





