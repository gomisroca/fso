import { useSelector } from 'react-redux';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = () => {
  const user = useSelector(({ loggedInUser }) => {
    return loggedInUser;
  });
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  if (!blogs) {
    return null;
  }
  return (
    <>
      {user && (
        <Togglable buttonLabel="+ New Blog">
          <BlogForm />
        </Togglable>
      )}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

export default BlogList;
