import { css } from '@emotion/react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  logicalCSS,
  logicalCSSWithFallback,
  useEuiOverflowScroll,
  useEuiScrollBar,
} from '@elastic/eui';

import { ScrollContent } from './scroll_content';

const verticalBaseCss = ({ euiTheme }) => css`
  ${logicalCSSWithFallback('overflow-y', 'auto')}
  ${logicalCSS('height', `${euiTheme.base * 12}px`)}
`;

const horizontalBaseCss = () => css`
  ${logicalCSSWithFallback('overflow-x', 'auto')}
  ${logicalCSS('width', '100%')}
`;

export const ScrollBarClassNamePreview = () => (
  <div tabIndex={0} className="eui-scrollBar" css={verticalBaseCss}>
    <ScrollContent />
  </div>
);

export const ScrollBarHookPreview = () => (
  <div
    tabIndex={0}
    css={[
      css`
        ${useEuiScrollBar()}
      `,
      verticalBaseCss,
    ]}
  >
    <ScrollContent />
  </div>
);

export const VerticalScrollClassNamePreview = () => (
  <div tabIndex={0} className="eui-yScrollWithShadows" css={verticalBaseCss}>
    <ScrollContent />
  </div>
);

export const VerticalScrollHookPreview = () => (
  <div
    tabIndex={0}
    css={[
      css`
        ${useEuiOverflowScroll('y', true)}
      `,
      verticalBaseCss,
    ]}
  >
    <ScrollContent />
  </div>
);

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
