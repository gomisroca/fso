import React from 'react';
import { useDispatch } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogsReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (e) => {
    e.preventDefault();
    const blogObj = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    };
    dispatch(createBlog(blogObj));
    dispatch(createNotification(`${blogObj.title} by ${blogObj.author} added`));
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={addBlog} className="flex flex-row gap-x-2">
        <div className="flex items-center gap-x-2 uppercase">
          Title:
          <input className="rounded-md border border-neutral-600 px-2 py-1" data-testid="titleInput" name="title" />
        </div>
        <div className="flex items-center gap-x-2 uppercase">
          Author:
          <input className="rounded-md border border-neutral-600 px-2 py-1" name="author" data-testid="authorInput" />
        </div>
        <div className="flex items-center gap-x-2 uppercase">
          Url:
          <input className="rounded-md border border-neutral-600 px-2 py-1" data-testid="urlInput" name="url" />
        </div>
        <div className="flex items-center gap-x-2 uppercase">
          <button
            data-testid="addBlogButton"
            type="submit"
            className="w-fit rounded-md bg-green-800 px-2 py-1 font-semibold text-neutral-200 transition-colors duration-200 hover:bg-green-700">
            Add Blog
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
