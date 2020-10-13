import React, { useCallback, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import {
  EuiMarkdownEditor,
  EuiSpacer,
  EuiCodeBlock,
  EuiButtonToggle,
  EuiFormErrorText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const initialContent = `## Errors

The tooltip is empty and will error

!{tooltip[]()}
`;

export default () => {
  const errorElementId = useRef(htmlIdGenerator()());
  const [value, setValue] = useState(initialContent);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <EuiMarkdownEditor
        aria-label="EUI markdown editor demo"
        aria-describedby={errorElementId.current}
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
      />
      <EuiSpacer size="s" />

      <EuiFormErrorText
        id={errorElementId.current}
        className="euiFormRow__text">
        Utilize error text or{' '}
        <strong>
          <Link to="/forms/form-validation">EuiFormRow</Link>
        </strong>{' '}
        for more permanent error feedback
      </EuiFormErrorText>

      <div className="eui-textRight">
        <EuiButtonToggle
          size="s"
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onClick={() => setIsAstShowing(!isAstShowing)}
          isSelected={isAstShowing}>
          {isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
        </EuiButtonToggle>
      </div>

      {isAstShowing && <EuiCodeBlock language="json">{ast}</EuiCodeBlock>}
    </>
  );
};
