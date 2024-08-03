import { loginUser } from '../reducers/loggedInUserReducer';
import { createNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value,
      };
      dispatch(loginUser(user));
      dispatch(createNotification(`${user.username} logged in`));
    } catch (exception) {
      dispatch(createNotification(exception.response.data.error));
    }
  };

  return (
    <form className="flex flex-row gap-x-2" onSubmit={handleLogin} data-testid="loginForm">
      <div className="uppercase flex gap-x-2 items-center">
        username
        <input className="border border-neutral-200 px-2 py-1 rounded-md" data-testid="username" name="username" />
      </div>
      <div className="uppercase flex gap-x-2 items-center">
        password
        <input
          className="border border-neutral-200 px-2 py-1 rounded-md"
          data-testid="password"
          type="password"
          name="password"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 px-2 py-1 text-neutral-800 font-semibold">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
