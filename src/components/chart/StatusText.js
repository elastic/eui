import React from 'react';
import PropTypes from 'prop-types';

function StatusText({
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  text
}) {
  const xTransform = `calc(-50% + ${marginLeft - marginRight}px)`;
  const yTransform = `calc(-50% + ${marginTop - marginBottom}px - 15px)`;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(${xTransform},${yTransform})`
      }}
    >
      {text}
    </div>
  );
}

StatusText.propTypes = {
  text: PropTypes.string
};

export default StatusText;
