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

import {
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
  onClick?: () => void;
  children?: ReactNode;
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
  ...rest
}) => {
  const overlayMaskNode = useRef<HTMLDivElement | null>(null);
  const [isPortalTargetReady, setIsPortalTargetReady] = useState(false);

  useEffect(() => {
    document.body.classList.add('euiBody-hasOverlayMask');

    return () => {
      document.body.classList.remove('euiBody-hasOverlayMask');
    };
  }, []);

  useEffect(() => {
    overlayMaskNode.current = document.createElement('div');
    document.body.appendChild(overlayMaskNode.current);
    setIsPortalTargetReady(true);

    return () => {
      if (overlayMaskNode.current) {
        document.body.removeChild(overlayMaskNode.current);
        overlayMaskNode.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!overlayMaskNode.current) return;
    overlayMaskNode.current.className = classNames('euiOverlayMask', className);
  }, [className]);

  useEffect(() => {
    if (!overlayMaskNode.current || !onClick) return;
    overlayMaskNode.current.addEventListener(
      'click',
      (e: React.MouseEvent | MouseEvent) => {
        if (e.target === overlayMaskNode.current) {
          onClick();
        }
      }
    );

    return () => {
      if (overlayMaskNode.current && onClick) {
        overlayMaskNode.current.removeEventListener('click', onClick);
      }
    };
  }, [onClick]);

  useEffect(() => {
    if (!overlayMaskNode.current) return;
    keysOf(rest).forEach(key => {
      if (typeof rest[key] !== 'string') {
        throw new Error(
          `Unhandled property type. EuiOverlayMask property ${key} is not a string.`
        );
      }
      if (overlayMaskNode.current) {
        overlayMaskNode.current.setAttribute(key, rest[key]!);
      }
    });
  }, [rest]);

  return isPortalTargetReady
    ? createPortal(children, overlayMaskNode.current!)
    : null;
};
