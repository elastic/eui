import { CommonProps } from '../common';

import React, { FunctionComponent, HTMLAttributes } from 'react';

import { EuiCodeBlockImpl } from './_code_block';

export type FontSize = 's' | 'm' | 'l';
export type PaddingSize = 'none' | 's' | 'm' | 'l';

export interface EuiCodeSharedProps {
  paddingSize?: PaddingSize;

  /**
   * Sets the syntax highlighting for a specific language
   * @see http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
   * for options
   */
  language?: string;
  overflowHeight?: number;
  fontSize?: FontSize;
  transparentBackground?: boolean;
  isCopyable?: boolean;
}

export interface EuiCodeProps extends EuiCodeSharedProps {
  inline?: true;
}

type Props = CommonProps & EuiCodeProps & HTMLAttributes<HTMLElement>;

export const EuiCode: FunctionComponent<Props> = ({ inline, ...rest }) => {
  return <EuiCodeBlockImpl inline={true} {...rest} />;
};
