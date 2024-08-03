import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import commentService from '../services/comments';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const lsUserJSON = window.localStorage.getItem('bloglistUser');
    if (lsUserJSON) {
      const lsUser = JSON.parse(lsUserJSON);
      dispatch(setUser(lsUser));
      blogService.setToken(lsUser.token);
      commentService.setToken(lsUser.token);
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch(setUser(user));
    window.localStorage.setItem('bloglistUser', JSON.stringify(user));
    blogService.setToken(user.token);
    commentService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    blogService.setToken(null);
    commentService.setToken(null);
    window.localStorage.removeItem('bloglistUser');
  };
};

export default userSlice.reducer;
