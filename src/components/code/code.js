import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCodeBlock,
} from '../../components';

export const EuiCode = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiCodeBlock--inline', className);

  return (
    <EuiCodeBlock
      className={classes}
      {...rest}
    >
      {children}
    </EuiCodeBlock>
  );
};

EuiCode.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
