import React, { FunctionComponent, useState, useEffect } from 'react';
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

export const GuideSectionExampleCode: FunctionComponent<GuideSectionExampleCode> = ({
  code,
  type = GuideSectionTypes.JS,
}) => {
  const [codeToRender, setCodeToRender] = useState();

  useEffect(() => {
    if (type === GuideSectionTypes.JS) {
      setCodeToRender(renderJsSourceCode(code));
    } else {
      setCodeToRender(code);
    }

    return () => {
      setCodeToRender(undefined);
    };
  }, [code, type]);

  const codeSandboxLink =
    type === GuideSectionTypes.JS ? (
      <CodeSandboxLink
        className="guideSectionExampleCode__link"
        content={code.default}
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
        language={type === GuideSectionTypes.JS ? 'jsx' : type.toLowerCase()}
        overflowHeight={400}
        isCopyable
      >
        {codeToRender}
      </EuiCodeBlock>
      {codeSandboxLink}
    </>
  );
};
