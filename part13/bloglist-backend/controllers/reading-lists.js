const router = require("express").Router();

const { Blog, User, UserBlogs } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = await User.findByPk(req.body.userId);
  console.log(user);
  const blog = await Blog.findByPk(req.body.blogId);
  console.log(blog);
  if (!user || !blog) {
    res.status(404).end();
  }
  const userBlog = await UserBlogs.create({
    userId: user.id,
    blogId: blog.id,
  });
  res.json(userBlog);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const userBlog = await UserBlogs.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (userBlog.userId.toString() !== user.id.toString()) {
    res.status(401).json({ error: "User not authorized" });
  }
  if (!userBlog) {
    res.status(404).end();
  }
  userBlog.status = req.body.status;
  await userBlog.save();
  res.json(userBlog);
});

module.exports = router;
