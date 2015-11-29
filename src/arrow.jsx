import React, { PropTypes } from 'react';

const Arrow = ({ fakeLink, onClick, label, className, style }) => (
  <a
    className={className}
    style={style}
    href={fakeLink ? '#' : null}
    onClick={onClick}>
      {label}
  </a>
);

Arrow.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Arrow;
