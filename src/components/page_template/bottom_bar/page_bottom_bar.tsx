/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { findElementBySelectorOrRef } from '../../../services';
import { EuiBottomBar, EuiBottomBarProps } from '../../bottom_bar';
import { EuiPageSection, EuiPageSectionProps } from '../../page/page_section';
import { _EuiPageRestrictWidth } from '../../page/_restrict_width';

export interface _EuiPageBottomBarProps
  extends Pick<EuiPageSectionProps, 'paddingSize'>,
    _EuiPageRestrictWidth,
    Omit<EuiBottomBarProps, 'paddingSize'> {
  /**
   * The reference id of the element to insert into
   */
  parent?: string;
}

export const _EuiPageBottomBar: FunctionComponent<_EuiPageBottomBarProps> = ({
  children,
  paddingSize,
  restrictWidth,
  parent,
  ...rest
}) => {
  // In order for the bottom bar to be placed at the end of the content,
  // it must know what parent element to insert into
  const [hasValidAnchor, setHasValidAnchor] = useState<boolean>(false);
  const animationFrameId = useRef<number>();
  const parentNode = useRef<HTMLElement | null>(null);

  useEffect(() => {
    animationFrameId.current = window.requestAnimationFrame(() => {
      parentNode.current = findElementBySelectorOrRef(parent);
      setHasValidAnchor(parentNode.current ? true : false);
    });

    return () => {
      animationFrameId.current &&
        window.cancelAnimationFrame(animationFrameId.current);
    };
  }, [parent]);

  const bar = (
    <EuiBottomBar
      paddingSize={'none'}
      position="sticky"
      // Hide the overflow in case of larger flex margins than padding
      css={css`
        overflow: hidden;
        flex-shrink: 0;
      `}
      // Using unknown here because of the possible conflict with overriding props and position `sticky`
      {...(rest as unknown)}
    >
      {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
      <EuiPageSection paddingSize={paddingSize} restrictWidth={restrictWidth}>
        {children}
      </EuiPageSection>
    </EuiBottomBar>
  );

  return hasValidAnchor && parentNode.current
    ? createPortal(bar, parentNode.current)
    : bar;
};
