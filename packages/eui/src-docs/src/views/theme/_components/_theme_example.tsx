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
  EuiBadge,
  logicalCSS,
  useIsWithinBreakpoints,
  useEuiPaddingCSS,
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
  type?: string | null;
  property?: string;
  example?: GuideSectionExample['example'];
  examplePanel?: _EuiSplitPanelInnerProps;
  snippet?: GuideSectionExample['tabContent'];
  snippetLanguage?: EuiCodeBlockProps['language'];
  props?: ReactNode;
  provider?: {
    property?: string;
    type?: string;
  };
};

export const ThemeExample: FunctionComponent<ThemeExample> = ({
  color,
  type = 'token',
  title,
  description,
  example,
  examplePanel,
  snippet,
  snippetLanguage = 'jsx',
  props,
}) => {
  const { euiTheme, highContrastMode } = useEuiTheme();
  const isLargeBreakpoint = useIsWithinBreakpoints(['m', 'l', 'xl']);

  const finalSnippet =
    snippetLanguage === 'emotion'
      ? `css\`
  ${snippet}
\``
      : snippet;

  return (
    <>
      <EuiSplitPanel.Outer
        color={isLargeBreakpoint ? color || 'transparent' : 'subdued'}
        direction="row"
        css={css`
          gap: ${euiTheme.size.xl};

          ${useEuiPaddingCSS(isLargeBreakpoint ? 'vertical' : undefined).xl};
          /* padding: ${euiTheme.size.xl}; */

          :not(:first-child) {
            margin-block-start: ${euiTheme.size.xl};
          }
        `}
      >
        <EuiSplitPanel.Inner
          paddingSize="none"
          style={{
            flexShrink: 0,
          }}
        >
          {title && (
            <>
              <EuiTitle size="xxs">
                <h3>
                  {title}{' '}
                  {type && (
                    <EuiBadge
                      css={css`
                        ${logicalCSS('margin-left', euiTheme.size.xs)}
                      `}
                      color={type.includes(' ') ? 'accent' : 'hollow'}
                    >
                      {type}
                    </EuiBadge>
                  )}
                </h3>
              </EuiTitle>

              <EuiSpacer />
            </>
          )}

          <EuiText size="s" grow={false}>
            {description}
          </EuiText>
          {props && (
            <>
              <EuiSpacer />
              <EuiCodeBlock
                transparentBackground
                paddingSize="none"
                language="ts"
              >
                {props}
              </EuiCodeBlock>
            </>
          )}
        </EuiSplitPanel.Inner>

        {(example || snippet) && (
          <EuiSplitPanel.Inner
            paddingSize="none"
            style={{
              overflow: 'hidden',
            }}
          >
            <EuiSplitPanel.Outer
              direction="column"
              hasBorder={true}
              hasShadow={false}
            >
              {example && (
                <EuiSplitPanel.Inner {...examplePanel}>
                  {example}
                </EuiSplitPanel.Inner>
              )}
              <EuiSplitPanel.Inner paddingSize="none" color="subdued">
                {finalSnippet && (
                  <EuiCodeBlock
                    whiteSpace="pre"
                    isCopyable={true}
                    paddingSize="m"
                    transparentBackground={true}
                    language={
                      snippetLanguage === 'emotion' ? 'jsx' : snippetLanguage
                    }
                    // Code block is used within a panel which already has a border - skip doubling up
                    {...(highContrastMode && { css: { border: 'none' } })}
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
