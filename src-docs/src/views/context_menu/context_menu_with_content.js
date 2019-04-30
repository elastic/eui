import React, { Component } from 'react';

import {
  EuiButton,
  EuiContextMenu,
  EuiIcon,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import EuiTabsExample from '../tabs/tabbed_content';

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

    this.createPanelTree = Content => {
      return flattenPanelTree({
        id: 0,
        title: 'View options',
        items: [
          {
            name: 'Show fullscreen',
            icon: <EuiIcon type="search" size="m" />,
            onClick: () => {
              this.closePopover();
              window.alert('Show fullscreen');
            },
          },
          {
            name: 'See more',
            icon: 'plusInCircle',
            panel: {
              id: 1,
              width: 400,
              title: 'See more',
              content: <Content />,
            },
          },
        ],
      });
    };

    this.panels = this.createPanelTree(() => (
      <EuiText style={{ padding: 24 }} textAlign="center">
        <p>
          <EuiIcon type="faceHappy" size="xxl" />
        </p>

        <h3>Context panels can contain anything</h3>
        <p>
          You can stuff just about anything into these panels. Be mindful of
          size though. This panel is set to 400px and the height will grow as
          space allows.
        </p>
      </EuiText>
    ));

    this.dynamicPanels = this.createPanelTree(EuiTabsExample);
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  onDynamicButtonClick = () => {
    this.setState(prevState => ({
      isDynamicPopoverOpen: !prevState.isDynamicPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  closeDynamicPopover = () => {
    this.setState({
      isDynamicPopoverOpen: false,
    });
  };

  render() {
    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}>
        Click me to load mixed content menu
      </EuiButton>
    );

    const dynamicButton = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onDynamicButtonClick}>
        Click me to load dynamic mixed content menu
      </EuiButton>
    );

    return (
      <React.Fragment>
        <EuiPopover
          id="contextMenu"
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover}
          panelPaddingSize="none"
          withTitle
          anchorPosition="upLeft">
          <EuiContextMenu initialPanelId={0} panels={this.panels} />
        </EuiPopover>

        <EuiSpacer size="l" />

        <EuiPopover
          id="contextMenuDynamic"
          button={dynamicButton}
          isOpen={this.state.isDynamicPopoverOpen}
          closePopover={this.closeDynamicPopover}
          panelPaddingSize="none"
          withTitle
          anchorPosition="upLeft">
          <EuiContextMenu initialPanelId={0} panels={this.dynamicPanels} />
        </EuiPopover>
      </React.Fragment>
    );
  }
}
