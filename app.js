require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRouter");
// admin routes
const adminRoutes = require("./routes/admin/adminRoutes");
// user routes
const userRoutes = require("./routes/user/userRoutes");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.json());

app.use("/api/auth", authRouter);
// admin router
app.use("/api/admin", adminRoutes);
// user router
app.use("/api", userRoutes);

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
