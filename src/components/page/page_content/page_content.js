import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPanel, SIZES } from '../../panel/panel';

const verticalPositionToClassNameMap = {
  center: 'euiPageContent--verticalCenter',
};

const horizontalPositionToClassNameMap = {
  center: 'euiPageContent--horizontalCenter',
};

export const VERTICAL_POSITIONS = Object.keys(verticalPositionToClassNameMap);
export const HORIZONTAL_POSITIONS = Object.keys(
  horizontalPositionToClassNameMap
);

export const EuiPageContent = ({
  verticalPosition,
  horizontalPosition,
  panelPaddingSize,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiPageContent',
    className,
    verticalPositionToClassNameMap[verticalPosition],
    horizontalPositionToClassNameMap[horizontalPosition]
  );

  return (
    <EuiPanel className={classes} paddingSize={panelPaddingSize} {...rest}>
      {children}
    </EuiPanel>
  );
};

EuiPageContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  panelPaddingSize: PropTypes.oneOf(SIZES),
  verticalPosition: PropTypes.oneOf(VERTICAL_POSITIONS),
  horizontalPosition: PropTypes.oneOf(HORIZONTAL_POSITIONS),
};

EuiPageContent.defaultProps = {
  panelPaddingSize: 'l',
};
