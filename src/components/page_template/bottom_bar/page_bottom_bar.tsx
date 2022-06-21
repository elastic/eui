/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { findElementBySelectorOrRef } from '../../../services';
import { EuiBottomBar, EuiBottomBarProps } from '../../bottom_bar';
import { EuiPageSection, EuiPageSectionProps } from '../../page/page_section';
import { _EuiPageRestrictWidth } from '../../page/_restrict_width';
import { EuiPortal } from '../../portal';

export interface _EuiPageBottomBarProps
  extends Pick<EuiPageSectionProps, 'paddingSize'>,
    _EuiPageRestrictWidth,
    Omit<EuiBottomBarProps, 'paddingSize'> {
  sibling?: string;
}

export const _EuiPageBottomBar: FunctionComponent<_EuiPageBottomBarProps> = ({
  children,
  paddingSize,
  restrictWidth,
  sibling,
  style,
  ...rest
}) => {
  const [hasValidAnchor, setHasValidAnchor] = useState<boolean>(false);
  const animationFrameId = useRef<number>();
  const siblingNode = useRef<HTMLElement | null>(null);

  useEffect(() => {
    animationFrameId.current = window.requestAnimationFrame(() => {
      siblingNode.current = findElementBySelectorOrRef(sibling);
      setHasValidAnchor(siblingNode.current ? true : false);
    });

    return () => {
      animationFrameId.current &&
        window.cancelAnimationFrame(animationFrameId.current);
    };
  }, [sibling]);

  return (
    <EuiPortal
      insert={
        hasValidAnchor && siblingNode.current
          ? {
              sibling: siblingNode.current,
              position: 'after',
            }
          : undefined
      }
    >
      <EuiBottomBar
        paddingSize={'none'}
        position="sticky"
        style={{ flexShrink: 0, ...style }}
        // Using unknown here because of the possible conflict with overriding props and position `sticky`
        {...(rest as unknown)}
      >
        {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
        <EuiPageSection paddingSize={paddingSize} restrictWidth={restrictWidth}>
          {children}
        </EuiPageSection>
      </EuiBottomBar>
    </EuiPortal>
  );
};
