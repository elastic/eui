/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cx } from '@emotion/css';
import { Global } from '@emotion/react';
import { CommonProps, keysOf } from '../common';
import { useCombinedRefs, useEuiMemoizedStyles } from '../../services';
import { EuiPortal } from '../portal';
import { euiOverlayMaskStyles } from './overlay_mask.styles';
import { euiOverlayMaskBodyStyles } from './overlay_mask_body.styles';

export interface EuiOverlayMaskInterface {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  /**
   * Should the mask visually sit above or below the EuiHeader (controlled by z-index)
   */
  headerZindexLocation?: 'above' | 'below';
  /**
   * React ref to be passed to the wrapping container
   */
  maskRef?: Ref<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
}

export type EuiOverlayMaskProps = Omit<CommonProps, 'css'> &
  Omit<
    Partial<Record<keyof HTMLAttributes<HTMLDivElement>, string>>,
    keyof EuiOverlayMaskInterface
  > &
  EuiOverlayMaskInterface;

export const EuiOverlayMask: FunctionComponent<EuiOverlayMaskProps> = ({
  className,
  children,
  headerZindexLocation = 'above',
  maskRef,
  ...rest
}) => {
  const hasRendered = useRef(false);
  const [overlayMaskNode, setOverlayMaskNode] = useState<HTMLDivElement | null>(
    null
  );
  const combinedMaskRef = useCombinedRefs<HTMLDivElement | null>([
    setOverlayMaskNode,
    maskRef,
  ]);

  const handleAnimationEnd = useCallback(() => {
    hasRendered.current = true;
  }, []);

  const styles = useEuiMemoizedStyles(euiOverlayMaskStyles);
  const cssStyles = cx([
    styles.euiOverlayMask,
    styles[`${headerZindexLocation}Header`],
    hasRendered.current && styles.noAnimation,
  ]);

  useEffect(() => {
    if (!overlayMaskNode) return;

    keysOf(rest).forEach((key) => {
      if (typeof rest[key] !== 'string') {
        throw new Error(
          `Unhandled property type. EuiOverlayMask property ${key} is not a string.`
        );
      }
      if (overlayMaskNode) {
        overlayMaskNode.setAttribute(key, rest[key]!);
      }
    });

    overlayMaskNode.addEventListener('animationend', handleAnimationEnd, {
      once: true,
    });

    return () => {
      overlayMaskNode.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [overlayMaskNode, handleAnimationEnd]); // eslint-disable-line react-hooks/exhaustive-deps

  // Note: Use `classList.add/remove` instead of setting the entire `className`
  // so as not to override any existing classes set by `EuiPortal`
  useEffect(() => {
    if (overlayMaskNode) {
      overlayMaskNode.classList.add('euiOverlayMask', cssStyles);
      overlayMaskNode.dataset.relativeToHeader = headerZindexLocation;
      return () => overlayMaskNode.classList.remove(cssStyles);
    }
  }, [overlayMaskNode, cssStyles, headerZindexLocation]);

  useEffect(() => {
    if (className && overlayMaskNode) {
      const classNameArgs = className.split(' '); // The `classList` API doesn't support multiple classes in the same string
      overlayMaskNode.classList.add(...classNameArgs);
      return () => overlayMaskNode.classList.remove(...classNameArgs);
    }
  }, [overlayMaskNode, className]);

  return (
    <EuiPortal portalRef={combinedMaskRef}>
      <Global styles={euiOverlayMaskBodyStyles} />
      {children}
    </EuiPortal>
  );
};
