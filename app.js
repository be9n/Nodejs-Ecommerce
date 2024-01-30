require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");

// database
const connectDB = require("./db/connect");

// routers
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

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
