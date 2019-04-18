import React, { Fragment } from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiToken,
  EuiSpacer,
} from '../../../../src/components';

const tokens = [
  'tokenAnnotation',
  'tokenArray',
  'tokenBoolean',
  'tokenClass',
  'tokenConstant',
  'tokenElement',
  'tokenEnum',
  'tokenEnumMember',
  'tokenEvent',
  'tokenException',
  'tokenField',
  'tokenFunction',
  'tokenInterface',
  'tokenKey',
  'tokenMethod',
  'tokenModule',
  'tokenNamespace',
  'tokenNull',
  'tokenNumber',
  'tokenObject',
  'tokenOperator',
  'tokenPackage',
  'tokenParameter',
  'tokenProperty',
  'tokenString',
  'tokenStruct',
  'tokenVariable',
  'tokenFile',
  'tokenSymbol',
  'tokenRepo'
];

export default () => (
  <Fragment>
    <EuiFlexGrid columns={4}>
      {
        tokens.map(token => (
          <EuiFlexItem
            className="guideDemo__icon"
            key={token}
          >
            <EuiPanel>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <EuiToken iconType={token}/>
              </div>
              <EuiText size="s">
                <p>{token}</p>
              </EuiText>
            </EuiPanel>
          </EuiFlexItem>
        ))
      }
    </EuiFlexGrid>

    <EuiSpacer />

    <EuiFlexGrid columns={4}>
      <EuiFlexItem
        className="guideDemo__icon"
      >
        <EuiPanel>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <EuiToken
              iconType="tokenEvent"
              size="m"
              displayOptions={{
                color: 'tokenTint10',
                shape: 'square',
                fill: true,
              }}
            />
          </div>
          <EuiText size="s">
            <p>A custom token</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem
        className="guideDemo__icon"
      >
        <EuiPanel>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <EuiToken
              iconType="visMapCoordinate"
              displayOptions={{
                color: 'tokenTint05',
                shape: 'circle',
              }}
            />
          </div>
          <EuiText size="s">
            <p>A custom token</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem
        className="guideDemo__icon"
      >
        <EuiPanel>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <EuiToken
              iconType="tokenElement"
              size="l"
              displayOptions={{
                color: 'tokenTint07',
                shape: 'rectangle',
                hideBorder: true
              }}
            />
          </div>
          <EuiText size="s">
            <p>A custom token</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGrid>
  </Fragment>
);
