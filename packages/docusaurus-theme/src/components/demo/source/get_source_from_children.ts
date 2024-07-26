import { Children, ReactElement, ReactNode } from 'react';
import { isElement } from 'react-is';

export interface SourceMeta {
  /**
   * The source code
   */
  code: string;
}

/**
 * Get source string from given children.
 */
export const getSourceFromChildren = (children: ReactNode): string | null => {
  // Direct (non-MDX) usage almost always passes a string
  if (typeof children === 'string') {
    return children;
  }

  if (Children.count(children) !== 1 || !isElement(children)) {
    // This should never happen
    return null;
  }

  const element = children as ReactElement;
  const functionName = (element.type as Function).name;
  // The code block content could render in either MDXPre (development builds)
  // or pre (optimized production builds)
  if (
    typeof element.type !== 'function' ||
    (functionName !== 'MDXPre' && functionName !== 'pre')
  ) {
    return null;
  }

  if (!isElement(element.props.children)) {
    return null;
  }

  const codeElement = element.props.children as ReactElement;
  if (!codeElement || !codeElement.props.children) {
    return null;
  }

  const code = codeElement.props.children;
  if (typeof code !== 'string') {
    return null;
  }

  return code;
};
