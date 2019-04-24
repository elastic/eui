import { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { IconType } from '../icon';
import { EuiTokenMapDisplayOptions } from './token_map';
export {
  EuiTokenMapDisplayOptions,
  TokenShape,
  TokenColor,
  EuiTokenMapType,
} from './token_map';

declare module '@elastic/eui' {
  /**
   * token type defs
   *
   * @see './token.js'
  */
  export type TokenSize = 's' | 'm' | 'l';
  export interface EuiTokenProps {
    iconType: IconType;
    size?: TokenSize;
    displayOptions?: EuiTokenMapDisplayOptions;
  }

  export const EuiToken: FunctionComponent<
    CommonProps & EuiTokenProps & HTMLAttributes<HTMLDivElement>
  >;
}
