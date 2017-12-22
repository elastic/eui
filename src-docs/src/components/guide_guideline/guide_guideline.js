import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiFlexGroup,
  EuiText,
  EuiFlexItem,
} from '../../../../src/components';

export const GuideGuideline = ({
  children,
  className,
  heading,
  description,
  ...rest,
}) => {
  const classes = classNames(
    'Guideline',
    {
      'Guideline--hasHeading': heading
    },
    className,
  );

  let headingNode;

  if (heading) {
    headingNode = (
      <h3>{heading}</h3>
    );
  }

  let descriptionNode;

  if (description) {
    descriptionNode = (
      <p>{description}</p>
    );
  }

  return (
    <EuiFlexGroup
      className={classes}
      {...rest}
    >

      <EuiFlexItem className="Guideline__description">
        <EuiText>
          {headingNode}
          {descriptionNode}
        </EuiText>
      </EuiFlexItem>

      {children}

    </EuiFlexGroup>
  );
};

GuideGuideline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};