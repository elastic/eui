import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode, EuiCodeBlock } from '../../../../src/components/code';
import { EuiCopy } from '../../../../src/components/copy';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiText } from '../../../../src/components/text';
import { EuiSplitPanel, EuiPanel } from '../../../../src/components/panel';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';

export const LANGUAGES = ['javascript', 'html'] as const;

type UtilityClassesSection = {
  code: string;
  description?: ReactNode;
  example?: GuideSectionExample['exampleCode'];
  snippet?: GuideSectionExample['tabContent'];
};

export const UtilityClassesSection: FunctionComponent<UtilityClassesSection> = ({
  code,
  description,
  example,
  snippet,
}) => {
  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText size="s">
          <h3>
            <EuiCopy textToCopy={code}>
              {(copy) => (
                <button onClick={copy}>
                  <EuiCode language="html" className="eui-textInheritColor">
                    {code}
                  </EuiCode>
                </button>
              )}
            </EuiCopy>
          </h3>
          {description}
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiSplitPanel>
          {(panelProps) => (
            <>
              <EuiPanel {...panelProps}>{example}</EuiPanel>
              <EuiPanel {...panelProps} color="subdued">
                {snippet && (
                  <EuiCodeBlock
                    isCopyable={true}
                    paddingSize="none"
                    transparentBackground={true}
                    language="html">
                    {snippet}
                  </EuiCodeBlock>
                )}
              </EuiPanel>
            </>
          )}
        </EuiSplitPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
