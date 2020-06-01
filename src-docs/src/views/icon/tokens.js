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
  'tokenString',
  'tokenNumber',
  'tokenBoolean',
  'tokenDate',
  'tokenGeo',
  'tokenIP',
  'tokenShape',
  'tokenNested',
  'tokenAlias',
  'tokenRange',
  'tokenAnnotation',
  'tokenArray',
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
  'tokenObject',
  'tokenOperator',
  'tokenPackage',
  'tokenParameter',
  'tokenProperty',
  'tokenStruct',
  'tokenVariable',
  'tokenFile',
  'tokenSymbol',
  'tokenRepo',
  'tokenBinary',
  'tokenJoin',
  'tokenPercolator',
  'tokenFlattened',
  'tokenRankFeature',
  'tokenRankFeatures',
  'tokenKeyword',
  'tokenCompletionSuggester',
  'tokenDenseVector',
  'tokenText',
  'tokenTokenCount',
  'tokenSearchType',
  'tokenHistogram',
];

export default () => (
  <Fragment>
    <EuiFlexGrid columns={4}>
      {tokens.map(token => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={token}
          style={{ width: '200px' }}>
          <EuiCopy textToCopy={token} afterMessage={`${token} copied`}>
            {copy => (
              <EuiPanel className="eui-textCenter" onClick={copy}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}>
                  <EuiToken iconType={token} />
                </div>
                <EuiText size="s">
                  <p>{token}</p>
                </EuiText>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>

    <EuiSpacer />

    <EuiText size="s">
      <h3>Custom tokens</h3>
      <p>
        By default, an <EuiCode>iconType</EuiCode> with the token prefix (i.e.
        those listed above) will have predefined styles. However, any valid{' '}
        <EuiCode>iconType</EuiCode> can be passed and, in either case, the{' '}
        <EuiCode>shape</EuiCode>, <EuiCode>size</EuiCode>,{' '}
        <EuiCode>color</EuiCode>, and <EuiCode>fill</EuiCode> can be customized.
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGrid columns={4}>
      <EuiFlexItem className="guideDemo__icon">
        <EuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <EuiToken iconType="tokenStruct" size="xs" color="gray" />
          </div>
          <EuiText size="s">
            <p>An xs, gray tokenStruct</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon">
        <EuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <EuiToken iconType="tokenStruct" fill="none" />
          </div>
          <EuiText size="s">
            <p>A none fill tokenStruct</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon">
        <EuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <EuiToken
              iconType="tokenStruct"
              size="m"
              shape="circle"
              color="#FF0000"
            />
          </div>
          <EuiText size="s">
            <p>A size m, circle, #FF0000 tokenStruct</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem className="guideDemo__icon">
        <EuiPanel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px',
            }}>
            <EuiToken
              iconType="faceNeutral"
              size="l"
              color="euiColorVis7"
              shape="rectangle"
              fill="dark"
            />
          </div>
          <EuiText size="s">
            <p>A completely custom token</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGrid>
  </Fragment>
);
