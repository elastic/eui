import React, { FunctionComponent, useState, useEffect } from 'react';
import { EuiCodeBlock } from '../../../../../src/components/code';
import { EuiButtonEmpty } from '../../../../../src/components/button';
// @ts-ignore Not TS
import { CodeSandboxLink } from '../../codesandbox';
// @ts-ignore Not TS
import { renderJsSourceCode } from '../_utils';

export type GuideSectionExampleCode = {
  code: any;
  type?: string;
};

export const GuideSectionExampleCode: FunctionComponent<GuideSectionExampleCode> = ({
  code,
  type,
}) => {
  const [codeToRender, setCodeToRender] = useState();

  useEffect(() => {
    setCodeToRender(renderJsSourceCode(code));
    return () => {
      setCodeToRender(undefined);
    };
  }, [code]);

  const codeSandboxLink = (
    <CodeSandboxLink
      className="guideSectionExampleCode__link"
      content={code.default}
      type={type}
    >
      <EuiButtonEmpty size="xs" iconType="logoCodesandbox">
        Try out this demo on Code Sandbox
      </EuiButtonEmpty>
    </CodeSandboxLink>
  );

  return (
    <>
      <EuiCodeBlock language="jsx" overflowHeight={400} isCopyable>
        {codeToRender}
      </EuiCodeBlock>
      {codeSandboxLink}
    </>
  );
};
