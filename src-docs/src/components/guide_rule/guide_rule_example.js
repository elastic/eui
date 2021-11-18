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
  default: 'guideRule__example--default',
};

const typeToSubtitleTextMap = {
  do: 'Do',
  dont: 'Don’t',
  default: null,
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

  let textColor;
  let doOrDont;
  let autoPanelColor;

  if (type === 'do') {
    textColor = 'success';
    doOrDont = typeToSubtitleTextMap[type];
    autoPanelColor = 'success';
  } else if (type === 'dont') {
    textColor = 'danger';
    doOrDont = typeToSubtitleTextMap[type];
    autoPanelColor = 'danger';
  } else if (type === 'default') {
    textColor = 'default';
    doOrDont = typeToSubtitleTextMap[type];
    autoPanelColor = 'subdued';
  }

  return (
    <EuiFlexItem style={{ flexBasis: 300 }}>
      <EuiSplitPanel.Outer
        className={classes}
        style={style}
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
            style={{ ...panelStyles, minHeight }}
            color={panelColor ? panelColor : autoPanelColor}
            {...panelProps}
          >
            {children}
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner
            color="transparent"
            paddingSize="none"
            className="guideRule__example__panelFooter"
          >
            <EuiText color={textColor} size="s">
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
  type: 'default',
};
