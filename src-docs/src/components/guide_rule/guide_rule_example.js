import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
// import { useTheme } from 'emotion-theming';
import usePropagate from '../../../../src/services/propagate/use_propagate';
import { EuiFlexItem, EuiPanel } from '../../../../src/components';

const typeToSubtitleTextMap = {
  do: 'Do',
  dont: "Don't",
};

export const GuideRuleExample = ({
  children,
  type,
  text,
  panel,
  frame,
  minHeight,
  style,
  panelStyles,
  ...rest
}) => {
  // const theme = useTheme();
  const [colors, sizes, typography] = usePropagate([
    'colors',
    'sizes',
    'typography',
  ]);

  const guideRuleExample = css`
    pre {
      margin-bottom: 0;
      padding: 0;
    }
  `;

  const guideRuleExamplePanel = css`
    border-bottom: 2px solid;
    margin-bottom: ${sizes.euiSizeS}px;
    flex-grow: 1; /* 1 */

    ${!panel && `padding-bottom: ${sizes.euiSize}px;`}

    ${type === 'do' && `border-bottom-color: ${colors.euiColorSuccess};`}

    ${type === 'dont' && `border-bottom-color: ${colors.euiColorDanger};`}

    ${frame &&
      `padding: ${sizes.euiSizeL}px;
      background-color: ${colors.euiColorLightestShade};
      display: flex;
      align-items: center;
      justify-content: space-around;`}
  `;

  const guideRuleExampleCaption = css`
    @include euiFontSizeS; // TODO
    font-size: ${typography.euiFontSizeS}px; // TODO
    line-height: ${typography.euiLineHeight}; // TODO
    max-height: ${typography.euiFontSizeS * typography.euiLineHeight}px; /* 1 */
    overflow-y: visible; /* 1 */

    ${type === 'do' && `color: ${colors.euiColorSuccessText};`}

    ${type === 'dont' && `color: ${colors.euiColorDanger};`}
  `;

  const ChildrenComponent = panel ? EuiPanel : 'div';

  const styles = { ...style, minHeight };

  return (
    <EuiFlexItem
      component="figure"
      css={guideRuleExample}
      style={styles}
      {...rest}>
      <ChildrenComponent css={guideRuleExamplePanel} style={panelStyles}>
        {children}
      </ChildrenComponent>
      <figcaption css={guideRuleExampleCaption}>
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
