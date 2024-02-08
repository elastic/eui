/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  HTMLAttributes,
  CSSProperties,
  ReactElement,
  ReactNode,
  Fragment,
} from 'react';
import classNames from 'classnames';

import { withEuiTheme, WithEuiThemeProps } from '../../services';
import { CommonProps, ExclusiveUnion } from '../common';
import { EuiHorizontalRule, EuiHorizontalRuleProps } from '../horizontal_rule';

import {
  EuiContextMenuPanel,
  EuiContextMenuPanelTransitionDirection,
  EuiContextMenuPanelTransitionType,
} from './context_menu_panel';
import {
  EuiContextMenuItem,
  EuiContextMenuItemProps,
} from './context_menu_item';
import { euiContextMenuStyles } from './context_menu.styles';

export type EuiContextMenuPanelId = string | number;

export type EuiContextMenuPanelItemDescriptorEntry = Omit<
  EuiContextMenuItemProps,
  'hasPanel'
> & {
  name: React.ReactNode;
  key?: string;
  panel?: EuiContextMenuPanelId;
};

export interface EuiContextMenuPanelItemSeparator
  extends EuiHorizontalRuleProps {
  isSeparator: true;
  key?: string;
}

export type EuiContextMenuPanelItemRenderCustom = {
  /**
   * Allows rendering any custom content alongside your array of context menu items.
   * Accepts either a component or an inline function component that returns any JSX.
   */
  renderItem: (() => ReactNode) | Function;
  key?: string;
};

export type EuiContextMenuPanelItemDescriptor = ExclusiveUnion<
  ExclusiveUnion<
    EuiContextMenuPanelItemDescriptorEntry,
    EuiContextMenuPanelItemSeparator
  >,
  EuiContextMenuPanelItemRenderCustom
>;

export interface EuiContextMenuPanelDescriptor {
  id: EuiContextMenuPanelId;
  title?: ReactNode;
  items?: EuiContextMenuPanelItemDescriptor[];
  content?: ReactNode;
  width?: CSSProperties['width'];
  initialFocusedItemIndex?: number;
  /**
   * Alters the size of the items and the title
   */
  size?: (typeof SIZES)[number];
}

export const SIZES = ['s', 'm'] as const;

export type EuiContextMenuProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
    panels?: EuiContextMenuPanelDescriptor[];
    /**
     * Optional callback that fires on every panel change. Passes back
     * the new panel ID and whether its direction was `next` or `previous`.
     */
    onPanelChange?: (panelDetails: {
      panelId: EuiContextMenuPanelId;
      direction?: EuiContextMenuPanelTransitionDirection;
    }) => void;
    initialPanelId?: EuiContextMenuPanelId;
    /**
     * Alters the size of the items and the title
     */
    size?: (typeof SIZES)[number];
  };

const isItemSeparator = (
  item: EuiContextMenuPanelItemDescriptor
): item is EuiContextMenuPanelItemSeparator =>
  (item as EuiContextMenuPanelItemSeparator).isSeparator === true;

