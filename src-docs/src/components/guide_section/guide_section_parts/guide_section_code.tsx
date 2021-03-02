import React, { FunctionComponent, useState, useEffect } from 'react';
import { EuiCodeBlock } from '../../../../../src/components/code';
import { EuiButtonEmpty } from '../../../../../src/components/button';
// @ts-ignore Not TS
import { CodeSandboxLink } from '../../codesandbox';
// @ts-ignore Not TS
import { renderJsSourceCode } from '../_utils';

export const LANGUAGES = ['javascript', 'html'] as const;

export type GuideSectionExampleCode = {
  code: any;
  language?: typeof LANGUAGES[number];
};

export const GuideSectionExampleCode: FunctionComponent<GuideSectionExampleCode> = ({
  language = 'javascript',
  code,
}) => {
  const [codeToRender, setCodeToRender] = useState();

  useEffect(() => {
    setCodeToRender(
      language === 'html' ? code.render() : renderJsSourceCode(code)
    );
    return () => {
      setCodeToRender(undefined);
    };
  }, [language, code]);

  const codeSandboxLink =
    language === 'javascript' ? (
      <CodeSandboxLink
        className="guideSectionExampleCode__link"
        content={code.default}>
        <EuiButtonEmpty size="xs" iconType="logoCodesandbox">
          Try out this demo on Code Sandbox
        </EuiButtonEmpty>
      </CodeSandboxLink>
    ) : undefined;

  return (
    <>
      <EuiCodeBlock language={language} overflowHeight={400} isCopyable>
        {codeToRender}
      </EuiCodeBlock>
      {codeSandboxLink}
    </>
  );
};
