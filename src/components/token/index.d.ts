import { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { IconType } from '../icon';
import {
  EuiTokenMapDisplayOptions as DisplayOptions,
  TokenShape as TkShape,
  TokenColor as TkColor,
  EuiTokenMapType as TkMapType,
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
    displayOptions?: DisplayOptions;
  }

  export type TokenShape = TkShape;
  export type TokenColor = TkColor;
  export type TokenType = TkMapType;
  export interface EuiTokenMapDisplayOptions extends DisplayOptions {}

  export const EuiToken: FunctionComponent<
    CommonProps & EuiTokenProps & HTMLAttributes<HTMLDivElement>
  >;
}
