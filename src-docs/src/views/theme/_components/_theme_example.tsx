import { css } from '@emotion/react';
import React, { FunctionComponent, ReactNode } from 'react';
import {
  EuiCodeBlock,
  EuiCodeBlockProps,
  EuiText,
  EuiSplitPanel,
  EuiSpacer,
  EuiTitle,
  useEuiTheme,
} from '../../../../../src';
import {
  _EuiSplitPanelInnerProps,
  _EuiSplitPanelOuterProps,
} from '../../../../../src/components/panel/split_panel';

import { GuideSectionExample } from '../../../components/guide_section/guide_section_parts/guide_section_example';

export type ThemeExample = {
  color?: _EuiSplitPanelOuterProps['color'];
  title?: ReactNode;
  description?: ReactNode;
  property?: string;
  example?: GuideSectionExample['example'];
  examplePanel?: _EuiSplitPanelInnerProps;
  snippet?: GuideSectionExample['tabContent'];
  snippetLanguage?: EuiCodeBlockProps['language'];
  provider?: {
    property?: string;
    type?: string;
  };
};

export const ThemeExample: FunctionComponent<ThemeExample> = ({
  color = 'subdued',
  title,
  description,
  example,
  examplePanel,
  snippet,
  snippetLanguage = 'jsx',
}) => {
  const { euiTheme } = useEuiTheme();
  const finalSnippet =
    snippetLanguage === 'jsx'
      ? `css\`
  ${snippet}
\``
      : snippet;

  return (
    <>
      <EuiSplitPanel.Outer
        color={color}
        direction="row"
        css={css`
          margin-bottom: ${euiTheme.size.xl};
        `}
      >
        <EuiSplitPanel.Inner style={{ flexShrink: 0 }}>
          {title && (
            <>
              <EuiTitle size="xs">
                <h3>{title}</h3>
              </EuiTitle>

              <EuiSpacer />
            </>
          )}

          <EuiText size="s" grow={false}>
            {description}
          </EuiText>
        </EuiSplitPanel.Inner>

        {(example || snippet) && (
          <EuiSplitPanel.Inner>
            <EuiSplitPanel.Outer
              hasBorder={true}
              hasShadow={false}
              style={{ overflow: 'hidden' }}
            >
              {example && (
                <EuiSplitPanel.Inner {...examplePanel}>
                  {example}
                </EuiSplitPanel.Inner>
              )}
              <EuiSplitPanel.Inner color="subdued">
                {finalSnippet && (
                  <EuiCodeBlock
                    isCopyable={true}
                    paddingSize="none"
                    transparentBackground={true}
                    language={snippetLanguage || 'jsx'}
                  >
                    {finalSnippet}
                  </EuiCodeBlock>
                )}
              </EuiSplitPanel.Inner>
            </EuiSplitPanel.Outer>
          </EuiSplitPanel.Inner>
        )}
      </EuiSplitPanel.Outer>
    </>
  );
};
