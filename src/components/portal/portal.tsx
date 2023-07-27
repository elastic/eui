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

import { Component, ContextType, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { EuiNestedThemeContext } from '../../services';
import { keysOf } from '../common';

interface InsertPositionsMap {
  after: InsertPosition;
  before: InsertPosition;
}

export const insertPositions: InsertPositionsMap = {
  after: 'afterend',
  before: 'beforebegin',
};

type EuiPortalInsertPosition = keyof typeof insertPositions;

export const INSERT_POSITIONS: EuiPortalInsertPosition[] =
  keysOf(insertPositions);

export interface EuiPortalProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  insert?: { sibling: HTMLElement; position: 'before' | 'after' };
  portalRef?: (ref: HTMLDivElement | null) => void;
}

interface EuiPortalState {
  portalNode: HTMLDivElement | null;
}

export class EuiPortal extends Component<EuiPortalProps, EuiPortalState> {
  static contextType = EuiNestedThemeContext;
  declare context: ContextType<typeof EuiNestedThemeContext>;

  constructor(props: EuiPortalProps) {
    super(props);

    this.state = {
      portalNode: null,
    };
  }

  componentDidMount() {
    if (typeof window === 'undefined') return; // Prevent SSR errors

    const { insert } = this.props;

    const portalNode = document.createElement('div');
    portalNode.dataset.euiportal = 'true';

    if (insert == null) {
      // no insertion defined, append to body
      document.body.appendChild(portalNode);
    } else {
      // inserting before or after an element
      const { sibling, position } = insert;
      sibling.insertAdjacentElement(insertPositions[position], portalNode);
    }

    this.setThemeColor(portalNode);
    this.updatePortalRef(portalNode);

    this.setState({
      portalNode,
    });
  }

  componentWillUnmount() {
    const { portalNode } = this.state;
    if (portalNode?.parentNode) {
      portalNode.parentNode.removeChild(portalNode);
    }
    this.updatePortalRef(null);
  }

  // Set the inherited color of the portal based on the wrapping EuiThemeProvider
  private setThemeColor(portalNode: HTMLDivElement) {
    if (this.context) {
      const { hasDifferentColorFromGlobalTheme, colorClassName } = this.context;

      if (hasDifferentColorFromGlobalTheme && this.props.insert == null) {
        portalNode.classList.add(colorClassName);
      }
    }
  }

  private updatePortalRef(ref: HTMLDivElement | null) {
    if (this.props.portalRef) {
      this.props.portalRef(ref);
    }
  }

  render() {
    const { portalNode } = this.state;

    if (!portalNode) {
      return null;
    }

    return createPortal(this.props.children, portalNode);
  }
}