function mapIdsToPanels(panels: EuiContextMenuPanelDescriptor[]) {
  const map: { [id: string]: EuiContextMenuPanelDescriptor } = {};

  panels.forEach((panel) => {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels: EuiContextMenuPanelDescriptor[]) {
  const idToPreviousPanelIdMap: { [panel: string]: EuiContextMenuPanelId } = {};

  panels.forEach((panel) => {
    if (Array.isArray(panel.items)) {
      panel.items.forEach((item) => {
        if (isItemSeparator(item)) return;
        const isCloseable = item.panel !== undefined;
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel!] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

function mapPanelItemsToPanels(panels: EuiContextMenuPanelDescriptor[]) {
  const idAndItemIndexToPanelIdMap: {
    [id: string]: { [index: string]: EuiContextMenuPanelId };
  } = {};

  panels.forEach((panel) => {
    idAndItemIndexToPanelIdMap[panel.id] = {};

    if (panel.items) {
      panel.items.forEach((item, index) => {
        if (isItemSeparator(item)) return;
        if (item.panel) {
          idAndItemIndexToPanelIdMap[panel.id][index] = item.panel;
        }
      });
    }
  });

  return idAndItemIndexToPanelIdMap;
}

interface State {
  prevProps: {
    panels?: EuiContextMenuPanelDescriptor[];
  };
  idToPanelMap: { [id: string]: EuiContextMenuPanelDescriptor };
  idToPreviousPanelIdMap: { [panel: string]: EuiContextMenuPanelId };
  idAndItemIndexToPanelIdMap: {
    [id: string]: { [index: string]: EuiContextMenuPanelId };
  };
  idToRenderedItemsMap: { [id: string]: ReactElement[] };

  height?: number;
  outgoingPanelId?: EuiContextMenuPanelId;
  incomingPanelId?: EuiContextMenuPanelId;
  transitionDirection?: EuiContextMenuPanelTransitionDirection;
  isOutgoingPanelVisible: boolean;
  focusedItemIndex?: number;
  isUsingKeyboardToNavigate: boolean;
}

export class EuiContextMenuClass extends Component<
  WithEuiThemeProps & EuiContextMenuProps,
  State
> {
  static defaultProps: Partial<EuiContextMenuProps> = {
    panels: [],
    size: 'm',
  };

  static getDerivedStateFromProps(
    nextProps: EuiContextMenuProps,
    prevState: State
  ): Partial<State> | null {
    const { panels } = nextProps;

    if (panels && prevState.prevProps.panels !== panels) {
      return {
        prevProps: { panels },
        idToPanelMap: mapIdsToPanels(panels),
        idToPreviousPanelIdMap: mapIdsToPreviousPanels(panels),
        idAndItemIndexToPanelIdMap: mapPanelItemsToPanels(panels),
      };
    }

    return null;
  }

  constructor(props: WithEuiThemeProps & EuiContextMenuProps) {
    super(props);

    this.state = {
      prevProps: {},
      idToPanelMap: {},
      idToPreviousPanelIdMap: {},
      idAndItemIndexToPanelIdMap: {},
      idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),

      height: undefined,
      outgoingPanelId: undefined,
      incomingPanelId: props.initialPanelId,
      transitionDirection: undefined,
      isOutgoingPanelVisible: false,
      focusedItemIndex: undefined,
      isUsingKeyboardToNavigate: false,
    };
  }

  componentDidUpdate(prevProps: EuiContextMenuProps) {
    if (prevProps.panels !== this.props.panels) {
      this.setState({
        idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),
      });
    }
  }

  hasPreviousPanel = (panelId: EuiContextMenuPanelId) => {
    const previousPanelId = this.state.idToPreviousPanelIdMap[panelId];
    return typeof previousPanelId !== 'undefined';
  };

  showPanel(
    panelId: EuiContextMenuPanelId,
    direction?: EuiContextMenuPanelTransitionDirection
  ) {
    this.setState({
      outgoingPanelId: this.state.incomingPanelId,
      incomingPanelId: panelId,
      transitionDirection: direction,
      isOutgoingPanelVisible: true,
    });

    this.props.onPanelChange?.({ panelId, direction });
  }

  showNextPanel = (itemIndex?: number) => {
    if (itemIndex == null) {
      return;
    }

    const nextPanelId =
      this.state.idAndItemIndexToPanelIdMap[this.state.incomingPanelId!][
        itemIndex
      ];

    if (nextPanelId) {
      if (this.state.isUsingKeyboardToNavigate) {
        this.setState(({ idToPanelMap }) => ({
          focusedItemIndex: idToPanelMap[nextPanelId].initialFocusedItemIndex,
        }));
      }

      this.showPanel(nextPanelId, 'next');
    }
  };

  showPreviousPanel = () => {
    // If there's a previous panel, then we can close the current panel to go back to it.
    if (this.hasPreviousPanel(this.state.incomingPanelId!)) {
      const previousPanelId =
        this.state.idToPreviousPanelIdMap[this.state.incomingPanelId!];

      // Set focus on the item which shows the panel we're leaving.
      const previousPanel = this.state.idToPanelMap[previousPanelId];
      const focusedItemIndex = previousPanel
        .items!.filter((item) => !isItemSeparator(item))
        .findIndex((item) => item.panel === this.state.incomingPanelId);

      if (focusedItemIndex !== -1) {
        this.setState({
          focusedItemIndex,
        });
      }

      this.showPanel(previousPanelId, 'previous');
    }
  };

  onIncomingPanelHeightChange = (height: number) => {
    this.setState(({ height: prevHeight }) => {
      if (height === prevHeight) {
        return null;
      }

      return { height };
    });
  };

  onOutGoingPanelTransitionComplete = () => {
    this.setState({
      isOutgoingPanelVisible: false,
    });
  };

  onUseKeyboardToNavigate = () => {
    if (!this.state.isUsingKeyboardToNavigate) {
      this.setState({
        isUsingKeyboardToNavigate: true,
      });
    }
  };

  mapIdsToRenderedItems = (panels: EuiContextMenuPanelDescriptor[] = []) => {
    const idToRenderedItemsMap: { [id: string]: ReactElement[] } = {};

    // Pre-rendering the items lets us check reference equality inside of EuiContextMenuPanel.
    panels.forEach((panel) => {
      idToRenderedItemsMap[panel.id] = this.renderItems(panel.items);
    });

    return idToRenderedItemsMap;
  };

  renderItems(items: EuiContextMenuPanelItemDescriptor[] = []) {
    return items.map((item, index) => {
      if (item.renderItem) {
        return <Fragment key={item.key ?? index}>{item.renderItem()}</Fragment>;
      }

      if (isItemSeparator(item)) {
        const { isSeparator: omit, key = index, ...rest } = item;
        return <EuiHorizontalRule key={key} margin="none" {...rest} />;
      }

      const { panel, name, key, icon, onClick, ...rest } = item;

      const onClickHandler = panel
        ? (event: React.MouseEvent) => {
            if (onClick && event) {
              event.persist();
            }
            // This component is commonly wrapped in a EuiOutsideClickDetector, which means we'll
            // need to wait for that logic to complete before re-rendering the DOM via showPanel.
            window.requestAnimationFrame(() => {
              if (onClick) {
                onClick(event);
              }
              this.showNextPanel(index);
            });
          }
        : onClick;

      return (
        <EuiContextMenuItem
          key={key || (typeof name === 'string' ? name : undefined) || index}
          icon={icon}
          onClick={onClickHandler}
          hasPanel={Boolean(panel)}
          {...rest}
        >
          {name}
        </EuiContextMenuItem>
      );
    });
  }

  renderPanel(
    panelId: EuiContextMenuPanelId,
    transitionType: EuiContextMenuPanelTransitionType
  ) {
    const panel = this.state.idToPanelMap[panelId];

    if (!panel) {
      return;
    }

    // As above, we need to wait for EuiOutsideClickDetector to complete its logic before
    // re-rendering via showPanel.
    let onClose;
    if (this.hasPreviousPanel(panelId)) {
      onClose = () => window.requestAnimationFrame(this.showPreviousPanel);
    }

    const cssStyles = {
      position: 'absolute' as const,
      label: 'euiContextMenu__panel',
    };

    return (
      <EuiContextMenuPanel
        key={panelId}
        size={this.props.size}
        css={cssStyles}
        onHeightChange={
          transitionType === 'in' ? this.onIncomingPanelHeightChange : undefined
        }
        onTransitionComplete={
          transitionType === 'out'
            ? this.onOutGoingPanelTransitionComplete
            : undefined
        }
        title={panel.title}
        onClose={onClose}
        transitionType={
          this.state.isOutgoingPanelVisible ? transitionType : undefined
        }
        transitionDirection={
          this.state.isOutgoingPanelVisible
            ? this.state.transitionDirection
            : undefined
        }
        items={this.state.idToRenderedItemsMap[panelId]}
        initialFocusedItemIndex={
          this.state.isUsingKeyboardToNavigate
            ? this.state.focusedItemIndex
            : panel.initialFocusedItemIndex
        }
        onUseKeyboardToNavigate={this.onUseKeyboardToNavigate}
        showNextPanel={this.showNextPanel}
        showPreviousPanel={this.showPreviousPanel}
      >
        {panel.content}
      </EuiContextMenuPanel>
    );
  }

  render() {
    const {
      theme,
      panels,
      onPanelChange,
      className,
      initialPanelId,
      size,
      ...rest
    } = this.props;

    const incomingPanel = this.renderPanel(this.state.incomingPanelId!, 'in');
    let outgoingPanel;

    if (this.state.isOutgoingPanelVisible) {
      outgoingPanel = this.renderPanel(this.state.outgoingPanelId!, 'out');
    }

    const width =
      this.state.idToPanelMap[this.state.incomingPanelId!] &&
      this.state.idToPanelMap[this.state.incomingPanelId!].width
        ? this.state.idToPanelMap[this.state.incomingPanelId!].width
        : undefined;

    const classes = classNames('euiContextMenu', className);

    const styles = euiContextMenuStyles(theme);
    const cssStyles = [styles.euiContextMenu];

    return (
      <div
        css={cssStyles}
        className={classes}
        style={{ height: this.state.height, width: width }}
        {...rest}
      >
        {outgoingPanel}
        {incomingPanel}
      </div>
    );
  }
}

export const EuiContextMenu =
  withEuiTheme<EuiContextMenuProps>(EuiContextMenuClass);
