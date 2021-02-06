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
      <EuiSplitPanel
        className={classes}
        style={styles}
        hasShadow={false}
        borderRadius="none"
        {...rest}>
        {(InnerPanel) => (
          <figure>
            <InnerPanel
              className={classNames('guideRule__example__panel', {
                'guideRule__example__panel--flex': panelDisplay === 'flex',
              })}
              style={panelStyles}
              color={panelColor}
              {...panelProps}>
              {children}
            </InnerPanel>
            <InnerPanel color="transparent">
              <EuiText color={type === 'do' ? 'secondary' : 'danger'} size="s">
                <p>
                  {doOrDont && <strong>{doOrDont}.</strong>} {text}
                </p>
              </EuiText>
            </InnerPanel>
          </figure>
        )}
      </EuiSplitPanel>
    </EuiFlexItem>
  );
};

GuideRuleExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  minHeight: PropTypes.number,
  panelProps: PropTypes.any,
};

GuideRuleExample.defaultProps = {
  type: 'do',
};
