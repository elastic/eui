import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiCode,
  EuiSpacer,
  EuiButton,
} from '../../../../src/components';

import reactSvg from '../../images/custom.svg';

export default () => (
  <div>
    <EuiFlexGrid columns={4}>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '200px' }}>
        <EuiPanel>
          <EuiIcon type="logoElastic" size="xl" />
          <EuiText size="s">
            <p>logoElastic</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '200px' }}>
        <EuiPanel>
          <EuiIcon
            type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
            size="xl"
          />
          <EuiText size="s">
            <p>http://some.svg</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon" style={{ width: '200px' }}>
        <EuiPanel>
          <EuiIcon type={reactSvg} size="xl" />
          <EuiText size="s">
            <p>{`{reactSvg}`}</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGrid>

    <EuiSpacer />

    <EuiText>
      <p>
        Any component that utlizes <EuiCode>EuiIcon</EuiCode> can use custom
        SVGs as well
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton iconType="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg">
          http://some.svg
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton iconType={reactSvg}>{`{reactSvg}`}</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
