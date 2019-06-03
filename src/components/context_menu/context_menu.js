import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiContextMenuPanel } from './context_menu_panel';
import { EuiContextMenuItem } from './context_menu_item';

function mapIdsToPanels(panels) {
  const map = {};

  panels.forEach(panel => {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels) {
  const idToPreviousPanelIdMap = {};

  panels.forEach(panel => {
    if (Array.isArray(panel.items)) {
      panel.items.forEach(item => {
        const isCloseable = item.panel !== undefined;
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

function mapPanelItemsToPanels(panels) {
  const idAndItemIndexToPanelIdMap = {};

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

export const EuiContextMenuPanelItemShape = PropTypes.shape({
  name: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  // If given, shows the panel with this id when clicked:
  panel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
});

export const EuiContextMenuPanelShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number, // Pixel value to set the panel width to
  content: PropTypes.node, // Either content or items array should be given.
  items: PropTypes.arrayOf(EuiContextMenuPanelItemShape),
  title: PropTypes.string,
});

export class EuiContextMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
    panels: PropTypes.arrayOf(EuiContextMenuPanelShape),
    initialPanelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    panels: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { panels } = nextProps;

    if (prevState.prevProps.panels !== panels) {
      return {
        prevProps: { panels },
        idToPanelMap: mapIdsToPanels(panels),
        idToPreviousPanelIdMap: mapIdsToPreviousPanels(panels),
        idAndItemIndexToPanelIdMap: mapPanelItemsToPanels(panels),
      };
    }

    return null;
  }

  constructor(props) {
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

  componentDidUpdate(prevProps) {
    if (prevProps.panels !== this.props.panels) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),
      });
    }
  }

  hasPreviousPanel = panelId => {
    const previousPanelId = this.state.idToPreviousPanelIdMap[panelId];
    return typeof previousPanelId !== 'undefined';
  };

  showPanel(panelId, direction) {
    this.setState({
      outgoingPanelId: this.state.incomingPanelId,
      incomingPanelId: panelId,
      transitionDirection: direction,
      isOutgoingPanelVisible: true,
    });
  }

  showNextPanel = itemIndex => {
    const nextPanelId = this.state.idAndItemIndexToPanelIdMap[
      this.state.incomingPanelId
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
    if (this.hasPreviousPanel(this.state.incomingPanelId)) {
      const previousPanelId = this.state.idToPreviousPanelIdMap[
        this.state.incomingPanelId
      ];

      // Set focus on the item which shows the panel we're leaving.
      const previousPanel = this.state.idToPanelMap[previousPanelId];
      const focusedItemIndex = previousPanel.items.findIndex(
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

  onIncomingPanelHeightChange = height => {
    this.setState(({ height: prevHeight }) => {
      if (height === prevHeight) {
        return null;
      } else {
        return { height };
      }
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

  mapIdsToRenderedItems = panels => {
    const idToRenderedItemsMap = {};

    // Pre-rendering the items lets us check reference equality inside of EuiContextMenuPanel.
    panels.forEach(panel => {
      idToRenderedItemsMap[panel.id] = this.renderItems(panel.items);
    });

    return idToRenderedItemsMap;
  };

  renderItems(items = []) {
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
        ? event => {
            if (onClick && event) {
              event.persist();
            }
            // This component is commonly wrapped in a EuiOutsideClickDetector, which means we'll
            // need to wait for that logic to complete before re-rendering the DOM via showPanel.
            window.requestAnimationFrame(() => {
              if (onClick) onClick(event);
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

  renderPanel(panelId, transitionType) {
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

    const incomingPanel = this.renderPanel(this.state.incomingPanelId, 'in');
    let outgoingPanel;

    if (this.state.isOutgoingPanelVisible) {
      outgoingPanel = this.renderPanel(this.state.outgoingPanelId, 'out');
    }

    const width =
      this.state.idToPanelMap[this.state.incomingPanelId] &&
      this.state.idToPanelMap[this.state.incomingPanelId].width
        ? this.state.idToPanelMap[this.state.incomingPanelId].width
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
