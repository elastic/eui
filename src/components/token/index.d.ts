/// <reference path="../common.d.ts" />
/// <reference path="../icon/index.d.ts" />

import { SFC } from 'react';

declare module '@elastic/eui' {

  /**
   * token type defs
   * 
   * @see './token.js'
  */
  
  export type TokenSize = 's' | 'm' | 'l';

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

  export type TokenShape =
    | 'circle'
    | 'square'
    | 'rectangle'

  export interface EuiTokenProps {
    iconType?: IconType;
    color?: TokenColor;
    shape?: TokenShape;
    size?: TokenSize;
    fill?: boolean;
    hasBorder?: boolean;
  }

  export const EuiToken: SFC<CommonProps & EuiTokenProps>;
}