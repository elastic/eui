import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiContextMenu,
  EuiIcon,
  EuiPopover,
  EuiPanel,
  EuiCard
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
        name: 'See more',
        icon: 'plusInCircle',
        panel: {
          id: 1,
          title: 'See more',
          content: (
            <EuiPanel>
              <EuiCard
                icon={<EuiIcon size="l" type="bolt" />}
                title="More Details"
                description="This menu demonstrates using panels that have items and panels with content."
              />
            </EuiPanel>
          )
        },
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
        Click me to load mixed content menu
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
        anchorPosition="upLeft"
      >
        <EuiContextMenu
          initialPanelId={0}
          panels={this.panels}
        />
      </EuiPopover>
    );
  }
}
