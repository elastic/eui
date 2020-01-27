import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFlexItem, EuiPanel } from '../../../../src/components';

const typeToClassNameMap = {
  do: 'guideRule__example--do',
  dont: 'guideRule__example--dont',
};

const typeToSubtitleTextMap = {
  do: 'Do',
  dont: "Don't",
};

export const GuideRuleExample = ({
  children,
  className,
  type,
  text,
  panel,
  frame,
  minHeight,
  style,
  panelStyles,
  ...rest
}) => {
  const classes = classNames(
    'guideRule__example',
    typeToClassNameMap[type],
    {
      'guideRule__example--frame': frame,
    },
    className
  );

  const ChildrenComponent = panel ? EuiPanel : 'div';

  const styles = { ...style, minHeight };

  return (
    <EuiFlexItem
      component="figure"
      className={classes}
      style={styles}
      {...rest}>
      <ChildrenComponent
        className="guideRule__example__panel"
        style={panelStyles}>
        {children}
      </ChildrenComponent>
      <figcaption className="guideRule__caption">
        {text || typeToSubtitleTextMap[type]}
      </figcaption>
    </EuiFlexItem>
  );
};

GuideRuleExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  panel: PropTypes.bool,
  minHeight: PropTypes.number,
};

GuideRuleExample.defaultProps = {
  type: 'do',
  panel: true,
};
