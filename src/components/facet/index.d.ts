import { ButtonHTMLAttributes, HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
/// <reference path="../flex/index.d.ts" />

import { EuiFacetButtonProps as ButtonProps } from './facet_button';

declare module '@elastic/eui' {
  /**
   * Facet button type defs
   *
   * @see './facet_button.js'
   */

  export type EuiFacetButtonProps = ButtonProps;

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
