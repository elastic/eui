/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, Ref, useCallback } from 'react';
import classNames from 'classnames';
import { isTabbable } from 'tabbable';
import { useEuiTheme } from '../../../services';
import { EuiButton, EuiButtonProps } from '../../button/button';
import { PropsForAnchor } from '../../common';
import { EuiScreenReaderOnly } from '../screen_reader_only';
import { euiSkipLinkStyles } from './skip_link.styles';

export const POSITIONS = ['static', 'fixed', 'absolute'] as const;
type Positions = (typeof POSITIONS)[number];

interface EuiSkipLinkInterface extends EuiButtonProps {
  /**
   * Change the display position of the element when focused.
   * If 'fixed', the link will be fixed to the top left of the viewport
   */
  position?: Positions;
  /**
   * Typically an anchor id (e.g. `a11yMainContent`), the value provided
   * will be prepended with a hash `#` and used as the link `href`
   */
  destinationId: string;
  /**
   * If no destination ID element exists or can be found, you may provide a query selector
   * string to fall back to.
   *
   * For complex applications with potentially variable layouts per page, an array of
   * query selectors can be passed, e.g. `['main', '[role=main]', '.appWrapper']`, which
   * prioritizes looking for multiple fallbacks based on array order.
   * @default main
   */
  fallbackDestination?: string | string[];
  /**
   * If default HTML anchor link behavior is not desired (e.g. for SPAs with hash routing),
   * setting this flag to true will manually scroll to and focus the destination element
   * without changing the browser URL's hash
   */
  overrideLinkBehavior?: boolean;
  /**
   * When position is fixed, this is forced to `0`
   */
  tabIndex?: number;
}

export type EuiSkipLinkProps = PropsForAnchor<
  EuiSkipLinkInterface,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export const EuiSkipLink: FunctionComponent<EuiSkipLinkProps> = ({
  destinationId,
  fallbackDestination = 'main',
  overrideLinkBehavior,
  tabIndex,
  position = 'static',
  children,
  className,
  onClick: _onClick,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSkipLinkStyles(euiTheme);

  const classes = classNames('euiSkipLink', className);

  const cssStyles = [
    styles.euiSkipLink,
    position !== 'static' ? styles[position] : undefined,
  ];

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      let destinationEl: HTMLElement | null = null;
      // Check if the destination ID is valid
      destinationEl = document.getElementById(destinationId);
      const hasValidId = !!destinationEl;
      // Check the fallback destination if not
      if (!destinationEl && fallbackDestination) {
        if (Array.isArray(fallbackDestination)) {
          for (let i = 0; i < fallbackDestination.length; i++) {
            destinationEl = document.querySelector(fallbackDestination[i]);
            if (destinationEl) break; // Stop once the first fallback has been found
          }
        } else {
          destinationEl = document.querySelector(fallbackDestination);
        }
      }

      if ((overrideLinkBehavior || !hasValidId) && destinationEl) {
        e.preventDefault();

        // Scroll to the top of the destination content only if it's ~mostly out of view
        const destinationY = destinationEl.getBoundingClientRect().top;
        const halfOfViewportHeight = window.innerHeight / 2;
        if (
          destinationY >= halfOfViewportHeight ||
          window.scrollY >= destinationY + halfOfViewportHeight
        ) {
          destinationEl.scrollIntoView();
        }

        // Ensure the destination content is focusable
        if (!isTabbable(destinationEl)) {
          destinationEl.tabIndex = -1;
          destinationEl.addEventListener(
            'blur',
            () => destinationEl?.removeAttribute('tabindex'),
            { once: true }
          );
        }

        destinationEl.focus({ preventScroll: true }); // Scrolling is already handled above, and focus autoscroll behaves oddly on Chrome around fixed headers
      }

      _onClick?.(e);
    },
    [overrideLinkBehavior, destinationId, fallbackDestination, _onClick]
  );

  return (
    <EuiScreenReaderOnly showOnFocus>
      <EuiButton
        css={cssStyles}
        className={classes}
        tabIndex={position === 'fixed' ? 0 : tabIndex}
        size="s"
        fill
        href={`#${destinationId}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </EuiButton>
    </EuiScreenReaderOnly>
  );
};
