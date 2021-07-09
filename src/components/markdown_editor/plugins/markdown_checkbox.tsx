/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useContext } from 'react';
import { EuiCheckbox } from '../../form/checkbox';
import { EuiMarkdownContext } from '../markdown_context';
import { htmlIdGenerator } from '../../../services/accessibility';
import { EuiMarkdownAstNodePosition, RemarkTokenizer } from '../markdown_types';
import { Plugin } from 'unified';

interface CheckboxNodeDetails {
  type: 'checkboxPlugin';
  lead: string;
  label: string;
  isChecked: boolean;
}

const CheckboxParser: Plugin = function CheckboxParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  const tokenizeCheckbox: RemarkTokenizer = function tokenizeCheckbox(
    eat,
    value,
    silent
  ) {
    /**
     * optional leading whitespace & single (dash or asterisk) mix
     * square brackets, optionally containing whitespace and `x`
     * optional whitespace
     * remainder of the line is consumed as the textbox label
     */
    const checkboxMatch = value.match(/^(\s*[-*]\s*)?\[([\sx]*)\](.+)/);
    if (checkboxMatch == null) return false;

    if (silent) {
      return true;
    }

    const [match, lead = '', checkboxStatus, text] = checkboxMatch;
    const isChecked = checkboxStatus.indexOf('x') !== -1;

    const now = eat.now();
    const offset = match.length - text.length;
    now.column += offset;
    now.offset += offset;
    const children = this.tokenizeInline(text, now);

    return eat(match)({
      type: 'checkboxPlugin',
      lead,
      label: text,
      isChecked,
      children,
    } as CheckboxNodeDetails);
  };

  tokenizers.checkbox = tokenizeCheckbox;
  methods.splice(methods.indexOf('list'), 0, 'checkbox'); // Run it just before default `list` plugin to inject our own idea of checkboxes.
};

const CheckboxMarkdownRenderer: FunctionComponent<
  CheckboxNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ position, lead, label, isChecked, children }) => {
  const { replaceNode } = useContext(EuiMarkdownContext);
  return (
    <EuiCheckbox
      id={htmlIdGenerator()()}
      checked={isChecked}
      label={children}
      onChange={() => {
        replaceNode(position, `${lead}[${isChecked ? ' ' : 'x'}]${label}`);
      }}
    />
  );
};

export { CheckboxParser as parser, CheckboxMarkdownRenderer as renderer };
