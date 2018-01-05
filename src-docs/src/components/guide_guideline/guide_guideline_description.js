import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiText,
} from '../../../../src/components';

export const GuideGuidelineDescription = ({
  children,
  className,
  heading,
  description,
  ...rest,
}) => {
  const classes = classNames('GuidelineDescription', className);

  let headingNode;

  if (heading) {
    headingNode = (
      <h3>{heading}</h3>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiText>
        {headingNode}
        <p>{description}</p>
      </EuiText>

      {children}
    </div>
  );
};

GuideGuidelineDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string.isRequired,
};
