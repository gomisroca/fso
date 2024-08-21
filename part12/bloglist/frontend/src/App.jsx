import { useEffect } from 'react';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/loggedInUserReducer';
import { initializeUsers } from './reducers/usersReducer';
import { initializeComments } from './reducers/commentsReducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import SingleUser from './components/SingleUser';
import SingleBlog from './components/SingleBlog';
import BlogList from './components/BlogList';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
    dispatch(initializeComments());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Notification />
      <div className="flex flex-col gap-y-4 p-4">
        <span className="text-2xl font-bold uppercase">Blogs</span>
        <hr className="border-neutral-600" />
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/" element={<BlogList />} exact />
          <Route path="/blogs/:id" element={<SingleBlog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
