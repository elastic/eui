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
  Component,
  ContextType,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { EuiNestedThemeContext } from '../../services';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';

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

export const EuiPortal: FunctionComponent<EuiPortalProps> = (props) => {
  const propsWithDefaults = usePropsWithComponentDefaults('EuiPortal', props);
  return <EuiPortalClass {...propsWithDefaults} />;
};

interface EuiPortalState {
  portalNode: HTMLDivElement | null;
}

export class EuiPortalClass extends Component<EuiPortalProps, EuiPortalState> {
  static contextType = EuiNestedThemeContext;
  declare context: ContextType<typeof EuiNestedThemeContext>;

  constructor(props: EuiPortalProps) {
    super(props);

    this.state = {
      portalNode: null,
    };
  }

  componentDidMount() {
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

    // Update state with portalNode to intentionally trigger component rerender
    // and call createPortal with correct root element in render()
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
