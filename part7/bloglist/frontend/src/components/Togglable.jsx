import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div
        className="rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 px-2 py-1 text-neutral-200 font-semibold w-fit"
        style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent flex flex-row gap-x-4">
        {props.children}
        <button
          onClick={toggleVisibility}
          data-testid="closeTogglable"
          className="rounded-md bg-red-800 hover:bg-red-700 transition-colors duration-200 px-2 py-1 text-neutral-200 font-semibold w-fit">
          Close
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
