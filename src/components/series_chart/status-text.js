import React from 'react';
import PropTypes from 'prop-types';
import { EuiText } from '../text';
import { EuiIcon } from '../icon';

function StatusText({ width, height, text }) {
  return (
    <div className="euixychart-error-nodata" style={{ width, height }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgb(53, 129, 255)',
        }}>
        <div className="euiToastHeader--withBody">
          <EuiIcon
            className="euiToastHeader__icon"
            type="visualizeApp"
            color="subdued"
            size="m"
            aria-hidden="true"
          />
          <span className="euiToastHeader__title">Graph not avaliable</span>
        </div>
        {text && <EuiText size="s">{text}</EuiText>}
      </div>
    </div>
  );
}

StatusText.propTypes = {
  text: PropTypes.string,
};

export default StatusText;
