/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, useRef } from 'react';
import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';

type BottomBarPaddingSize = 'none' | 's' | 'm' | 'l';

// Exported for testing
export const paddingSizeToClassNameMap: {
  [value in BottomBarPaddingSize]: string | null;
} = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge',
};

export const POSITIONS = ['static', 'fixed', 'sticky'] as const;
export type _BottomBarPosition = typeof POSITIONS[number];

export interface EuiBottomBarProps
  extends CommonProps,
    HTMLAttributes<HTMLElement> {
  /**
   * Padding applied to the bar. Default is 'm'.
   */
  paddingSize: BottomBarPaddingSize;
  /**
   * Whether the component should apply padding on the document body element to afford for its own displacement height.
   * Default is true.
   */
  affordForDisplacement: boolean;
  /**
   * Optional class applied to the body element on mount
   */
  bodyClassName?: string;
  /**
   * Customize the screen reader heading that helps users find this control. Default is 'Page level controls'.
   */
  landmarkHeading?: string;
  /**
   * Helper that positions the bottom against the its parent
   */
  position?: _BottomBarPosition;
  /**
   * Whether to wrap in an EuiPortal which appends the component to the body element
   */
  usePortal?: boolean;
}

export const EuiBottomBar = forwardRef<
  HTMLElement, // type of element or component the ref will be passed to
  EuiBottomBarProps // what properties apart from `ref` the component accepts
>(
  (
    {
      paddingSize = 'm',
      // affordForDisplacement = true,
      children,
      className,
      bodyClassName,
      landmarkHeading,
      usePortal = true,
      position = 'fixed',
      ...rest
    },
    ref
  ) => {
    // private bar: HTMLElement | null = null;

    // componentDidMount() {
    //   if (this.props.affordForDisplacement) {
    //     const height = this.bar ? this.bar.clientHeight : -1;
    //     document.body.style.paddingBottom = `${height}px`;
    //   }

    //   if (this.props.bodyClassName) {
    //     document.body.classList.add(this.props.bodyClassName);
    //   }
    // }

    // componentDidUpdate(prevProps: EuiBottomBarProps) {
    //   if (prevProps.affordForDisplacement !== this.props.affordForDisplacement) {
    //     if (this.props.affordForDisplacement) {
    //       // start affording for displacement
    //       const height = this.bar ? this.bar.clientHeight : -1;
    //       document.body.style.paddingBottom = `${height}px`;
    //     } else {
    //       // stop affording for displacement
    //       document.body.style.paddingBottom = '';
    //     }
    //   }

    //   if (prevProps.bodyClassName !== this.props.bodyClassName) {
    //     if (prevProps.bodyClassName) {
    //       document.body.classList.remove(prevProps.bodyClassName);
    //     }
    //     if (this.props.bodyClassName) {
    //       document.body.classList.add(this.props.bodyClassName);
    //     }
    //   }
    // }

    // componentWillUnmount() {
    //   if (this.props.affordForDisplacement) {
    //     document.body.style.paddingBottom = '';
    //   }

    //   if (this.props.bodyClassName) {
    //     document.body.classList.remove(this.props.bodyClassName);
    //   }
    // }
    const resizeRef = useRef<HTMLElement | null>(null);
    const dimensions = useResizeObserver(resizeRef.current);

    const classes = classNames(
      'euiBottomBar',
      `euiBottomBar--${position}`,
      paddingSizeToClassNameMap[paddingSize],
      className
    );

    const bar = (
      <>
        <EuiI18n
          token="euiBottomBar.screenReaderHeading"
          default="Page level controls">
          {(screenReaderHeading: string) => (
            // Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
            // A bug in voiceover won't list some landmarks in the rotor without an aria-label
            <section
              aria-label={
                landmarkHeading ? landmarkHeading : screenReaderHeading
              }
              className={classes}
              ref={resizeRef}
              {...rest}>
              <EuiScreenReaderOnly>
                <h2>
                  {landmarkHeading ? landmarkHeading : screenReaderHeading}
                </h2>
              </EuiScreenReaderOnly>
              {children}
            </section>
          )}
        </EuiI18n>
        <EuiScreenReaderOnly>
          <p aria-live="assertive">
            {landmarkHeading ? (
              <EuiI18n
                token="euiBottomBar.customScreenReaderAnnouncement"
                default="There is a new region landmark called {landmarkHeading} with page level controls at the end of the document."
                values={{ landmarkHeading }}
              />
            ) : (
              <EuiI18n
                token="euiBottomBar.screenReaderAnnouncement"
                default="There is a new region landmark with page level controls at the end of the document."
              />
            )}
          </p>
        </EuiScreenReaderOnly>
      </>
    );

    return usePortal ? <EuiPortal>{bar}</EuiPortal> : bar;
  }
);

EuiBottomBar.displayName = 'EuiBottomBar';
