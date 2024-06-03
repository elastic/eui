/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';
import { css } from '@emotion/react';
import { logicalCSS } from '../../../../global_styling';
import { EuiCheckbox } from '../../../form/checkbox';
import { EuiMarkdownContext } from '../../markdown_context';
import { useGeneratedHtmlId } from '../../../../services/accessibility';
import { EuiMarkdownAstNodePosition } from '../../markdown_types';
import { CheckboxNodeDetails } from './types';

type CheckboxMarkdownRendererProps = PropsWithChildren &
  CheckboxNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  };

export const CheckboxMarkdownRenderer: FunctionComponent<
  CheckboxMarkdownRendererProps
> = ({ position, lead, label, isChecked, children }) => {
  const { replaceNode, readOnly } = useContext(EuiMarkdownContext);
  return (
    <EuiCheckbox
      id={useGeneratedHtmlId()}
      checked={isChecked}
      label={children}
      onChange={() => {
        replaceNode(position, `${lead}[${isChecked ? ' ' : 'x'}]${label}`);
      }}
      css={markdownCheckboxStyles}
      readOnly={readOnly}
    />
  );
};

const markdownCheckboxStyles = css`
  /* && selector specificity overrides Sass. TODO: Remove once EuiCheckbox is on Emotion */
  && {
    /* Inherit from markdown text size */
    .euiCheckbox__input ~ .euiCheckbox__label {
      font-size: inherit;
      line-height: inherit;
      ${logicalCSS('padding-left', '1.5em')}
    }

    /* Add a margin-bottom if the next sibling is not another checkbox */
    &:has(+ :not(.euiCheckbox)) {
      ${logicalCSS('margin-bottom', '1em')}
    }

    /* Better align checkboxes with all text sizes */
    .euiCheckbox__input + .euiCheckbox__square {
      ${logicalCSS('top', '50%')}
      transform: translateY(-50%);
    }
  }
`;
