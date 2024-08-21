import { Link } from 'react-router-dom';

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

const Blog = ({ blog }) => {
  return (
    <Link
      data-testid="blog"
      className="border-b border-neutral-600 p-2 transition-colors duration-200 hover:bg-neutral-300"
      to={`/blogs/${blog.id}`}>
      <span className="font-semibold">{blog.title}</span> by <span className="font-semibold">{blog.author}</span>
    </Link>
  );
};
export default Blog;
