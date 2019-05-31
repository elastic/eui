import { CommonProps } from '../common';

import { FunctionComponent, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  type FontSize = 's' | 'm' | 'l';
  type PaddingSize = 'none' | 's' | 'm' | 'l';

  // there isn't a specific type for the <code> element, and MDN
  // says that it only supports the HTMLElement interface
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
  type HTMLCodeElement = HTMLElement;

  interface EuiCodeSharedProps {
    paddingSize?: PaddingSize;

    /**
     * Sets the syntax highlighting for a specific language
     * See http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
     * for options
     */
    language?: string;

    overflowHeight?: number;
    fontSize?: FontSize;
    transparentBackground?: boolean;
    isCopyable?: boolean;
  }

  /**
   * EuiCode type defs
   *
   * @see './code.js'
   */

  export interface EuiCodeProps extends EuiCodeSharedProps {
    inline?: true;
  }

  export const EuiCode: FunctionComponent<
    CommonProps & EuiCodeProps & HTMLAttributes<HTMLCodeElement>
  >;

  /**
   * EuiCodeBlock type defs
   *
   * @see './code_block.js'
   */

  export interface EuiCodeBlockProps extends EuiCodeSharedProps {
    inline?: false;
  }

  export const EuiCodeBlock: FunctionComponent<
    CommonProps & EuiCodeBlockProps & HTMLAttributes<HTMLCodeElement>
  >;
}
