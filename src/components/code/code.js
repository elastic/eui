import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCodeBlock,
} from '../../components';

export const EuiCode = ({
  children,
  transparentBackground,
  language,
  className,
  ...rest
}) => {
  const classes = classNames('euiCodeBlock--inline', className);

  return (
    <EuiCodeBlock
      transparentBackground={transparentBackground}
      language={language}
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
  transparentBackground: false,
};
