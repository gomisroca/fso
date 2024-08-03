import React from 'react';
import { useDispatch } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';
import { useParams } from 'react-router-dom';
import { createComment } from '../reducers/commentsReducer';

const CommentForm = () => {
  const blogId = useParams().id;
  const dispatch = useDispatch();

  const addBlog = (e) => {
    e.preventDefault();
    const comment = {
      content: e.target.content.value,
      blogId: blogId,
    };
    dispatch(createComment(comment));
    dispatch(createNotification('Comment added'));
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={addBlog} className="flex flex-row gap-x-2">
        <input
          className="w-1/3 rounded-md border-2 border-neutral-600 px-2 py-1"
          data-testid="contentInput"
          name="content"
        />
        <button
          data-testid="addBlogButton"
          type="submit"
          className="w-fit rounded-md bg-green-800 px-2 py-1 font-semibold text-neutral-200 transition-colors duration-200 hover:bg-green-700">
          Add Comment
        </button>
      </form>
    </>
  );
};

export default CommentForm;
