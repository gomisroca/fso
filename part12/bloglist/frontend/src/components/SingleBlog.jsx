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
    <div data-testid="blog" className="flex flex-col gap-y-2 p-2">
      <div className="text-xl">
        <span className="font-semibold">{blog.title}</span> by <span className="font-semibold">{blog.author}</span>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Link
          to={blog.url}
          className="w-fit rounded-md bg-neutral-200 p-2 text-sm transition-colors duration-200 hover:bg-neutral-300">
          🌐 {blog.url}
        </Link>
        <button
          data-testid="likeButton"
          onClick={() => handleLike()}
          className="flex w-20 items-center justify-evenly rounded-md bg-neutral-200 p-2 font-semibold text-neutral-800 transition-colors duration-200 hover:bg-neutral-300">
          <span>👍</span>
          <span>{blog.likes}</span>
        </button>
        {user && blog.user.username === user.username && (
          <button
            data-testid="deleteButton"
            onClick={() => deleteBlog()}
            className="w-fit rounded-md bg-red-600 p-2 font-semibold text-neutral-200 transition-colors duration-200 hover:bg-red-700">
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
                className="flex w-1/3 flex-col items-start gap-y-2 rounded-md border border-neutral-600 p-2">
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
