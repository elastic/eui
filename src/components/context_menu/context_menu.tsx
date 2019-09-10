import React, {
  Component,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';
import {
  EuiContextMenuPanel,
  EuiContextMenuPanelTransitionDirection,
  EuiContextMenuPanelTransitionType,
} from './context_menu_panel';
import {
  EuiContextMenuItem,
  EuiContextMenuItemProps,
} from './context_menu_item';

export type EuiContextMenuPanelId = string | number;

export type EuiContextMenuPanelItemDescriptor = Omit<
  EuiContextMenuItemProps,
  'hasPanel'
> & {
  name: string;
  panel?: EuiContextMenuPanelId;
};

export interface EuiContextMenuPanelDescriptor {
  id: EuiContextMenuPanelId;
  title?: string;
  items?: EuiContextMenuPanelItemDescriptor[];
  content?: ReactNode;
  width?: number;
}

export type EuiContextMenuProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
    panels?: EuiContextMenuPanelDescriptor[];
    initialPanelId?: EuiContextMenuPanelId;
  };

function mapIdsToPanels(panels: EuiContextMenuPanelDescriptor[]) {
  const map: { [id: string]: EuiContextMenuPanelDescriptor } = {};

  panels.forEach(panel => {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels: EuiContextMenuPanelDescriptor[]) {
  const idToPreviousPanelIdMap: { [panel: string]: EuiContextMenuPanelId } = {};

  panels.forEach(panel => {
    if (Array.isArray(panel.items)) {
      panel.items.forEach(item => {
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

  panels.forEach(panel => {
    idAndItemIndexToPanelIdMap[panel.id] = {};

    if (panel.items) {
      panel.items.forEach((item, index) => {
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

export class EuiContextMenu extends Component<EuiContextMenuProps, State> {
  static defaultProps: Partial<EuiContextMenuProps> = {
    panels: [],
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

  constructor(props: EuiContextMenuProps) {
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
      // eslint-disable-next-line react/no-did-update-set-state
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
  }

  showNextPanel = (itemIndex?: number) => {
    if (itemIndex == null) {
      return;
    }

    const nextPanelId = this.state.idAndItemIndexToPanelIdMap[
      this.state.incomingPanelId!
    ][itemIndex];

    if (nextPanelId) {
      if (this.state.isUsingKeyboardToNavigate) {
        this.setState({
          focusedItemIndex: 0,
        });
      }

      this.showPanel(nextPanelId, 'next');
    }
  };

  showPreviousPanel = () => {
    // If there's a previous panel, then we can close the current panel to go back to it.
    if (this.hasPreviousPanel(this.state.incomingPanelId!)) {
      const previousPanelId = this.state.idToPreviousPanelIdMap[
        this.state.incomingPanelId!
      ];

      // Set focus on the item which shows the panel we're leaving.
      const previousPanel = this.state.idToPanelMap[previousPanelId];
      const focusedItemIndex = previousPanel.items!.findIndex(
        item => item.panel === this.state.incomingPanelId
      );

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
    panels.forEach(panel => {
      idToRenderedItemsMap[panel.id] = this.renderItems(panel.items);
    });

    return idToRenderedItemsMap;
  };

  renderItems(items: EuiContextMenuPanelItemDescriptor[] = []) {
    return items.map((item, index) => {
      const {
        panel,
        name,
        icon,
        onClick,
        toolTipTitle,
        toolTipContent,
        ...rest
      } = item;

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
          key={name}
          icon={icon}
          onClick={onClickHandler}
          hasPanel={Boolean(panel)}
          toolTipTitle={toolTipTitle}
          toolTipContent={toolTipContent}
          {...rest}>
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

    return (
      <EuiContextMenuPanel
        key={panelId}
        className="euiContextMenu__panel"
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
        hasFocus={transitionType === 'in'}
        items={this.state.idToRenderedItemsMap[panelId]}
        initialFocusedItemIndex={
          this.state.isUsingKeyboardToNavigate
            ? this.state.focusedItemIndex
            : undefined
        }
        onUseKeyboardToNavigate={this.onUseKeyboardToNavigate}
        showNextPanel={this.showNextPanel}
        showPreviousPanel={this.showPreviousPanel}>
        {panel.content}
      </EuiContextMenuPanel>
    );
  }

  render() {
    const { panels, className, initialPanelId, ...rest } = this.props;

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

    return (
      <div
        className={classes}
        style={{ height: this.state.height, width: width }}
        {...rest}>
        {outgoingPanel}
        {incomingPanel}
      </div>
    );
  }
}
