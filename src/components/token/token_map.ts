import { IconType } from '../icon';

// Sets default displayOptions for EuiTokens based on iconType
// tokenClass: {
//   shape: 'square',
//   color: 'tokenTint01',
//   fill: false,
// },

export type TokenColor =
  | 'tokenTint00'
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
  iconType?: IconType;
}

export type EuiTokenMapType =
  | 'tokenAnnotation'
  | 'tokenArray'
  | 'tokenBoolean'
  | 'tokenClass'
  | 'tokenConstant'
  | 'tokenElement'
  | 'tokenEnum'
  | 'tokenEnumMember'
  | 'tokenEvent'
  | 'tokenException'
  | 'tokenField'
  | 'tokenFile'
  | 'tokenFunction'
  | 'tokenInterface'
  | 'tokenKey'
  | 'tokenMethod'
  | 'tokenModule'
  | 'tokenNamespace'
  | 'tokenNull'
  | 'tokenNumber'
  | 'tokenObject'
  | 'tokenOperator'
  | 'tokenPackage'
  | 'tokenParameter'
  | 'tokenProperty'
  | 'tokenRepo'
  | 'tokenString'
  | 'tokenStruct'
  | 'tokenSymbol'
  | 'tokenVariable';

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
    color: 'tokenTint07',
  },
  tokenMethod: {
    shape: 'square',
    color: 'tokenTint02',
  },
  tokenAnnotation: {
    shape: 'square',
    color: 'tokenTint05',
  },
  tokenException: {
    shape: 'circle',
    color: 'tokenTint00',
  },
  tokenInterface: {
    shape: 'circle',
    color: 'tokenTint09',
  },
  tokenParameter: {
    shape: 'square',
    color: 'tokenTint04',
  },
  tokenField: {
    shape: 'circle',
    color: 'tokenTint12',
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
    color: 'tokenTint01',
  },
  tokenString: {
    shape: 'square',
    color: 'tokenTint00',
  },
  tokenArray: {
    shape: 'square',
    color: 'tokenTint07',
  },
  tokenNumber: {
    shape: 'circle',
    color: 'tokenTint01',
  },
  tokenConstant: {
    shape: 'circle',
    color: 'tokenTint00',
  },
  tokenObject: {
    shape: 'square',
    color: 'tokenTint03',
  },
  tokenEvent: {
    shape: 'circle',
    color: 'tokenTint04',
  },
  tokenKey: {
    shape: 'circle',
    color: 'tokenTint05',
  },
  tokenNull: {
    shape: 'square',
    color: 'tokenTint02',
  },
  tokenStruct: {
    shape: 'square',
    color: 'tokenTint00',
  },
  tokenPackage: {
    shape: 'square',
    color: 'tokenTint12',
  },
  tokenOperator: {
    shape: 'circle',
    color: 'tokenTint04',
  },
  tokenEnumMember: {
    shape: 'square',
    color: 'tokenTint07',
  },
  tokenRepo: {
    shape: 'rectangle',
    color: 'tokenTint01',
    fill: true,
  },
  tokenSymbol: {
    shape: 'rectangle',
    color: 'tokenTint00',
    fill: true,
  },
  tokenFile: {
    shape: 'rectangle',
    color: 'tokenTint10',
    fill: true,
  },
  tokenNamespace: {
    shape: 'square',
    color: 'tokenTint01',
  },
  tokenModule: {
    shape: 'square',
    color: 'tokenTint04',
  },
};
