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

import { Component, HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export interface EuiOverlayMaskProps {
  onClick?: () => void;
  children?: ReactNode;
}

export type Props = CommonProps &
  Omit<
    Partial<Record<keyof HTMLAttributes<HTMLDivElement>, string>>,
    keyof EuiOverlayMaskProps
  > &
  EuiOverlayMaskProps;

export class EuiOverlayMask extends Component<Props> {
  private overlayMaskNode?: HTMLDivElement;

  constructor(props: Props) {
    super(props);

    const { className, children, onClick, ...rest } = this.props;

    this.overlayMaskNode = document.createElement('div');
    this.overlayMaskNode.className = classNames('euiOverlayMask', className);
    if (onClick) {
      this.overlayMaskNode.addEventListener(
        'click',
        (e: React.MouseEvent | MouseEvent) => {
          if (e.target === this.overlayMaskNode) {
            onClick();
          }
        }
      );
    }
    keysOf(rest).forEach(key => {
      if (typeof rest[key] !== 'string') {
        throw new Error(
          `Unhandled property type. EuiOverlayMask property ${key} is not a string.`
        );
      }
      this.overlayMaskNode!.setAttribute(key, rest[key]!);
    });

    document.body.appendChild(this.overlayMaskNode);
  }

  componentDidMount() {
    document.body.classList.add('euiBody-hasOverlayMask');
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasOverlayMask');

    if (this.props.onClick) {
      this.overlayMaskNode!.removeEventListener('click', this.props.onClick);
    }
    document.body.removeChild(this.overlayMaskNode!);
    this.overlayMaskNode = undefined;
  }

  render() {
    return createPortal(this.props.children, this.overlayMaskNode!);
  }
}
