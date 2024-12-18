/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { TokenProps } from './token_types';

export type EuiTokenMapType =
  | 'tokenAlias'
  | 'tokenAnnotation'
  | 'tokenArray'
  | 'tokenBinary'
  | 'tokenBoolean'
  | 'tokenClass'
  | 'tokenCompletionSuggester'
  | 'tokenConstant'
  | 'tokenDate'
  | 'tokenDimension'
  | 'tokenElement'
  | 'tokenEnum'
  | 'tokenEnumMember'
  | 'tokenEvent'
  | 'tokenException'
  | 'tokenField'
  | 'tokenFile'
  | 'tokenFlattened'
  | 'tokenFunction'
  | 'tokenGeo'
  | 'tokenHistogram'
  | 'tokenInterface'
  | 'tokenIP'
  | 'tokenJoin'
  | 'tokenKey'
  | 'tokenKeyword'
  | 'tokenMethod'
  | 'tokenMetricCounter'
  | 'tokenMetricGauge'
  | 'tokenModule'
  | 'tokenNamespace'
  | 'tokenNested'
  | 'tokenNull'
  | 'tokenNumber'
  | 'tokenObject'
  | 'tokenOperator'
  | 'tokenPackage'
  | 'tokenParameter'
  | 'tokenPercolator'
  | 'tokenProperty'
  | 'tokenRange'
  | 'tokenRankFeature'
  | 'tokenRankFeatures'
  | 'tokenRepo'
  | 'tokenSearchType'
  | 'tokenSemanticText'
  | 'tokenShape'
  | 'tokenString'
  | 'tokenStruct'
  | 'tokenSymbol'
  | 'tokenTag'
  | 'tokenText'
  | 'tokenTokenCount'
  | 'tokenVariable'
  | 'tokenVectorDense'
  | 'tokenDenseVector' // NOTE: This is an undocumented alias for `tokenVectorDense`, added for legacy compatability
  | 'tokenVectorSparse';

/**
 * Most of the style combinations for tokens are semi-arbitrary. However, there was an effort
 * to use the square shape for more common token types like string and number. Reserving the
 * circle shape for more uncommon token types so they grab attention.
 */

export const TOKEN_MAP_AMSTERDAM: {
  [mapType in EuiTokenMapType]: Omit<TokenProps, 'iconType'>;
} = {
  tokenAlias: {
    shape: 'circle',
    color: 'euiColorVis3',
  },
  tokenAnnotation: {
    shape: 'square',
    color: 'euiColorVis5',
  },
  tokenArray: {
    shape: 'square',
    color: 'euiColorVis7',
  },
  tokenBinary: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenBoolean: {
    shape: 'square',
    color: 'euiColorVis7',
  },
  tokenClass: {
    shape: 'circle',
    color: 'euiColorVis1',
  },
  tokenCompletionSuggester: {
    shape: 'square',
    color: 'euiColorVis1',
  },
  tokenConstant: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenDate: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenDimension: {
    shape: 'square',
    color: 'euiColorVis1',
  },
  tokenElement: {
    shape: 'square',
    color: 'euiColorVis3',
  },
  tokenEnum: {
    shape: 'circle',
    color: 'euiColorVis3',
  },
  tokenEnumMember: {
    shape: 'square',
    color: 'euiColorVis7',
  },
  tokenEvent: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenException: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenField: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenFile: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenFlattened: {
    shape: 'square',
    color: 'euiColorVis7',
  },
  tokenFunction: {
    shape: 'circle',
    color: 'euiColorVis2',
  },
  tokenGeo: {
    shape: 'square',
    color: 'euiColorVis5',
  },
  tokenHistogram: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenInterface: {
    shape: 'circle',
    color: 'euiColorVis9',
  },
  tokenIP: {
    shape: 'square',
    color: 'euiColorVis9',
  },
  tokenJoin: {
    shape: 'square',
    color: 'euiColorVis5',
  },
  tokenKey: {
    shape: 'circle',
    color: 'euiColorVis5',
  },
  tokenKeyword: {
    shape: 'square',
    color: 'euiColorVis1',
  },
  tokenMethod: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenMetricCounter: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenMetricGauge: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenModule: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenNamespace: {
    shape: 'square',
    color: 'euiColorVis1',
  },
  tokenNested: {
    shape: 'circle',
    color: 'euiColorVis2',
  },
  tokenNull: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenNumber: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenObject: {
    shape: 'circle',
    color: 'euiColorVis3',
  },
  tokenOperator: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenPackage: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenParameter: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenPercolator: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenProperty: {
    shape: 'circle',
    color: 'euiColorVis2',
  },
  tokenRange: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenRankFeature: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenRankFeatures: {
    shape: 'square',
    color: 'euiColorVis3',
  },
  tokenRepo: {
    shape: 'square',
    color: 'euiColorVis1',
  },
  tokenSearchType: {
    shape: 'square',
    color: 'euiColorVis5',
  },
  tokenSemanticText: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenShape: {
    shape: 'circle',
    color: 'euiColorVis8',
  },
  tokenString: {
    shape: 'square',
    color: 'euiColorVis1',
  },
  tokenStruct: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenSymbol: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenTag: {
    shape: 'square',
    color: 'euiColorVis9',
  },
  tokenText: {
    shape: 'square',
    color: 'euiColorVis3',
  },
  tokenTokenCount: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenVariable: {
    shape: 'circle',
    color: 'euiColorVis7',
  },
  tokenVectorDense: {
    shape: 'square',
    color: 'euiColorVis5',
  },
  tokenDenseVector: {
    shape: 'square',
    color: 'euiColorVis5',
  },
  tokenVectorSparse: {
    shape: 'square',
    color: 'euiColorVis1',
  },
};

