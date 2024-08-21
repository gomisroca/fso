import { createSlice } from '@reduxjs/toolkit';
import commentsService from '../services/comments';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(_, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentsSlice.actions;

export const initializeComments = () => {
  return async (dispatch) => {
    const comments = await commentsService.getAll();
    dispatch(setComments(comments));
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    const newComment = await commentsService.create(comment);
    dispatch(appendComment(newComment));
  };
};

export default commentsSlice.reducer;
