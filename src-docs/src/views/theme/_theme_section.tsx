import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode, EuiCodeBlock } from '../../../../src/components/code';
import { EuiCopy } from '../../../../src/components/copy';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiText } from '../../../../src/components/text';
import { EuiSplitPanel, EuiPanel } from '../../../../src/components/panel';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';
import { EuiSpacer } from '../../../../src/components/spacer';

export const LANGUAGES = ['javascript', 'html'] as const;

type ThemeSection = {
  code?: string;
  description?: ReactNode;
  themeValues?: ReactNode;
  property?: string;
  example?: GuideSectionExample['example'];
  snippet?: GuideSectionExample['tabContent'];
};

export const ThemeSection: FunctionComponent<ThemeSection> = ({
  code,
  description,
  themeValues,
  property,
  example,
  snippet,
}) => {
  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText size="s">
          {code && (
            <h3>
              <EuiCopy textToCopy={code}>
                {(copy) => (
                  <button onClick={copy}>
                    <EuiCode language="ts" className="eui-textInheritColor">
                      {code}
                    </EuiCode>
                  </button>
                )}
              </EuiCopy>
            </h3>
          )}
          {description}
        </EuiText>
        {themeValues && (
          <>
            <EuiSpacer />
            <EuiPanel grow={false} paddingSize="m" color="subdued">
              {property ? (
                <>
                  <EuiCode transparentBackground>{`${property}: {`}</EuiCode>
                  <EuiSpacer size="s" />
                  <EuiFlexGroup
                    style={{ paddingLeft: 16 }}
                    direction="column"
                    gutterSize="s">
                    {themeValues}
                  </EuiFlexGroup>
                  <EuiSpacer size="s" />
                  <EuiCode transparentBackground>{'}'}</EuiCode>
                </>
              ) : (
                <EuiFlexGroup direction="column" gutterSize="s">
                  {themeValues}
                </EuiFlexGroup>
              )}
            </EuiPanel>
          </>
        )}
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiSplitPanel.Outer style={{ overflow: 'hidden' }}>
          <EuiSplitPanel.Inner>{example}</EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner color="subdued">
            {snippet && (
              <EuiCodeBlock
                isCopyable={true}
                paddingSize="none"
                transparentBackground={true}
                language="jsx">
                {`css\`
  ${snippet}
\``}
              </EuiCodeBlock>
            )}
          </EuiSplitPanel.Inner>
        </EuiSplitPanel.Outer>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
