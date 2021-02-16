import React, { useState, useImperativeHandle } from "react";

import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          style={{
            backgroundColor: "pink",
            border: "1px solid blue",
            borderRadius: "20px",
            padding: "5px",
            margin: "5px",
            width: "fit-content",
            fontFamily: "cursive",
            outline: 0,
          }}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
