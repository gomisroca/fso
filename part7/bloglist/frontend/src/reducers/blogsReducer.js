import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlogLikes(state, action) {
      return state.map((blog) => (blog.id !== action.payload.id ? blog : { ...blog, likes: action.payload.likes }));
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlogLikes, removeBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    blogService.remove(blog.id);
    dispatch(removeBlog(blog.id));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateLikes(blog);
    dispatch(updateBlogLikes(updatedBlog));
  };
};

export default blogsSlice.reducer;
