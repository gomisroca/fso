import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

const SingleBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;

  const blog = useSelector(({ blogs }) => {
    return blogs.find((blog) => blog.id === id);
  });

  const comments = useSelector(({ comments }) => {
    return comments.filter((comment) => comment.blog.id === id);
  });

  const user = useSelector(({ loggedInUser }) => {
    return loggedInUser;
  });

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(createNotification(`You liked "${blog.title}" by ${blog.author}`));
  };

  const deleteBlog = () => {
    if (confirm(`Are you sure you want to delete the blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate('/');
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div data-testid="blog" className="p-2 flex flex-col gap-y-2">
      <div className="text-xl">
        <span className="font-semibold">{blog.title}</span> by <span className="font-semibold">{blog.author}</span>
      </div>
      <div className="flex flex-row gap-x-2 items-center">
        <Link
          to={blog.url}
          className="text-sm bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 w-fit p-2 rounded-md">
          🌐 {blog.url}
        </Link>
        <button
          data-testid="likeButton"
          onClick={() => handleLike()}
          className="w-20 justify-evenly flex items-center rounded-md bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 p-2 text-neutral-800 font-semibold">
          <span>👍</span>
          <span>{blog.likes}</span>
        </button>
        {user && blog.user.username === user.username && (
          <button
            data-testid="deleteButton"
            onClick={() => deleteBlog()}
            className="w-fit rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 p-2 text-neutral-200 font-semibold">
            Delete Blog
          </button>
        )}
      </div>
      <div className="text-sm">Posted by {blog.user.name}</div>
      <span className="font-semibold">Comments</span>
      {user && <CommentForm />}
      {comments.length > 0 ? (
        <div>
          <div className="flex flex-col gap-y-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col gap-y-2 items-start p-2 border rounded-md border-neutral-600 w-1/3">
                <div className="text-sm">{comment.user.name}</div>
                <div className="text-lg">{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No comments yet</div>
      )}
    </div>
  );
};
export default SingleBlog;
