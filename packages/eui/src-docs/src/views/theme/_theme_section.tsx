import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode, EuiCodeBlock } from '../../../../src/components/code';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiText } from '../../../../src/components/text';
import { EuiSplitPanel, EuiPanel } from '../../../../src/components/panel';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';

export const LANGUAGES = ['javascript', 'html'] as const;

type ThemeSection = {
  code?: string;
  description?: ReactNode;
  themeValues?: ReactNode;
  property?: string;
  example?: GuideSectionExample['example'];
  snippet?: GuideSectionExample['tabContent'];
  customSnippet?: string;
};

export const ThemeSection: FunctionComponent<ThemeSection> = ({
  code,
  description,
  themeValues,
  example,
  snippet,
  customSnippet,
}) => {
  const finalSnippet = customSnippet
    ? customSnippet
    : `css\`
  ${snippet}
\``;

  return (
    <EuiFlexGroup>
      <EuiFlexItem style={{ flexShrink: 0 }}>
        <EuiText size="s">
          {code && (
            <h3>
              <EuiCode language="ts" className="eui-textInheritColor">
                {code}
              </EuiCode>
            </h3>
          )}
          {description}
        </EuiText>
      </EuiFlexItem>
      {themeValues && (
        <EuiFlexItem className="eui-xScroll" grow={2}>
          <EuiPanel
            className="eui-xScroll"
            grow={false}
            paddingSize="m"
            color="subdued"
          >
            <EuiFlexGroup direction="column" gutterSize="m">
              {themeValues}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      )}
      {example && (
        <EuiFlexItem grow={2}>
          <EuiSplitPanel.Outer style={{ overflow: 'hidden' }}>
            <EuiSplitPanel.Inner>{example}</EuiSplitPanel.Inner>
            <EuiSplitPanel.Inner color="subdued">
              {finalSnippet && (
                <EuiCodeBlock
                  isCopyable={true}
                  paddingSize="none"
                  transparentBackground={true}
                  language="jsx"
                >
                  {finalSnippet}
                </EuiCodeBlock>
              )}
            </EuiSplitPanel.Inner>
          </EuiSplitPanel.Outer>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
};
