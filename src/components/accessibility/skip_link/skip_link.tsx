/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, Ref } from 'react';
import classNames from 'classnames';
import { isTabbable } from 'tabbable';
import { useEuiTheme } from '../../../services';
import { EuiButton, EuiButtonProps } from '../../button/button';
import { PropsForAnchor, PropsForButton, ExclusiveUnion } from '../../common';
import { EuiScreenReaderOnly } from '../screen_reader_only';
import { euiSkipLinkStyles } from './skip_link.styles';

export const POSITIONS = ['static', 'fixed', 'absolute'] as const;
type Positions = typeof POSITIONS[number];

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

type propsForAnchor = PropsForAnchor<
  EuiSkipLinkInterface,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type propsForButton = PropsForButton<
  EuiSkipLinkInterface,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type EuiSkipLinkProps = ExclusiveUnion<propsForAnchor, propsForButton>;

export const EuiSkipLink: FunctionComponent<EuiSkipLinkProps> = ({
  destinationId,
  overrideLinkBehavior,
  tabIndex,
  position = 'static',
  children,
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSkipLinkStyles(euiTheme);

  const classes = classNames('euiSkipLink', className);

  const cssStyles = [
    styles.euiSkipLink,
    position !== 'static' ? styles[position] : undefined,
  ];

  // Create the `href` from `destinationId`
  let optionalProps = {};
  if (destinationId) {
    optionalProps = {
      href: `#${destinationId}`,
    };
  }
  if (overrideLinkBehavior) {
    optionalProps = {
      ...optionalProps,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();

        const destinationEl = document.getElementById(destinationId);
        if (!destinationEl) return;

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
            () => destinationEl.removeAttribute('tabindex'),
            { once: true }
          );
        }

        destinationEl.focus({ preventScroll: true }); // Scrolling is already handled above, and focus autoscroll behaves oddly on Chrome around fixed headers
      },
    };
  }

  return (
    <EuiScreenReaderOnly showOnFocus>
      <EuiButton
        css={cssStyles}
        className={classes}
        tabIndex={position === 'fixed' ? 0 : tabIndex}
        size="s"
        fill
        {...optionalProps}
        {...rest}
      >
        {children}
      </EuiButton>
    </EuiScreenReaderOnly>
  );
};
