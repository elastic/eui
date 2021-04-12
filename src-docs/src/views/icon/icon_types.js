import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiText,
  EuiSpacer,
  EuiButton,
  EuiSplitPanel,
  EuiCodeBlock,
} from '../../../../src/components';

import reactSvg from '../../images/custom.svg';

export default () => (
  <div>
    <EuiSplitPanel.Outer hasShadow={false} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <EuiIcon
          type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
          size="xl"
          title="My SVG logo"
        />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          className="eui-textBreakWord"
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {
            '<EuiIcon type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" size="xl" title="My SVG logo" />'
          }
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <EuiIcon type={reactSvg} size="xl" title="Custom SVG icon" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<EuiIcon type={reactSvg} size="xl" title="Custom SVG icon" />'}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>

    <EuiSpacer />

    <EuiText>
      <p>
        Any component that utlizes <strong>EuiIcon</strong> can use custom SVGs
        as well.
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton
          iconType="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
          title="Another SVG Logo">
          http://some.svg
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton iconType={reactSvg}>{'{reactSvg}'}</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
