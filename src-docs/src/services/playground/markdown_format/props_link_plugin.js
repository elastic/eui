import React from 'react';
import { EuiLink } from '../../../../../src/components';

export function PropsLinkMarkdownParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  function tokenizePropsLink(eat, value, silent) {
    const tokenMatch = value.match(/^#([a-zA-Z]+)/);

    if (!tokenMatch) return false;
    const [, propId] = tokenMatch;

    if (silent) return true;

    return eat(`#${propId}`)({ type: 'propsLinkPlugin', propId });
  }

  tokenizePropsLink.locator = (value, fromIndex) => {
    return value.indexOf('#', fromIndex);
  };

  tokenizers.propsLink = tokenizePropsLink;
  methods.splice(methods.indexOf('text'), 0, 'propsLink');
}

export const PropsLinkMarkdownRenderer = ({ propId }) => {
  const onClick = () => {
    document.getElementById(propId).scrollIntoView();
    window.scrollBy(0, -48); // Account for sticky header height
  };

  return <EuiLink onClick={onClick}>{propId}</EuiLink>;
};
