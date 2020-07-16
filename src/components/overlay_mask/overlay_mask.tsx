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

/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export interface EuiOverlayMaskInterface {
  /**
   * Function that applies to clicking the mask itself and not the children
   */
  onClick?: () => void;
  children?: ReactNode;
  /**
   * Should the mask visually sit above or below the EuiHeader (controlled by z-index)
   */
  headerZindexLocation?: 'above' | 'below';
}

export type EuiOverlayMaskProps = CommonProps &
  Omit<
    Partial<Record<keyof HTMLAttributes<HTMLDivElement>, string>>,
    keyof EuiOverlayMaskInterface
  > &
  EuiOverlayMaskInterface;

export const EuiOverlayMask: FunctionComponent<EuiOverlayMaskProps> = ({
  className,
  children,
  onClick,
  headerZindexLocation = 'above',
  ...rest
}) => {
  const overlayMaskNode = useRef<HTMLDivElement>(document.createElement('div'));
  const [isPortalTargetReady, setIsPortalTargetReady] = useState(false);

  useEffect(() => {
    document.body.classList.add('euiBody-hasOverlayMask');

    return () => {
      document.body.classList.remove('euiBody-hasOverlayMask');
    };
  }, []);

  useEffect(() => {
    const portalTarget = overlayMaskNode.current;
    document.body.appendChild(overlayMaskNode.current);
    setIsPortalTargetReady(true);

    return () => {
      if (portalTarget) {
        document.body.removeChild(portalTarget);
      }
    };
  }, []);

  useEffect(() => {
    if (!overlayMaskNode.current) return;
    keysOf(rest).forEach(key => {
      if (typeof rest[key] !== 'string') {
        throw new Error(
          `Unhandled property type. EuiOverlayMask property ${key} is not a string.`
        );
      }
      overlayMaskNode.current.setAttribute(key, rest[key]!);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!overlayMaskNode.current) return;
    overlayMaskNode.current.className = classNames(
      'euiOverlayMask',
      `euiOverlayMask--${headerZindexLocation}Header`,
      className
    );
  }, [className, headerZindexLocation]);

  useEffect(() => {
    if (!overlayMaskNode.current || !onClick) return;
    const portalTarget = overlayMaskNode.current;
    overlayMaskNode.current.addEventListener('click', e => {
      if (e.target === overlayMaskNode.current) {
        onClick();
      }
    });

    return () => {
      if (portalTarget && onClick) {
        portalTarget.removeEventListener('click', onClick);
      }
    };
  }, [onClick]);

  return isPortalTargetReady ? (
    <>{createPortal(children, overlayMaskNode.current!)}</>
  ) : null;
};
