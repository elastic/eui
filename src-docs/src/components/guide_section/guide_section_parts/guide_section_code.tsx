import React, { FunctionComponent } from 'react';
import { EuiCodeBlock } from '../../../../../src/components/code';
import { EuiButtonEmpty } from '../../../../../src/components/button';
// @ts-ignore Not TS
import { CodeSandboxLink } from '../../codesandbox';

export const LANGUAGES = ['javascript', 'html'] as const;

type GuideSectionExampleCode = {
  language: typeof LANGUAGES[number];
  code: string;
  codeSandbox?: any;
};

export const GuideSectionExampleCode: FunctionComponent<GuideSectionExampleCode> = ({
  language = 'javascript',
  code,
  codeSandbox,
}) => {
  const codeSandboxLink = codeSandbox && language === 'javascript' && (
    <CodeSandboxLink content={codeSandbox}>
      <EuiButtonEmpty size="xs" iconType="logoCodesandbox">
        Try out this demo on Code Sandbox
      </EuiButtonEmpty>
    </CodeSandboxLink>
  );

  return (
    <>
      <EuiCodeBlock language={language} overflowHeight={400} isCopyable>
        {code}
      </EuiCodeBlock>
      {codeSandboxLink}
    </>
  );
};
