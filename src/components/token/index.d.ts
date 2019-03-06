import { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { IconType } from '../icon';

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
    | 'tokenTint11'
    | 'tokenTint12'

  export type TokenShape =
    | 'circle'
    | 'square'
    | 'rectangle'

  export interface EuiTokenProps {
    iconType: IconType;
    size?: TokenSize;
    displayOptions?: {
      color?: TokenColor;
      shape?: TokenShape;
      fill?: boolean;
      hasBorder?: boolean;
    };
  }

  export const EuiToken: FunctionComponent<CommonProps & EuiTokenProps & HTMLAttributes<HTMLDivElement>>;
}
