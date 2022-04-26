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
        style={{ minWidth: 96 }}
      >
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
          paddingSize="m"
        >
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
        style={{ minWidth: 96 }}
      >
        <EuiIcon
          type="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1Ni4zMSA1Ni4zMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7c3Ryb2tlOiMwMDc4YTA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlBsYW5lIEljb248L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDkuNTEsNDguOTMsNDEuMjYsMjIuNTIsNTMuNzYsMTBhNS4yOSw1LjI5LDAsMCwwLTcuNDgtNy40N2wtMTIuNSwxMi41TDcuMzgsNi43OUEuNy43LDAsMCwwLDYuNjksN0wxLjIsMTIuNDVhLjcuNywwLDAsMCwwLDFMMTkuODUsMjlsLTcuMjQsNy4yNC03Ljc0LS42YS43MS43MSwwLDAsMC0uNTMuMkwxLjIxLDM5YS42Ny42NywwLDAsMCwuMDgsMUw5LjQ1LDQ2bC4wNywwYy4xMS4xMy4yMi4yNi4zNC4zOHMuMjUuMjMuMzguMzRhLjM2LjM2LDAsMCwwLDAsLjA3TDE2LjMzLDU1YS42OC42OCwwLDAsMCwxLC4wN0wyMC40OSw1MmEuNjcuNjcsMCwwLDAsLjE5LS41NGwtLjU5LTcuNzQsNy4yNC03LjI0TDQyLjg1LDU1LjA2YS42OC42OCwwLDAsMCwxLDBsNS41LTUuNUEuNjYuNjYsMCwwLDAsNDkuNTEsNDguOTNaIi8+PC9nPjwvZz48L3N2Zz4="
          size="xl"
          title="My SVG icon"
        />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          className="eui-textBreakWord"
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
          {
            '<EuiIcon type="data:image/svg+xml;base64,PHN2...=" size="xl" title="My SVG icon" />'
          }
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
    <EuiSpacer />
    <EuiSplitPanel.Outer hasShadow={false} direction="row">
      <EuiSplitPanel.Inner
        className="eui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}
      >
        <EuiIcon type={reactSvg} size="xl" title="Custom SVG icon" />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="s" color="subdued">
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m"
        >
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
          title="Another SVG Logo"
        >
          http://some.svg
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton
          iconType="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1Ni4zMSA1Ni4zMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7c3Ryb2tlOiMwMDc4YTA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlBsYW5lIEljb248L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDkuNTEsNDguOTMsNDEuMjYsMjIuNTIsNTMuNzYsMTBhNS4yOSw1LjI5LDAsMCwwLTcuNDgtNy40N2wtMTIuNSwxMi41TDcuMzgsNi43OUEuNy43LDAsMCwwLDYuNjksN0wxLjIsMTIuNDVhLjcuNywwLDAsMCwwLDFMMTkuODUsMjlsLTcuMjQsNy4yNC03Ljc0LS42YS43MS43MSwwLDAsMC0uNTMuMkwxLjIxLDM5YS42Ny42NywwLDAsMCwuMDgsMUw5LjQ1LDQ2bC4wNywwYy4xMS4xMy4yMi4yNi4zNC4zOHMuMjUuMjMuMzguMzRhLjM2LjM2LDAsMCwwLDAsLjA3TDE2LjMzLDU1YS42OC42OCwwLDAsMCwxLC4wN0wyMC40OSw1MmEuNjcuNjcsMCwwLDAsLjE5LS41NGwtLjU5LTcuNzQsNy4yNC03LjI0TDQyLjg1LDU1LjA2YS42OC42OCwwLDAsMCwxLDBsNS41LTUuNUEuNjYuNjYsMCwwLDAsNDkuNTEsNDguOTNaIi8+PC9nPjwvZz48L3N2Zz4="
          title="Another SVG icon"
        >
          data:uri
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton iconType={reactSvg}>{'{reactSvg}'}</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
