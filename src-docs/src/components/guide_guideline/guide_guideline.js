import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiFlexGroup,
} from '../../../../src/components';

import {
  GuideGuidelineDescription,
} from '../../components';

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
      'Guideline--hasHeading': description
    },
    className,
  );

  let descriptionNode;

  if (description) {
    descriptionNode = (
      <GuideGuidelineDescription
        heading={heading}
        description={description}
      />
    );
  }

  return (
    <div
      wrap={true}
      className={classes}
      {...rest}
    >
      {descriptionNode}

      <EuiFlexGroup className="Guideline__exampleRow" gutterSize="xl" wrap>
        {children}
      </EuiFlexGroup>

    </div>
  );
};

GuideGuideline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};
