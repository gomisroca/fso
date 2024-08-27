const express = require("express");
require("express-async-errors");
const app = express();
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const { errorHandler } = require("./utils/middleware");
app.use(express.json());

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);
const readingListsRouter = require("./controllers/reading-lists");
app.use("/api/readinglists", readingListsRouter);
const authorsRouter = require("./controllers/authors");
app.use("/api/authors", authorsRouter);
const usersRouter = require("./controllers/users");
app.use("/api/users", usersRouter);
const loginRouter = require("./controllers/login");
app.use("/api/login", loginRouter);
const logoutRouter = require("./controllers/logout");
app.use("/api/logout", logoutRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
