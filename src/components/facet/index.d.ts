import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import { CommonProps, RefCallback } from '../common';
/// <reference path="../flex/index.d.ts" />

declare module '@elastic/eui' {
  /**
   * Facet button type defs
   *
   * @see './facet_button.js'
   */

  export interface EuiFacetButtonProps {
    children: ReactNode;
    icon?: ReactNode;
    isDisabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    isSelected?: boolean;
    quantity: number;
    buttonRef: RefCallback<HTMLButtonElement>;
  }
  export const EuiFacetButton: FunctionComponent<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & EuiFacetButtonProps
  >;

  /**
   * Facet group type defs
   *
   * @see './facet_group.js'
   */

  export type FacetGroupLayouts = 'vertical' | 'horizontal';
  export interface EuiFacetGroupProps {
    layout?: FacetGroupLayouts;
  }

  export const EuiFacetGroup: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiFacetGroupProps
  >;
}
