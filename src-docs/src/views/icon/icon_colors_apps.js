import React from 'react';

import {
  EuiIcon,
  EuiSpacer,
  EuiCodeBlock,
  EuiSplitPanel,
} from '../../../../src/components';

export default () => (
  <>
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <EuiIcon type="gisApp" size="xl" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<EuiIcon type="gisApp" size="xl" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <EuiIcon type="gisApp" color="text" size="xl" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<EuiIcon type="gisApp" color="text" size="xl" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <EuiIcon type="gisApp" color="primary" size="xl" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<EuiIcon type="gisApp" color="primary" size="xl" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <EuiIcon type="gisApp" color="#DA8B45" size="xl" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<EuiIcon type="gisApp" color="#DA8B45" size="xl" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  </>
);
