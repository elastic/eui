import { css } from '@emotion/react';

const wrappingExampleStyle = css`
  background: rgba(254, 228, 181, 0.5);
`;

const spanStyle = css`
  ${wrappingExampleStyle}
  max-width: 300px;
  padding: 16px;
`;

export const ShowForExamplePreview = () => {
  return (
    <div
      css={wrappingExampleStyle}
      className="eui-showFor--xs eui-showFor--s eui-showFor--m--block eui-showFor--l--inlineBlock eui-showFor--xl--flex"
    >
      <span css={spanStyle}>span</span>
      <span css={spanStyle}>span</span>
      <span css={spanStyle}>span</span>
    </div>
  );
};
