import React, { FunctionComponent } from 'react';
import { EuiCodeBlock } from '../../../../../src/components/code';
import { EuiButtonEmpty } from '../../../../../src/components/button';
// @ts-ignore Not TS
import { CodeSandboxLink } from '../../codesandbox';
// @ts-ignore Not TS
import { renderJsSourceCode } from '../_utils';

export const LANGUAGES = ['javascript', 'html'] as const;

type GuideSectionExampleCode = {
  language: typeof LANGUAGES[number];
  code: any;
  codeSandbox?: any;
};

export const GuideSectionExampleCode: FunctionComponent<GuideSectionExampleCode> = ({
  language = 'javascript',
  code,
  codeSandbox,
}) => {
  const codeSandboxLink = codeSandbox && language === 'javascript' && (
    <CodeSandboxLink
      className="guideSectionExampleCode__link"
      content={codeSandbox}>
      <EuiButtonEmpty size="xs" iconType="logoCodesandbox">
        Try out this demo on Code Sandbox
      </EuiButtonEmpty>
    </CodeSandboxLink>
  );

  const renderedCode =
    language === 'javascript' ? renderJsSourceCode(code) : code.render();

  return (
    <>
      <EuiCodeBlock language={language} overflowHeight={400} isCopyable>
        {renderedCode}
      </EuiCodeBlock>
      {codeSandboxLink}
    </>
  );
};
