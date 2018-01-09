import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';

const typeToClassNameMap = {
  'do': 'guideRule__example--do',
  'dont': 'guideRule__example--dont',
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
    'guideRule__example',
    typeToClassNameMap[type],
    className
  );

  let childrenNode;

  if (panel) {
    childrenNode = (
      <EuiPanel className="guideRule__example__panel">
        {children}
      </EuiPanel>
    );
  } else {
    childrenNode = (
      <div className="guideRule__example__panel">
        {children}
      </div>
    );
  }

  return (
    <EuiFlexItem
      component="figure"
      className={classes}
      {...rest}
    >

      {childrenNode}
      <figcaption className="guideRule__caption">{text || typeToSubtitleTextMap[type]}</figcaption>

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
