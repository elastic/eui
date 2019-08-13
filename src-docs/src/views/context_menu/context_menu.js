import React, { Component } from 'react';

import {
  EuiButton,
  EuiContextMenu,
  EuiFormRow,
  EuiIcon,
  EuiPopover,
  EuiSwitch,
  EuiSpacer,
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
      title: 'This is a context menu',
      items: [
        {
          name: 'Handle an onClick',
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            this.closePopover();
            window.alert('Show fullscreen');
          },
        },
        {
          name: 'Go to a link',
          icon: 'user',
          href: 'http://elastic.co',
          target: '_blank',
        },
        {
          name: 'Nest panels',
          icon: 'user',
          panel: {
            id: 1,
            title: 'Nest panels',
            items: [
              {
                name: 'PDF reports',
                icon: 'user',
                onClick: () => {
                  this.closePopover();
                  window.alert('PDF reports');
                },
              },
              {
                name: 'Embed code',
                icon: 'user',
                panel: {
                  id: 2,
                  title: 'Embed code',
                  content: (
                    <div style={{ padding: 16 }}>
                      <EuiFormRow label="Generate a public snapshot?">
                        <EuiSwitch
                          name="switch"
                          id="asdf"
                          label="Snapshot data"
                        />
                      </EuiFormRow>
                      <EuiFormRow label="Include the following in the embed">
                        <EuiSwitch
                          name="switch"
                          id="asdf2"
                          label="Current time range"
                        />
                      </EuiFormRow>
                      <EuiSpacer />
                      <EuiButton fill>Copy iFrame code</EuiButton>
                    </div>
                  ),
                },
              },
              {
                name: 'Permalinks',
                icon: 'user',
                onClick: () => {
                  this.closePopover();
                  window.alert('Permalinks');
                },
              },
            ],
          },
        },
        {
          name: 'You can add a tooltip',
          icon: 'user',
          toolTipTitle: 'Optional tooltip',
          toolTipContent: 'Optional content for a tooltip',
          toolTipPosition: 'right',
          onClick: () => {
            this.closePopover();
            window.alert('Display options');
          },
        },
        {
          name: 'Disabled option',
          icon: 'user',
          toolTipContent: 'For reasons, this item is disabled',
          toolTipPosition: 'right',
          disabled: true,
          onClick: () => {
            this.closePopover();
            window.alert('Disabled option');
          },
        },
      ],
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
        onClick={this.onButtonClick}>
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
        anchorPosition="downLeft">
        <EuiContextMenu initialPanelId={0} panels={this.panels} />
      </EuiPopover>
    );
  }
}
