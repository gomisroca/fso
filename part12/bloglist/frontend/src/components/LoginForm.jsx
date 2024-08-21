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
      <div className="flex items-center gap-x-2 uppercase">
        username
        <input className="rounded-md border border-neutral-200 px-2 py-1" data-testid="username" name="username" />
      </div>
      <div className="flex items-center gap-x-2 uppercase">
        password
        <input
          className="rounded-md border border-neutral-200 px-2 py-1"
          data-testid="password"
          type="password"
          name="password"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-neutral-200 px-2 py-1 font-semibold text-neutral-800 transition-colors duration-200 hover:bg-neutral-300">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
