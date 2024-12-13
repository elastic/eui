import React, { FunctionComponent } from 'react';
import {
  EuiCodeBlock,
  EuiHorizontalRule,
  EuiSpacer,
  useEuiTheme,
} from '../../../../../src';

export type GuideSectionSnippets = {
  snippets: string | string[];
};

export const GuideSectionSnippets: FunctionComponent<GuideSectionSnippets> = ({
  snippets,
}) => {
  const { highContrastMode } = useEuiTheme();
  const codeBlockProps = {
    language: 'jsx',
    fontSize: 'm',
    paddingSize: 'm',
    isCopyable: true,
    // Code block is used within a panel which already has a border - skip doubling up
    ...(highContrastMode && { css: { border: 'none' } }),
  } as const;

  let snippetCode;
  if (typeof snippets === 'string') {
    snippetCode = <EuiCodeBlock {...codeBlockProps}>{snippets}</EuiCodeBlock>;
  } else {
    snippetCode = snippets.map((snip, index) => (
      <React.Fragment key={`snippet${index}`}>
        <EuiCodeBlock {...codeBlockProps}>{snip}</EuiCodeBlock>
        {index < snippets.length - 1 &&
          (highContrastMode ? (
            <EuiHorizontalRule margin="xs" />
          ) : (
            <EuiSpacer size="xs" />
          ))}
      </React.Fragment>
    ));
  }

  return <React.Fragment>{snippetCode}</React.Fragment>;
};
