/**
 * Copyright (c) TODO
 */

import { css } from '@emotion/react';
import { EuiCallOut, EuiText } from '@elastic/eui';
import type { Props } from '@theme-original/Admonition';
import type AdmonitionTypes from '@theme-original/Admonition/Types';

type CalloutVariant =
  | 'note'
  | 'tip'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'important'
  | 'success'
  | 'caution';
type VariantColor = 'accent' | 'primary' | 'success' | 'warning' | 'danger';

const VARIANT_TO_PROPS_MAP: Record<
  CalloutVariant,
  { iconType?: string; color?: VariantColor }
> = {
  note: { iconType: 'paperClip', color: 'accent' },
  tip: { iconType: 'faceHappy', color: 'success' },
  info: { iconType: 'iInCircle', color: 'primary' },
  warning: { iconType: 'alert', color: 'warning' },
  danger: { iconType: 'error', color: 'danger' },
  // Undocumented legacy admonition type aliases
  secondary: {},
  important: {},
  success: {},
  caution: {},
};

// MDXComponents/Paragraph wraps <p> in <EuiText>,
// this is a workaround to keep styles from <EuiText> in the admonition
const nestedParagraphStyleReset = css`
  p.euiText {
    font-size: inherit;
    line-height: inherit;
  }
`;

const Callout = ({ title, type, children }: Props) => {
  const variantProps = VARIANT_TO_PROPS_MAP[type as CalloutVariant];

  return (
    <EuiCallOut
      title={title}
      iconType="iInCircle"
      color="primary"
      {...variantProps}
      css={nestedParagraphStyleReset}
    >
      {children}
    </EuiCallOut>
  );
};

const admonitionTypes: typeof AdmonitionTypes = {
  note: Callout,
  tip: Callout,
  info: Callout,
  warning: Callout,
  danger: Callout,
  secondary: Callout,
  important: Callout,
  success: Callout,
  caution: Callout,
};

export default admonitionTypes;
