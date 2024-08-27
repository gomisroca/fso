const router = require("express").Router();

const { Op } = require("sequelize");
const { Blog, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

// Get all blogs
router.get("/", async (req, res) => {
  const where = {};
  if (req.query.search) {
    console.log(req.query.search);
    where[Op.or] = [
      {
        title: { [Op.iLike]: `%${req.query.search}%` },
      },
      {
        author: { [Op.iLike]: `%${req.query.search}%` },
      },
    ];
  }
  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(blogs);
});

// Create a new blog
router.post("/", tokenExtractor, async (req, res) => {
  const currentYear = new Date().getFullYear();
  if (req.body.year < 1991 || req.body.year > currentYear) {
    res.status(400).json({ error: "Invalid year" });
  }
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

// Get a single blog
router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

// Delete a blog
router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    const user = await User.findByPk(req.decodedToken.id);
    if (req.blog.userId.toString() !== user.id.toString()) {
      res.status(401).json({ error: "User not authorized" });
    } else {
      await req.blog.destroy();
    }
  }
  res.status(204).end();
});

// Update a blog
router.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

module.exports = router;
