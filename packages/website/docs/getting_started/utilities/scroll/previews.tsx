import { css } from '@emotion/react';

import {
  EuiFlexGroup,
  logicalCSS,
  logicalCSSWithFallback,
  useEuiOverflowScroll,
  useEuiScrollBar,
  useEuiTheme,
} from '@elastic/eui';

import { ScrollContent } from './scroll_content';

const horizontalBaseCss = () => css`
  ${logicalCSSWithFallback('overflow-x', 'auto')}
  ${logicalCSS('width', '100%')}
`;

export const ScrollBarClassNamePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      tabIndex={0}
      className="eui-scrollBar"
      css={css`
        ${logicalCSSWithFallback('overflow-y', 'auto')}
        ${logicalCSS('height', `${euiTheme.base * 12}px`)}
      `}
    >
      <ScrollContent />
    </div>
  );
};

export const ScrollBarHookPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      tabIndex={0}
      css={[
        css`
          ${useEuiScrollBar()}
        `,
        css`
          ${logicalCSSWithFallback('overflow-y', 'auto')}
          ${logicalCSS('height', `${euiTheme.base * 12}px`)}
        `,
      ]}
    >
      <ScrollContent />
    </div>
  );
};

export const VerticalScrollClassNamePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      tabIndex={0}
      className="eui-yScrollWithShadows"
      css={css`
        ${logicalCSSWithFallback('overflow-y', 'auto')}
        ${logicalCSS('height', `${euiTheme.base * 12}px`)}
      `}
    >
      <ScrollContent />
    </div>
  );
};

export const VerticalScrollHookPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      tabIndex={0}
      css={[
        css`
          ${useEuiOverflowScroll('y', true)}
        `,
        css`
          ${logicalCSSWithFallback('overflow-y', 'auto')}
          ${logicalCSS('height', `${euiTheme.base * 12}px`)}
        `,
      ]}
    >
      <ScrollContent />
    </div>
  );
};

export const HorizontalScrollClassNamePreview = () => (
  <div tabIndex={0} className="eui-xScrollWithShadows" css={horizontalBaseCss}>
    <EuiFlexGroup
      css={css`
        ${logicalCSS('width', '150%')}
      `}
      responsive={false}
    >
      <ScrollContent direction="horizontal" />
    </EuiFlexGroup>
  </div>
);

export const HorizontalScrollHookPreview = () => (
  <div
    tabIndex={0}
    css={[
      css`
        ${useEuiOverflowScroll('x', true)};
      `,
      horizontalBaseCss,
    ]}
  >
    <EuiFlexGroup
      css={css`
        ${logicalCSS('width', '150%')}
      `}
      responsive={false}
    >
      <ScrollContent direction="horizontal" />
    </EuiFlexGroup>
  </div>
);
