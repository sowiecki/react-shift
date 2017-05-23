import React from 'react';
import PropTypes from 'prop-types';

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
  fakeLink: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Arrow;
