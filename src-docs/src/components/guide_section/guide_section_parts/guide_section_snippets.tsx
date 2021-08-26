import React, { FunctionComponent } from 'react';
import { EuiCodeBlock } from '../../../../../src/components/code';
import { EuiSpacer } from '../../../../../src/components/spacer';

export type GuideSectionSnippets = {
  snippets: string | string[];
};

export const GuideSectionSnippets: FunctionComponent<GuideSectionSnippets> = ({
  snippets,
}) => {
  let snippetCode;
  if (typeof snippets === 'string') {
    snippetCode = (
      <EuiCodeBlock language="jsx" fontSize="m" paddingSize="m" isCopyable>
        {snippets}
      </EuiCodeBlock>
    );
  } else {
    snippetCode = snippets.map((snip, index) => (
      <React.Fragment key={`snippet${index}`}>
        <EuiCodeBlock language="jsx" fontSize="m" paddingSize="m" isCopyable>
          {snip}
        </EuiCodeBlock>
        {index < snippets.length - 1 && <EuiSpacer size="xs" />}
      </React.Fragment>
    ));
  }

  return <React.Fragment>{snippetCode}</React.Fragment>;
};
