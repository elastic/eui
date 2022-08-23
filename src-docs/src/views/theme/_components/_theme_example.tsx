import { css } from '@emotion/react';
import React, { FunctionComponent, ReactNode, useState } from 'react';
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
  EuiButtonGroup,
} from '../../../../../src';
import {
  _EuiSplitPanelInnerProps,
  _EuiSplitPanelOuterProps,
} from '../../../../../src/components/panel/split_panel';

import { GuideSectionExample } from '../../../components/guide_section/guide_section_parts/guide_section_example';

export type ThemeExample = {
  color?: _EuiSplitPanelOuterProps['color'];
  title?: ReactNode;
  toggleTitle?: ReactNode;
  description?: ReactNode;
  type?: string | null;
  toggleType?: string | null;
  property?: string;
  example?: GuideSectionExample['example'];
  toggleExample?: GuideSectionExample['example'];
  examplePanel?: _EuiSplitPanelInnerProps;
  snippet?: GuideSectionExample['tabContent'];
  toggleSnippet?: GuideSectionExample['tabContent'];
  snippetLanguage?: EuiCodeBlockProps['language'];
  props?: ReactNode;
  toggleProps?: ReactNode;
  provider?: {
    property?: string;
    type?: string;
  };
};

export const ThemeExample: FunctionComponent<ThemeExample> = ({
  color,
  type = 'token',
  toggleType,
  title,
  toggleTitle,
  description,
  example,
  examplePanel,
  snippet,
  toggleSnippet,
  snippetLanguage = 'jsx',
  props,
  toggleProps,
}) => {
  const { euiTheme } = useEuiTheme();
  const isLargeBreakpoint = useIsWithinBreakpoints(['m', 'l', 'xl']);

  const [toggleIdSelected, setToggleIdSelected] = useState(type);

  const onChange = (optionId: string) => {
    setToggleIdSelected(optionId);
  };

  const isToggleOptionSelected = toggleIdSelected === toggleType;

  const currentSnippet = isToggleOptionSelected ? toggleSnippet : snippet;

  const finalSnippet =
    snippetLanguage === 'emotion'
      ? `css\`
  ${currentSnippet}
\``
      : currentSnippet;

  const finalProps = isToggleOptionSelected ? toggleProps : props;
  const finalTitle = isToggleOptionSelected ? toggleTitle : title;

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
          {finalTitle && (
            <>
              <EuiTitle size="xxs">
                <h3>
                  {finalTitle}{' '}
                  {type && !toggleType && (
                    <EuiBadge
                      css={css`
                        ${logicalCSS('margin-left', euiTheme.size.xs)}
                      `}
                      color={type.includes(' ') ? 'accent' : 'hollow'}
                    >
                      {type}
                    </EuiBadge>
                  )}
                  {type && toggleType && (
                    <EuiButtonGroup
                      legend="This is a basic group"
                      options={[
                        {
                          id: type,
                          label: type,
                        },
                        {
                          id: toggleType,
                          label: toggleType,
                        },
                      ]}
                      idSelected={toggleIdSelected as string}
                      onChange={(id) => onChange(id)}
                      buttonSize="compressed"
                    />
                  )}
                </h3>
              </EuiTitle>

              <EuiSpacer />
            </>
          )}

          <EuiText size="s" grow={false}>
            {description}
          </EuiText>
          {finalProps && (
            <>
              <EuiSpacer />
              <EuiCodeBlock
                transparentBackground
                paddingSize="none"
                language="ts"
              >
                {finalProps}
              </EuiCodeBlock>
            </>
          )}
        </EuiSplitPanel.Inner>

        {(example || finalSnippet) && (
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
