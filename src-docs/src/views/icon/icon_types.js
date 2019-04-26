import React, { Fragment } from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';

import reactSvg from '../../images/custom.svg';


export default () => (
  <Fragment>
    <EuiText>
      <p>The <EuiCode>type</EuiCode> prop can accept a valid enum, string or React SVG Element.</p>
    </EuiText>
    <EuiSpacer />
    <EuiFlexGrid columns={4}>
      <EuiFlexItem
        className="guideDemo__icon"
        style={{ width: '200px' }}
      >
        <EuiPanel>
          <EuiIcon
            type="logoElastic"
            size="xl"
          />
          <EuiText size="s">
            <p>logoElastic</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem
        className="guideDemo__icon"
        style={{ width: '200px' }}
      >
        <EuiPanel>
          <EuiIcon
            type="https://upload.wikimedia.org/wikipedia/commons/9/9f/Vimlogo.svg"
            size="xl"
          />
          <EuiText size="s">
            <p>http://some.svg</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem
        className="guideDemo__icon"
        style={{ width: '200px' }}
      >
        <EuiPanel>
          <EuiIcon
            type={reactSvg}
            size="xl"
          />
          <EuiText size="s">
            <p>{`{reactSvg}`}</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGrid>
  </Fragment>
);
