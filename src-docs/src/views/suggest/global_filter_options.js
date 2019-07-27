import React, { Component } from 'react';

import {
  EuiButtonIcon,
  EuiPopover,
  EuiContextMenu,
  EuiPopoverTitle,
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

export default class GlobalFilterOptions extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  togglePopover = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({ isPopoverOpen: false });
  };

  render() {
    const { isPopoverOpen } = this.state;

    const panelTree = {
      id: 0,
      items: [
        {
          name: 'Enable all',
          icon: 'eye',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Disable all',
          icon: 'eyeClosed',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Pin all',
          icon: 'pin',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Unpin all',
          icon: 'pin',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Invert inclusion',
          icon: 'invert',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Invert visibility',
          icon: 'eye',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Remove all',
          icon: 'trash',
          onClick: () => {
            this.closePopover();
          },
        },
      ],
    };

    return (
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={this.closePopover}
        button={
          <EuiButtonIcon
            onClick={this.togglePopover}
            color="text"
            iconType="gear"
            aria-label="Change all filters"
            title="Change all filters"
          />
        }
        anchorPosition="downCenter"
        panelPaddingSize="none"
        withTitle>
        <EuiPopoverTitle>Change all filters</EuiPopoverTitle>
        <EuiContextMenu
          initialPanelId={0}
          panels={flattenPanelTree(panelTree)}
        />
      </EuiPopover>
    );
  }
}
