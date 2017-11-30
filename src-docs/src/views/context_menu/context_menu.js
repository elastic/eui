import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiContextMenu,
  EuiFormRow,
  EuiIcon,
  EuiPopover,
  EuiSwitch,
} from '../../../../src/components';

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach(item => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };

    const panelTree = {
      id: 0,
      title: 'View options',
      items: [{
        name: 'Show fullscreen',
        icon: (
          <EuiIcon
            type="search"
            size="m"
          />
        ),
        onClick: () => { this.closePopover(); window.alert('Show fullscreen'); },
      }, {
        name: 'Share this dashboard',
        icon: 'user',
        panel: {
          id: 1,
          title: 'Share this dashboard',
          items: [{
            name: 'PDF reports',
            icon: 'user',
            onClick: () => { this.closePopover(); window.alert('PDF reports'); },
          }, {
            name: 'CSV reports',
            icon: 'user',
            onClick: () => { this.closePopover(); window.alert('CSV reports'); },
          }, {
            name: 'Embed code',
            icon: 'user',
            panel: {
              id: 2,
              title: 'Embed code',
              content: (
                <div style={{ padding: 16 }}>
                  <EuiFormRow
                    label="Generate a public snapshot?"
                  >
                    <EuiSwitch
                      name="switch"
                      id="asdf"
                      label="Snapshot data"
                    />
                  </EuiFormRow>
                  <EuiFormRow
                    label="Include the following in the embed"
                  >
                    <EuiSwitch
                      name="switch"
                      id="asdf2"
                      label="Current time range"
                    />
                  </EuiFormRow>
                  <EuiButton fill>Copy iFrame code</EuiButton>
                </div>
              ),
            },
          }, {
            name: 'Permalinks',
            icon: 'user',
            onClick: () => { this.closePopover(); window.alert('Permalinks'); },
          }],
        },
      }, {
        name: 'Edit / add panels',
        icon: 'user',
        onClick: () => { this.closePopover(); window.alert('Edit / add panels'); },
      }, {
        name: 'Display options',
        icon: 'user',
        onClick: () => { this.closePopover(); window.alert('Display options'); },
      }, {
        name: 'Disabled option',
        icon: 'user',
        disabled: true,
        onClick: () => { this.closePopover(); window.alert('Disabled option'); },
      }],
    };

    this.panels = flattenPanelTree(panelTree);
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}
      >
        Click me to load a context menu
      </EuiButton>
    );

    return (
      <EuiPopover
        id="contextMenu"
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        withTitle
        anchorPosition="downLeft"
      >
        <EuiContextMenu
          initialPanelId={0}
          panels={this.panels}
        />
      </EuiPopover>
    );
  }
}
