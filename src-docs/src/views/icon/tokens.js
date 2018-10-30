import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiToken
} from '../../../../src/components';

const tokens = [
  'tokenClass',
  'tokenProperty',
  'tokenEnum',
  'tokenVariable',
  'tokenMethod',
  'tokenAnnotation',
  'tokenException',
  'tokenInterface',
  'tokenParameter',
  'tokenField',
  'tokenElement',
  'tokenFunction',
  'tokenBoolean',
  'tokenString',
  'tokenArray',
  'tokenNumber',
  'tokenConstant',
  'tokenObject',
  'tokenEvent',
  'tokenKey',
  'tokenNull',
  'tokenStruct',
  'tokenPackage',
  'tokenOperator',
  'tokenEnumMember',
  'tokenTypeRepo',
  'tokenTypeSymbol',
  'tokenTypeFile'
];

export default () => (
  <EuiFlexGrid columns={4}>
    {
      tokens.map(token => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={token}
          style={{ width: '200px' }}
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
);
