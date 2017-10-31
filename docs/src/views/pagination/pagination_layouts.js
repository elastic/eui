import React, {
  Component,
} from 'react';

import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPagination,
  EuiPopover,
} from '../../../../src/components';

function convertPanelTreeToMap(panel, map = {}) {
  if (panel) {
    map[panel.id] = panel;

    if (panel.items) {
      panel.items.forEach(item => convertPanelTreeToMap(item.panel, map));
    }
  }

  return map;
}

function extractPreviousIds(panels) {
  const idToPreviousPanelIdMap = {};

  Object.keys(panels).forEach(panelId => {
    const panel = panels[panelId];
    if (Array.isArray(panel.items)) {
      panel.items.forEach(item => {
        const isCloseable = Boolean(item.panel);
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel.id] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      activePage: 0,
    };

    const panelTree = {
      id: 0,
      items: [{
        name: '10 rows',
        icon: 'empty',
        onClick: () => window.alert('10 rows'),
      }, {
        name: '20 rows',
        icon: 'empty',
        onClick: () => window.alert('20 rows'),
      }, {
        name: '50 rows',
        icon: 'check',
        onClick: () => window.alert('50 rows'),
      }, {
        name: '100 rows',
        icon: 'empty',
        onClick: () => window.alert('100 rows'),
      }],
    };

    this.PAGE_COUNT = 10;
    this.idToPanelMap = convertPanelTreeToMap(panelTree);
    this.idToPreviousPanelIdMap = extractPreviousIds(this.idToPanelMap);
  }

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  goToPage = pageNumber => {
    this.setState({
      activePage: pageNumber,
    });
  }

  render() {
    const button = (
      <EuiButtonEmpty size="s" color="text" iconType="arrowDown" iconSide="right" onClick={this.onButtonClick.bind(this)}>
        Rows per page: 50
      </EuiButtonEmpty>
    );

    const items = [(
      <EuiContextMenuItem
        key="10 rows"
        icon="empty"
        onClick={() => { this.closePopover(); window.alert('10 rows'); }}
      >
        10 rows
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="20 rows"
        icon="empty"
        onClick={() => { this.closePopover(); window.alert('20 rows'); }}
      >
        20 rows
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="50 rows"
        icon="check"
        onClick={() => { this.closePopover(); window.alert('50 rows'); }}
      >
        50 rows
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="100 rows"
        icon="empty"
        onClick={() => { this.closePopover(); window.alert('100 rows'); }}
      >
        100 rows
      </EuiContextMenuItem>
    )];

    return (
      <div>
        <EuiHorizontalRule />

        <EuiFlexGroup justifyContent="spaceAround">
          <EuiFlexItem grow={false}>
            <EuiPagination
              pageCount={this.PAGE_COUNT}
              activePage={this.state.activePage}
              onPageClick={this.goToPage}
            />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiHorizontalRule />

        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiPopover
              button={button}
              isOpen={this.state.isPopoverOpen}
              closePopover={this.closePopover.bind(this)}
              panelPaddingSize="none"
              withTitle
            >
              <EuiContextMenuPanel
                items={items}
              />
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPagination
              pageCount={this.PAGE_COUNT}
              activePage={this.state.activePage}
              onPageClick={this.goToPage}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}
