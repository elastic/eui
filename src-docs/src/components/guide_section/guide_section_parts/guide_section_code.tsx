import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { EuiCodeBlock } from '../../../../../src/components/code';
import { EuiButtonEmpty } from '../../../../../src/components/button';
// @ts-ignore Not TS
import { CodeSandboxLink } from '../../codesandbox';
// @ts-ignore Not TS
import { renderJsSourceCode } from '../_utils';
import { GuideSectionTypes } from '../guide_section_types';

export type GuideSectionExampleCode = {
  code: any;
  type?: string;
};

export const GuideSectionExampleCode: FunctionComponent<
  GuideSectionExampleCode
> = ({ code, type = GuideSectionTypes.JS }) => {
  const isJavascript = useMemo(
    () => [GuideSectionTypes.JS, GuideSectionTypes.TSX].includes(type),
    [type]
  );
  const sourceCode = useMemo(
    () => (isJavascript ? renderJsSourceCode(code) : code),
    [isJavascript, code]
  );

  const [codeToRender, setCodeToRender] = useState();

  useEffect(() => {
    setCodeToRender(sourceCode);

    return () => {
      setCodeToRender(undefined);
    };
  }, [sourceCode]);

  const codeSandboxLink = isJavascript ? (
    <CodeSandboxLink
      className="guideSectionExampleCode__link"
      content={sourceCode}
      type={type.toLowerCase()}
    >
      <EuiButtonEmpty size="xs" iconType="logoCodesandbox">
        Try out this demo on Code Sandbox
      </EuiButtonEmpty>
    </CodeSandboxLink>
  ) : undefined;

  return (
    <>
      <EuiCodeBlock
        language={
          type === GuideSectionTypes.JS || type === GuideSectionTypes.STRING_JS
            ? 'jsx'
            : type.toLowerCase()
        }
        overflowHeight={400}
        isCopyable
      >
        {codeToRender}
      </EuiCodeBlock>
      {codeSandboxLink}
    </>
  );
};
