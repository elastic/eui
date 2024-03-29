import React from 'react';

import {
  EuiToken,
  EuiCodeBlock,
  EuiSplitPanel,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <>
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}
      >
        <EuiToken iconType="tokenStruct" size="xs" color="gray" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
          {'<EuiToken iconType="tokenStruct" size="xs" color="gray" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}
      >
        <EuiToken iconType="tokenStruct" fill="none" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
          {'<EuiToken iconType="tokenStruct" fill="none" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}
      >
        <EuiToken
          iconType="tokenStruct"
          size="m"
          shape="circle"
          color="#b9f6c8"
        />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
          {
            '<EuiToken iconType="tokenStruct" size="m" shape="circle" color="#b9f6c8" />'
          }
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}
      >
        <EuiToken iconType="faceHappy" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
          {'<EuiToken iconType="faceHappy"  />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}
      >
        <EuiToken
          iconType="faceHappy"
          size="l"
          color="euiColorVis7"
          shape="rectangle"
          fill="dark"
        />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
          {
            '<EuiToken iconType="faceHappy" size="l" color="euiColorVis7" shape="rectangle" fill="dark" />'
          }
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  </>
);
