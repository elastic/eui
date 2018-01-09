import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';

const typeToClassNameMap = {
  'do': 'guideRuleExample',
  'dont': 'GuidelineExample--dont',
};

const typeToSubtitleTextMap = {
  'do': 'Do',
  'dont': 'Don\'t',
};

export const GuideRuleExample = ({
  children,
  className,
  type,
  text,
  panel,
  ...rest,
}) => {

  const classes = classNames(
    'GuidelineExample',
    typeToClassNameMap[type],
    className
  );

  const panelClasses = classNames(
    'GuidelineExample__panel',
    {
      'GuidelineExample__panel--plain': !panel
    },
  );

  return (
    <EuiFlexItem
      className={classes}
      {...rest}
    >

      <EuiPanel className={panelClasses}>
        {children}
      </EuiPanel>
      <small>{text || typeToSubtitleTextMap[type]}</small>

    </EuiFlexItem>
  );
};

GuideRuleExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  panel: PropTypes.bool,
};

GuideRuleExample.defaultProps = {
  type: 'do',
  panel: true,
};
