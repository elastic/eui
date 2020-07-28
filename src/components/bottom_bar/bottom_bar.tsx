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
import React, { FunctionComponent, useEffect, useRef } from 'react';
import usePropagate from '../../services/propagate/use_propagate';

import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { EuiPortal } from '../portal';

type BottomBarPaddingSize = 'none' | 's' | 'm' | 'l';

// Exported for testing
export const paddingSizeToClassNameMap: {
  [value in BottomBarPaddingSize]: string | null
} = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge',
};

export const paddingSizeToVariableMap: {
  [value in BottomBarPaddingSize]: string | null
} = {
  none: 'euiSize0',
  s: 'euiSizeS',
  m: 'euiSize',
  l: 'euiSizeL',
};

interface Props extends CommonProps {
  /**
   * Optional class applied to the body class
   */
  bodyClassName?: string;

  /**
   * Padding applied to the bar.
   * Provide a single value to apply to all sides, or
   * an array applied to `[top, right, bottom, left]`
   */
  paddingSize?: BottomBarPaddingSize | BottomBarPaddingSize[];

  /**
   * Customize the screen reader heading that helps users find this control. Default is "Page level controls".
   */
  landmarkHeading?: string;
}

export const EuiBottomBar: FunctionComponent<Props> = ({
  children,
  className,
  paddingSize = 'm',
  bodyClassName,
  landmarkHeading,
  ...rest
}) => {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const height = bar && bar.current ? bar.current.clientHeight : -1;
    document.body.style.paddingBottom = `${height}px`;
    if (bodyClassName) {
      document.body.classList.add(bodyClassName);
    }

    return () => {
      document.body.style.paddingBottom = '';
      if (bodyClassName) {
        document.body.classList.remove(bodyClassName);
      }
    };
  }, [bodyClassName]);
  const [sizes] = usePropagate(['sizes']);

  const classes = classNames(
    'euiBottomBar',
    // paddingSizeToClassNameMap[paddingSize],
    className
  );

  const bottomBarPadding = {
    padding:
      typeof paddingSize === 'string'
        ? sizes[paddingSizeToVariableMap[paddingSize] || 'euiSize0'] // TODO: Handle null more gracefully
        : paddingSize.reduce(
            (string, paddingSize) =>
              `${string} ` +
              `${sizes[paddingSizeToVariableMap[paddingSize] || 'euiSize0']}`,
            ''
          ),
  };

  console.log(paddingSize, bottomBarPadding);

  return (
    <EuiPortal>
      <EuiI18n
        token="euiBottomBar.screenReaderHeading"
        default="Page level controls">
        {(screenReaderHeading: string) => (
          // Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
          // A bug in voiceover won't list some landmarks in the rotor without an aria-label
          <section
            aria-label={landmarkHeading ? landmarkHeading : screenReaderHeading}
            css={bottomBarPadding}
            className={classes}
            ref={bar}
            {...rest}>
            <EuiScreenReaderOnly>
              <h2>{landmarkHeading ? landmarkHeading : screenReaderHeading}</h2>
            </EuiScreenReaderOnly>
            {/* EMOTION: Something wrapping the children that forces a particular Propogate theme */}
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
    </EuiPortal>
  );
};
