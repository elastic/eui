/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  Ref,
  useEffect,
  useState,
} from 'react';
import { cx } from '@emotion/css';
import { Global } from '@emotion/react';
import { CommonProps, keysOf } from '../common';
import { useCombinedRefs, useEuiTheme } from '../../services';
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
  const [overlayMaskNode, setOverlayMaskNode] = useState<HTMLDivElement | null>(
    null
  );
  const combinedMaskRef = useCombinedRefs<HTMLDivElement | null>([
    setOverlayMaskNode,
    maskRef,
  ]);
  const euiTheme = useEuiTheme();
  const styles = euiOverlayMaskStyles(euiTheme);
  const cssStyles = cx([
    styles.euiOverlayMask,
    styles[`${headerZindexLocation}Header`],
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
  }, [overlayMaskNode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!overlayMaskNode) return;
    overlayMaskNode.className = cx('euiOverlayMask', cssStyles, className);
    overlayMaskNode.dataset.relativeToHeader = headerZindexLocation;
  }, [overlayMaskNode, className, cssStyles, headerZindexLocation]);

  return (
    <EuiPortal portalRef={combinedMaskRef}>
      <Global styles={euiOverlayMaskBodyStyles} />
      {children}
    </EuiPortal>
  );
};
