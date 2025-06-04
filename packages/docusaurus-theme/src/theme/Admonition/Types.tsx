/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { EuiCallOut, EuiText } from '@elastic/eui';
import type { Props } from '@theme-original/Admonition';
import type AdmonitionTypes from '@theme-original/Admonition/Types';

type CalloutVariant =
  | 'note'
  | 'tip'
  | 'info'
  | 'accessibility'
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
  info: { iconType: 'info', color: 'primary' },
  accessibility: { iconType: 'accessibility', color: 'primary' },
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
      iconType="info"
      color="primary"
      {...variantProps}
      css={css`
        margin-block: var(--eui-theme-content-vertical-spacing);
        ${nestedParagraphStyleReset}
      `}
    >
      {children}
    </EuiCallOut>
  );
};

const admonitionTypes: typeof AdmonitionTypes = {
  note: Callout,
  tip: Callout,
  info: Callout,
  accessibility: Callout,
  warning: Callout,
  danger: Callout,
  secondary: Callout,
  important: Callout,
  success: Callout,
  caution: Callout,
};

export default admonitionTypes;
