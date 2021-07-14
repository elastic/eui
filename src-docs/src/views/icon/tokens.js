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
            afterMessage={`${token} copied`}>
            {(copy) => (
              <EuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s">
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
