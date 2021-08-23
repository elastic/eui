import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiFlexItem,
  EuiText,
  EuiSplitPanel,
} from '../../../../src/components';

const typeToClassNameMap = {
  do: 'guideRule__example--do',
  dont: 'guideRule__example--dont',
};

const typeToSubtitleTextMap = {
  do: 'Do',
  dont: 'Don’t',
};

export const GuideRuleExample = ({
  children,
  className,
  type,
  text,
  minHeight,
  style,
  panelProps,
  panelStyles,
  panelDisplay = 'flex',
  panelColor,
  ...rest
}) => {
  const classes = classNames(
    'guideRule__example',
    typeToClassNameMap[type],
    className
  );

  const styles = { ...style, minHeight };

  if (type && !panelColor) {
    panelColor = type === 'do' ? 'success' : 'danger';
  }

  const doOrDont = type && typeToSubtitleTextMap[type];

  return (
    <EuiFlexItem>
      <EuiSplitPanel.Outer
        className={classes}
        style={styles}
        hasShadow={false}
        borderRadius="none"
        color="transparent"
        hasBorder={false}
        {...rest}
      >
        <figure>
          <EuiSplitPanel.Inner
            className={classNames('guideRule__example__panel', {
              'guideRule__example__panel--flex': panelDisplay === 'flex',
            })}
            style={panelStyles}
            color={panelColor}
            {...panelProps}
          >
            {children}
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner color="transparent">
            <EuiText color={type === 'do' ? 'success' : 'danger'} size="s">
              <p>
                {doOrDont && <strong>{doOrDont}.</strong>} {text}
              </p>
            </EuiText>
          </EuiSplitPanel.Inner>
        </figure>
      </EuiSplitPanel.Outer>
    </EuiFlexItem>
  );
};

GuideRuleExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
  type: PropTypes.string.isRequired,
  text: PropTypes.node,
  minHeight: PropTypes.number,
  panelProps: PropTypes.any,
};

GuideRuleExample.defaultProps = {
  type: 'do',
};
