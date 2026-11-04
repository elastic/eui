/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { EuiCallOut, type EuiCallOutProps, type IconType } from '@elastic/eui';
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

type VariantProps = Pick<EuiCallOutProps, 'color'> & {
  /** Only set when overriding CallOut's color-based default notification icon */
  iconType?: IconType;
};

/**
 * Map Docusaurus admonition types → EuiCallOut color.
 * Omit iconType so CallOut uses its default notification icons from color.
 */
const VARIANT_TO_PROPS_MAP: Record<CalloutVariant, VariantProps> = {
  note: { color: 'primary' },
  tip: { color: 'success' },
  info: { color: 'primary' },
  accessibility: { color: 'success', iconType: 'accessibility' },
  warning: { color: 'warning' },
  danger: { color: 'danger' },
  // Undocumented legacy admonition type aliases
  secondary: { color: 'primary' },
  important: { color: 'primary' },
  success: { color: 'success' },
  caution: { color: 'warning' },
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
  const variantProps =
    VARIANT_TO_PROPS_MAP[type as CalloutVariant] ?? VARIANT_TO_PROPS_MAP.note;

  return (
    <EuiCallOut
      title={title}
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
