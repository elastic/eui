import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiFlexGroup,
  EuiText,
  EuiFlexItem,
} from '../../../../src/components';

import { GuideGuidelineExample } from './guide_guideline_example';

export const GuideGuideline = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('Guideline', className);

  return (
    <EuiFlexGroup
      className={classes}
      {...rest}
    >
      {children}

      <EuiFlexItem className="Guideline__description">
        <EuiText>
          <h3>Address users as &quot;you.&quot;</h3>
          <p>It&apos;s friendly and engages the user directly.</p>
        </EuiText>
      </EuiFlexItem>

      <GuideGuidelineExample type="do" />
      <GuideGuidelineExample type="dont" />

    </EuiFlexGroup>
  );
};

GuideGuideline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
