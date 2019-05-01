// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS

// This example JS is overly complex for simple icon usage
// and is set up this way for ease of use in our docs.
//
// Check the snippet tab for a more common usage.

import React, { Fragment } from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiToken,
  EuiSpacer,
  EuiCopy,
  EuiCode,
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
            style={{ width: '200px' }}
          >
            <EuiCopy
              textToCopy={token}
              afterMessage={`${token} copied`}
            >
              {(copy) => (
                <EuiPanel
                  className="eui-textCenter"
                  onClick={copy}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <EuiToken iconType={token}/>
                  </div>
                  <EuiText size="s">
                    <p>{token}</p>
                  </EuiText>
                </EuiPanel>
              )}
            </EuiCopy>
          </EuiFlexItem>
        ))
      }
    </EuiFlexGrid>

    <EuiSpacer />

    <EuiText size="s">
      <p>
        By default the <EuiCode>iconType</EuiCode> prop defines the styling of the token.
        However, <EuiCode>displayOptions</EuiCode> allows you to overwrite the color, shape and fill used
        if you need a more custom token using any of the EUI glyph set.
      </p>
    </EuiText>

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
