// Sets default displayOptions for EuiTokens based on iconType
// tokenClass: {
//   shape: 'square',
//   color: 'tokenTint01',
//   fill: false,
// },

export type TokenColor =
  | 'tokenTint01'
  | 'tokenTint02'
  | 'tokenTint03'
  | 'tokenTint04'
  | 'tokenTint05'
  | 'tokenTint06'
  | 'tokenTint07'
  | 'tokenTint08'
  | 'tokenTint09'
  | 'tokenTint10'
  | 'tokenTint11'
  | 'tokenTint12';

export type TokenShape = 'circle' | 'square' | 'rectangle';

export interface EuiTokenMapDisplayOptions {
  color?: TokenColor;
  shape?: TokenShape;
  fill?: boolean;
  hideBorder?: boolean;
}

export type EuiTokenMapType =
  | 'tokenClass'
  | 'tokenProperty'
  | 'tokenEnum'
  | 'tokenVariable'
  | 'tokenMethod'
  | 'tokenAnnotation'
  | 'tokenException'
  | 'tokenInterface'
  | 'tokenParameter'
  | 'tokenField'
  | 'tokenFunction'
  | 'tokenElement'
  | 'tokenBoolean'
  | 'tokenString'
  | 'tokenArray'
  | 'tokenConstant'
  | 'tokenNumber'
  | 'tokenObject'
  | 'tokenEvent'
  | 'tokenKey'
  | 'tokenNull'
  | 'tokenStruct'
  | 'tokenPackage'
  | 'tokenOperator'
  | 'tokenEnumMember'
  | 'tokenRepo'
  | 'tokenSymbol'
  | 'tokenFile'
  | 'tokenNamespace'
  | 'tokenModule';

export const TOKEN_MAP: {
  [mapType in EuiTokenMapType]: EuiTokenMapDisplayOptions
} = {
  tokenClass: {
    shape: 'circle',
    color: 'tokenTint01',
  },
  tokenProperty: {
    shape: 'circle',
    color: 'tokenTint02',
  },
  tokenEnum: {
    shape: 'circle',
    color: 'tokenTint03',
  },
  tokenVariable: {
    shape: 'circle',
    color: 'tokenTint04',
  },
  tokenMethod: {
    shape: 'square',
    color: 'tokenTint02',
  },
  tokenAnnotation: {
    shape: 'square',
    color: 'tokenTint06',
  },
  tokenException: {
    shape: 'circle',
    color: 'tokenTint07',
  },
  tokenInterface: {
    shape: 'circle',
    color: 'tokenTint08',
  },
  tokenParameter: {
    shape: 'square',
    color: 'tokenTint09',
  },
  tokenField: {
    shape: 'circle',
    color: 'tokenTint10',
  },
  tokenElement: {
    shape: 'square',
    color: 'tokenTint03',
  },
  tokenFunction: {
    shape: 'circle',
    color: 'tokenTint02',
  },
  tokenBoolean: {
    shape: 'square',
    color: 'tokenTint05',
  },
  tokenString: {
    shape: 'square',
    color: 'tokenTint07',
  },
  tokenArray: {
    shape: 'square',
    color: 'tokenTint04',
  },
  tokenNumber: {
    shape: 'circle',
    color: 'tokenTint05',
  },
  tokenConstant: {
    shape: 'circle',
    color: 'tokenTint07',
  },
  tokenObject: {
    shape: 'square',
    color: 'tokenTint03',
  },
  tokenEvent: {
    shape: 'circle',
    color: 'tokenTint09',
  },
  tokenKey: {
    shape: 'circle',
    color: 'tokenTint06',
  },
  tokenNull: {
    shape: 'square',
    color: 'tokenTint02',
  },
  tokenStruct: {
    shape: 'square',
    color: 'tokenTint07',
  },
  tokenPackage: {
    shape: 'square',
    color: 'tokenTint10',
  },
  tokenOperator: {
    shape: 'circle',
    color: 'tokenTint09',
  },
  tokenEnumMember: {
    shape: 'square',
    color: 'tokenTint04',
  },
  tokenRepo: {
    shape: 'rectangle',
    color: 'tokenTint05',
    fill: true,
  },
  tokenSymbol: {
    shape: 'rectangle',
    color: 'tokenTint07',
    fill: true,
  },
  tokenFile: {
    shape: 'rectangle',
    color: 'tokenTint12',
    fill: true,
  },
  tokenNamespace: {
    shape: 'square',
    color: 'tokenTint01',
  },
  tokenModule: {
    shape: 'square',
    color: 'tokenTint09',
  },
};
