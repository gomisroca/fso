import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loggedInUserReducer';

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(({ loggedInUser }) => {
    return loggedInUser;
  });

  return (
    <div className="flex flex-row bg-neutral-600 p-4 justify-between items-center text-neutral-100 font-semibold ">
      <div className="flex gap-x-4  items-center">
        <Link to="/" className="hover:text-neutral-300 transition-colors duration-200">
          Blogs
        </Link>
        <Link to="/users" className="hover:text-neutral-300 transition-colors duration-200">
          Users
        </Link>
      </div>
      <div>
        {user === null ? (
          <LoginForm />
        ) : (
          <div className="flex gap-x-4 items-center">
            <span>{user.name}</span>
            <button
              className="rounded-md bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 px-2 py-1 text-neutral-800 font-semibold"
              onClick={() => dispatch(logoutUser())}
              data-testid="logoutButton">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
