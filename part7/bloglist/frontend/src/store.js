import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';
import loggedInUserReducer from './reducers/loggedInUserReducer';
import commentsReducer from './reducers/commentsReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    comments: commentsReducer,
    loggedInUser: loggedInUserReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
});

export default store;
