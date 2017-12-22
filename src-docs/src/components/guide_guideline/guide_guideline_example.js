import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiText,
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';

const typeToClassNameMap = {
  'do': 'GuidelineExample--do',
  'dont': 'GuidelineExample--dont',
};

const typeToSubtitleTextMap = {
  'do': 'Do',
  'dont': 'Don\'t',
};

export const GuideGuidelineExample = ({
  children,
  className,
  type,
  ...rest,
}) => {

  const classes = classNames(
    'GuidelineExample',
    typeToClassNameMap[type],
    className
  );

  return (
    <EuiFlexItem
      className={classes}
      {...rest}
    >

      <EuiPanel hasShadow={true}>
        {children}
        <EuiText><p>You must configure TLS to apply a Platinum License.</p></EuiText>
      </EuiPanel>
      <small>{typeToSubtitleTextMap[type]}</small>

    </EuiFlexItem>
  );
};

GuideGuidelineExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

GuideGuidelineExample.defaultProps = {
  type: 'do'
};
