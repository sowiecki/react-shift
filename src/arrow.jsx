import React, { Component, PropTypes } from 'react';

const Arrow = ({ id, onClick, label }) => {
  return (
    <div className='react-shift-nav-arrow'>
      <a id={id} href='#' onClick={onClick}>
        {label}
      </a>
    </div>
  );
};

Arrow.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string
};

export default Arrow;
