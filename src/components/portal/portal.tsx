/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { keysOf } from '../common';

interface InsertPositionsMap {
  after: InsertPosition;
  before: InsertPosition;
}

export const insertPositions: InsertPositionsMap = {
  after: 'afterend',
  before: 'beforebegin',
};

export const INSERT_POSITIONS: EuiPortalInsertPosition[] = keysOf(
  insertPositions
);

type EuiPortalInsertPosition = keyof typeof insertPositions;

interface EuiPortalProps {
  children: React.ReactNode;
  insert?: { sibling: HTMLElement; position: EuiPortalInsertPosition };
  portalRef?: (ref: HTMLDivElement | null) => void;
}

export class EuiPortal extends React.Component<EuiPortalProps> {
  portalNode: HTMLDivElement;
  constructor(props: EuiPortalProps) {
    super(props);

    const { insert } = this.props;

    this.portalNode = document.createElement('div');

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
    this.updatePortalRef(this.portalNode);
  }

  componentWillUnmount() {
    if (this.portalNode.parentNode) {
      this.portalNode.parentNode.removeChild(this.portalNode);
    }
    this.updatePortalRef(null);
  }

  updatePortalRef(ref: HTMLDivElement | null) {
    if (this.props.portalRef) {
      this.props.portalRef(ref);
    }
  }

  render() {
    return createPortal(this.props.children, this.portalNode);
  }
}
