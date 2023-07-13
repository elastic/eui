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

import React, { Component, FunctionComponent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { EuiNestedThemeContext } from '../../services';
import { useEuiComponentDefaults } from '../provider/component_defaults';

const INSERT_POSITIONS = ['after', 'before'] as const;
type EuiPortalInsertPosition = (typeof INSERT_POSITIONS)[number];
const insertPositions: Record<EuiPortalInsertPosition, InsertPosition> = {
  after: 'afterend',
  before: 'beforebegin',
};

export interface EuiPortalProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * If not specified, `EuiPortal` will insert itself
   * into the end of the `document.body` by default
   */
  insert?: { sibling: HTMLElement; position: EuiPortalInsertPosition };
  /**
   * Optional ref callback
   */
  portalRef?: (ref: HTMLDivElement | null) => void;
}

export const EuiPortal: FunctionComponent<EuiPortalProps> = ({
  children,
  ...props
}) => {
  const { EuiPortal: defaults } = useEuiComponentDefaults();
  return (
    <EuiPortalClass {...defaults} {...props}>
      {children}
    </EuiPortalClass>
  );
};

export class EuiPortalClass extends Component<EuiPortalProps> {
  static contextType = EuiNestedThemeContext;

  portalNode: HTMLDivElement | null = null;

  constructor(props: EuiPortalProps) {
    super(props);
    if (typeof window === 'undefined') return; // Prevent SSR errors

    const { insert } = this.props;

    this.portalNode = document.createElement('div');
    this.portalNode.dataset.euiportal = 'true';

    if (insert == null) {
      // no insertion defined, append to body
      document.body.appendChild(this.portalNode);
    } else {
      // inserting before or after an element
      const { sibling, position } = insert;
      sibling.insertAdjacentElement(insertPositions[position], this.portalNode);
    }
  }

  componentDidMount() {
    this.setThemeColor();
    this.updatePortalRef(this.portalNode);
  }

  componentWillUnmount() {
    if (this.portalNode?.parentNode) {
      this.portalNode.parentNode.removeChild(this.portalNode);
    }
    this.updatePortalRef(null);
  }

  // Set the inherited color of the portal based on the wrapping EuiThemeProvider
  private setThemeColor() {
    if (this.portalNode && this.context) {
      const { hasDifferentColorFromGlobalTheme, colorClassName } = this.context;

      if (hasDifferentColorFromGlobalTheme && this.props.insert == null) {
        this.portalNode.classList.add(colorClassName);
      }
    }
  }

  private updatePortalRef(ref: HTMLDivElement | null) {
    if (this.props.portalRef) {
      this.props.portalRef(ref);
    }
  }

  render() {
    return this.portalNode
      ? createPortal(this.props.children, this.portalNode)
      : null;
  }
}
