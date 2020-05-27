import React, { useContext } from 'react';
import all from 'mdast-util-to-hast/lib/all';
import { EuiCheckbox, EuiMarkdownContext } from '../../../../../src';
import { htmlIdGenerator } from '../../../../../src/services/accessibility';

function CheckboxParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  function tokenizeCheckbox(eat, value, silent) {
    /**
     * optional leading whitespace & single dash mix
     * square brackets, optionally containing whitespace and `x`
     * optional whitespace
     * remainder of the line is consumed as the textbox label
     */
    const checkboxMatch = value.match(/^(\s*-\s*)?\[([\sx]*)\](.+)/);
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
    });
  }

  tokenizers.checkbox = tokenizeCheckbox;
  methods.splice(methods.indexOf('text'), 0, 'checkbox'); // Run it just before `text`.
}

const checkboxMarkdownHandler = (h, node) => {
  return h(node.position, 'checkboxPlugin', node, all(h, node));
};
const CheckboxMarkdownRenderer = ({
  position,
  lead,
  label,
  isChecked,
  children,
}) => {
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

export {
  CheckboxParser as parser,
  checkboxMarkdownHandler as handler,
  CheckboxMarkdownRenderer as renderer,
};
