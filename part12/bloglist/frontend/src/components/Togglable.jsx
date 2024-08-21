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
        className="w-fit rounded-md bg-neutral-800 px-2 py-1 font-semibold text-neutral-200 transition-colors duration-200 hover:bg-neutral-700"
        style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div style={showWhenVisible} className="togglableContent flex flex-row gap-x-4">
        {props.children}
        <button
          onClick={toggleVisibility}
          data-testid="closeTogglable"
          className="w-fit rounded-md bg-red-800 px-2 py-1 font-semibold text-neutral-200 transition-colors duration-200 hover:bg-red-700">
          Close
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
