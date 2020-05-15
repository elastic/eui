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
    const checkboxMatch = value.match(/^(\s*-\s*)?\[([\sx]*)\]\s*([^\r\n]+)/);
    if (checkboxMatch == null) return false;

    if (silent) {
      return true;
    }

    const [match, lead, checkboxStatus, text] = checkboxMatch;
    const isChecked = checkboxStatus.indexOf('x') !== -1;

    const position = eat.now();

    const now = eat.now();
    const offset = match.length - text.length;
    now.column += offset;
    now.offset += offset;
    const children = this.tokenizeInline(text, now);

    return eat(match)({
      type: 'checkboxPlugin',
      configuration: { isChecked, position },
      children,
    });
  }

  tokenizers.checkbox = tokenizeCheckbox;
  methods.splice(methods.indexOf('text'), 0, 'checkbox'); // Run it just before `text`.
}

const checkboxMarkdownHandler = (h, node) => {
  return h(node.position, 'checkboxPlugin', node.configuration, all(h, node));
};
const CheckboxMarkdownRenderer = ({ position, isChecked, children }) => {
  const { markdown, setMarkdown } = useContext(EuiMarkdownContext);
  return (
    <EuiCheckbox
      id={htmlIdGenerator()()}
      checked={isChecked}
      label={children}
      onChange={() => {
        const leadingMarkdown = markdown.substr(0, position.offset);

        let isCurrentlyChecked = false;
        let index = position.offset + 1;
        for (; index < markdown.length; index++) {
          const char = markdown[index];
          if (char === ']') break;
          if (char === 'x') isCurrentlyChecked = true;
        }
        index++; // still need to skip over the closing bracket

        const checkMarkdown = `[${isCurrentlyChecked ? ' ' : 'x'}]`;
        const trailingMarkdown = markdown.substr(index);
        const nextMarkdown = `${leadingMarkdown}${checkMarkdown}${trailingMarkdown}`;

        setMarkdown(nextMarkdown);
      }}
    />
  );
};

export {
  CheckboxParser as parser,
  checkboxMarkdownHandler as handler,
  CheckboxMarkdownRenderer as renderer,
};
