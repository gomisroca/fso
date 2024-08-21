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
    <div className="flex flex-row items-center justify-between bg-neutral-600 p-4 font-semibold text-neutral-100 ">
      <div className="flex items-center  gap-x-4">
        <Link to="/" className="transition-colors duration-200 hover:text-neutral-300">
          Blogs
        </Link>
        <Link to="/users" className="transition-colors duration-200 hover:text-neutral-300">
          Users
        </Link>
      </div>
      <div>
        {user === null ? (
          <LoginForm />
        ) : (
          <div className="flex items-center gap-x-4">
            <span>{user.name}</span>
            <button
              className="rounded-md bg-neutral-200 px-2 py-1 font-semibold text-neutral-800 transition-colors duration-200 hover:bg-neutral-300"
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
