import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <Link
      data-testid="blog"
      className="p-2 border-b border-neutral-600 hover:bg-neutral-300 transition-colors duration-200"
      to={`/blogs/${blog.id}`}>
      <span className="font-semibold">{blog.title}</span> by <span className="font-semibold">{blog.author}</span>
    </Link>
  );
};
export default Blog;
