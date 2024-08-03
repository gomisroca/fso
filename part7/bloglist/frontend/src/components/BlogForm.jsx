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
        <div className="uppercase flex gap-x-2 items-center">
          Title:
          <input className="border border-neutral-600 px-2 py-1 rounded-md" data-testid="titleInput" name="title" />
        </div>
        <div className="uppercase flex gap-x-2 items-center">
          Author:
          <input className="border border-neutral-600 px-2 py-1 rounded-md" name="author" data-testid="authorInput" />
        </div>
        <div className="uppercase flex gap-x-2 items-center">
          Url:
          <input className="border border-neutral-600 px-2 py-1 rounded-md" data-testid="urlInput" name="url" />
        </div>
        <div className="uppercase flex gap-x-2 items-center">
          <button
            data-testid="addBlogButton"
            type="submit"
            className="rounded-md bg-green-800 hover:bg-green-700 transition-colors duration-200 px-2 py-1 text-neutral-200 font-semibold w-fit">
            Add Blog
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
