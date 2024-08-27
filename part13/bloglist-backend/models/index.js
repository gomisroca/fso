const Blog = require("./blog");
const User = require("./user");
const UserBlogs = require("./user_blogs");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserBlogs, as: "blog_list" });
Blog.belongsToMany(User, { through: UserBlogs, as: "list_user" });

module.exports = {
  Blog,
  User,
  UserBlogs,
};
