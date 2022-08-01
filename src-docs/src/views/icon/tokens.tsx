import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiToken,
  EuiCopy,
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

import type { EuiTokenMapType } from '../../../../src/components/token/token_map';

const tokens: EuiTokenMapType[] = [
  'tokenAlias',
  'tokenAnnotation',
  'tokenArray',
  'tokenBinary',
  'tokenBoolean',
  'tokenClass',
  'tokenCompletionSuggester',
  'tokenConstant',
  'tokenDate',
  'tokenDenseVector',
  'tokenElement',
  'tokenEnum',
  'tokenEnumMember',
  'tokenEvent',
  'tokenException',
  'tokenField',
  'tokenFile',
  'tokenFlattened',
  'tokenFunction',
  'tokenGeo',
  'tokenHistogram',
  'tokenInterface',
  'tokenIP',
  'tokenJoin',
  'tokenKey',
  'tokenKeyword',
  'tokenMethod',
  'tokenMetricCounter',
  'tokenMetricGauge',
  'tokenModule',
  'tokenNamespace',
  'tokenNested',
  'tokenNull',
  'tokenNumber',
  'tokenObject',
  'tokenOperator',
  'tokenPackage',
  'tokenParameter',
  'tokenPercolator',
  'tokenProperty',
  'tokenRange',
  'tokenRankFeature',
  'tokenRankFeatures',
  'tokenRepo',
  'tokenSearchType',
  'tokenShape',
  'tokenString',
  'tokenStruct',
  'tokenSymbol',
  'tokenTag',
  'tokenText',
  'tokenTokenCount',
  'tokenVariable',
];

export default () => (
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiToken iconType="tokenAnnotation" />'}
    </EuiCodeBlock>
    <EuiSpacer />
    <EuiFlexGrid direction="column" columns={3}>
      {tokens.map((token) => (
        <EuiFlexItem key={token}>
          <EuiCopy
            display="block"
            textToCopy={token}
            afterMessage={`${token} copied`}
          >
            {(copy) => (
              <EuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s"
              >
                <EuiToken className="eui-alignMiddle" iconType={token} /> &emsp;{' '}
                <small>{token}</small>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  </>
);
