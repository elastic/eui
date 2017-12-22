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
  text,
  ...rest,
}) => {

  const classes = classNames(
    'GuidelineExample',
    typeToClassNameMap[type],
    className
  );


  let textNode;

  if (text) {
    textNode = (
      <EuiText><p>{text}</p></EuiText>
    );
  }

  return (
    <EuiFlexItem
      className={classes}
      {...rest}
    >

      <EuiPanel>
        {textNode}
        {children}
      </EuiPanel>
      <small>{typeToSubtitleTextMap[type]}</small>

    </EuiFlexItem>
  );
};

GuideGuidelineExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string
};

GuideGuidelineExample.defaultProps = {
  type: 'do'
};
