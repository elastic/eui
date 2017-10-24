import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTable = ({
  children,
  className,
  compressed,
  ...rest,
}) => {
  const classes = classNames('kuiTable', className, {
    'kuiTable--compressed': compressed,
  });

  return <table className={classes} {...rest} >{children}</table>;
};

EuiTable.propTypes = {
  compressed: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
