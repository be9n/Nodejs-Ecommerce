require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRouter");
// admin routes
const userRouter = require("./routes/admin/userRoutes");
// user routes
const profileRouter = require("./routes/user/profileRoutes");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("e-commerce api");
});

app.use("/api/auth", authRouter);
// admin router
app.use("/api/admin/users", userRouter);
// user router
app.use("/api/profile", profileRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