export const TOKEN_MAP_BOREALIS: {
  [mapType in EuiTokenMapType]: Omit<TokenProps, 'iconType'>;
} = {
  tokenAlias: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenAnnotation: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenArray: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenBinary: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenBoolean: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenClass: {
    shape: 'circle',
    color: 'euiColorVis2',
  },
  tokenCompletionSuggester: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenConstant: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenDate: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenDimension: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenElement: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenEnum: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenEnumMember: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenEvent: {
    shape: 'circle',
    color: 'euiColorVis6',
  },
  tokenException: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenField: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenFile: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenFlattened: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenFunction: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenGeo: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenHistogram: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenInterface: {
    shape: 'circle',
    color: 'euiColorVis6',
  },
  tokenIP: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenJoin: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenKey: {
    shape: 'circle',
    color: 'euiColorVis8',
  },
  tokenKeyword: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenMethod: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenMetricCounter: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenMetricGauge: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenModule: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenNamespace: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenNested: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenNull: {
    shape: 'square',
    color: 'euiColorVis4',
  },
  tokenNumber: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenObject: {
    shape: 'circle',
    color: 'euiColorVis0',
  },
  tokenOperator: {
    shape: 'circle',
    color: 'euiColorVis6',
  },
  tokenPackage: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenParameter: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenPercolator: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenProperty: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenRange: {
    shape: 'circle',
    color: 'euiColorVis6',
  },
  tokenRankFeature: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenRankFeatures: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenRepo: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenSearchType: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenSemanticText: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenShape: {
    shape: 'circle',
    color: 'euiColorVis8',
  },
  tokenString: {
    shape: 'square',
    color: 'euiColorVis2',
  },
  tokenStruct: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenSymbol: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenTag: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenText: {
    shape: 'square',
    color: 'euiColorVis0',
  },
  tokenTokenCount: {
    shape: 'square',
    color: 'euiColorVis6',
  },
  tokenVariable: {
    shape: 'circle',
    color: 'euiColorVis4',
  },
  tokenVectorDense: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenDenseVector: {
    shape: 'square',
    color: 'euiColorVis8',
  },
  tokenVectorSparse: {
    shape: 'square',
    color: 'euiColorVis2',
  },
};

export const TOKEN_COLOR_TO_ICON_COLOR_MAP = {
  euiColorVis0: 'euiColorVis0',
  euiColorVis1: 'euiColorVis0',
  euiColorVis2: 'euiColorVis2',
  euiColorVis3: 'euiColorVis2',
  euiColorVis4: 'euiColorVis4',
  euiColorVis5: 'euiColorVis4',
  euiColorVis6: 'euiColorVis6',
  euiColorVis7: 'euiColorVis6',
  euiColorVis8: 'euiColorVis8',
  euiColorVis9: 'euiColorVis8',
};
