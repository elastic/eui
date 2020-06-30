import React from 'react';
import all from 'mdast-util-to-hast/lib/all';
import { EuiToolTip } from '../../../../../src';

const tooltipPlugin = {
  name: 'tooltipPlugin',
  button: {
    label: 'Tooltip',
    iconType: 'flag',
  },
  formatting: {
    prefix: '!{tooltip[',
    suffix: ']()}',
    trimFirst: true,
  },
};

function TooltipParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  function tokenizeTooltip(eat, value, silent) {
    if (value.startsWith('!{tooltip') === false) return false;

    const nextChar = value[9];

    if (nextChar !== '[') return false; // this isn't actually a tooltip

    let index = 9;
    function readArg(open, close) {
      if (value[index] !== open) throw 'Expected left bracket';
      index++;

      let body = '';
      let openBrackets = 0;

      for (; index < value.length; index++) {
        const char = value[index];

        if (char === close && openBrackets === 0) {
          index++;
          return body;
        } else if (char === close) {
          openBrackets--;
        } else if (char === open) {
          openBrackets++;
        }

        body += char;
      }

      return '';
    }
    const tooltipAnchor = readArg('[', ']');
    const tooltipText = readArg('(', ')');

    const now = eat.now();

    if (!tooltipAnchor) {
      this.file.info('No tooltip anchor found', {
        line: now.line,
        column: now.column + 10,
      });
    }
    if (!tooltipText) {
      this.file.info('No tooltip text found', {
        line: now.line,
        column: now.column + 12 + tooltipAnchor.length,
      });
    }

    if (!tooltipText || !tooltipAnchor) return false;

    if (silent) {
      return true;
    }

    now.column += 10;
    now.offset += 10;
    const children = this.tokenizeInline(tooltipAnchor, now);

    return eat(`!{tooltip[${tooltipAnchor}](${tooltipText})}`)({
      type: 'tooltipPlugin',
      content: tooltipText,
      children,
    });
  }
  tokenizeTooltip.notInLink = true;

  tokenizeTooltip.locator = function locateTooltip(value, fromIndex) {
    return value.indexOf('!{tooltip', fromIndex);
  };

  tokenizers.tooltip = tokenizeTooltip;
  methods.splice(methods.indexOf('text'), 0, 'tooltip');
}

const tooltipMarkdownHandler = (h, node) => {
  return h(node.position, 'tooltipPlugin', node, all(h, node));
};
const tooltipMarkdownRenderer = ({ content, children }) => {
  return (
    <EuiToolTip content={content}>
      <span>{children}</span>
    </EuiToolTip>
  );
};

export {
  tooltipPlugin as plugin,
  TooltipParser as parser,
  tooltipMarkdownHandler as handler,
  tooltipMarkdownRenderer as renderer,
};
