/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiMarkdownAstNodePosition, RemarkTokenizer } from '../markdown_types';
import { EuiToolTip } from '../../tool_tip';
import { EuiIcon } from '../../icon';
import { EuiCodeBlock } from '../../code';
import { Plugin } from 'unified';

interface TooltipNodeDetails {
  type: 'tooltipPlugin';
  content: string;
}

const tooltipPlugin = {
  name: 'tooltipPlugin',
  button: {
    label: 'Tooltip',
    iconType: 'editorComment',
  },
  formatting: {
    prefix: '!{tooltip[',
    suffix: ']()}',
    trimFirst: true,
  },
  helpText: (
    <EuiCodeBlock language="md" paddingSize="s" fontSize="l">
      {'!{tooltip[anchor text](helpful description)}'}
    </EuiCodeBlock>
  ),
};

const TooltipParser: Plugin = function TooltipParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  const tokenizeTooltip: RemarkTokenizer = function tokenizeTooltip(
    eat,
    value,
    silent
  ) {
    if (value.startsWith('!{tooltip') === false) return false;

    const nextChar = value[9];

    if (nextChar !== '[') return false; // this isn't actually a tooltip

    let index = 9;
    function readArg(open: string, close: string) {
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
    } as TooltipNodeDetails);
  };
  tokenizeTooltip.notInLink = true;

  tokenizeTooltip.locator = (value, fromIndex) => {
    return value.indexOf('!{tooltip', fromIndex);
  };

  tokenizers.tooltip = tokenizeTooltip;
  methods.splice(methods.indexOf('text'), 0, 'tooltip');
};

const tooltipMarkdownRenderer: FunctionComponent<
  TooltipNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ content, children }) => {
  return (
    <span>
      <EuiToolTip content={content}>
        <span>
          <strong>{children}</strong>
          <EuiIcon
            type="questionInCircle"
            className="euiMarkdownTooltip__icon"
          />
        </span>
      </EuiToolTip>
    </span>
  );
};

export {
  tooltipPlugin as plugin,
  TooltipParser as parser,
  tooltipMarkdownRenderer as renderer,
};
