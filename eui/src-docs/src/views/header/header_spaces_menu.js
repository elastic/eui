import React, {
  Component,
} from 'react';

import {
  EuiHeaderSectionItemButton,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
  EuiButton,
  EuiAvatar,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="headerSpacesMenuList"
        aria-expanded={this.state.isOpen}
        aria-haspopup="true"
        aria-label="Apps menu"
        onClick={this.onMenuButtonClick}
      >
        <EuiAvatar type="space" size="s" name="Sales Team" />
      </EuiHeaderSectionItemButton>
    );

    const items = [
      (
        <EuiContextMenuItem
          key="Sales Team"
          icon={(<EuiAvatar type="space" name="Sales Team" size="s" />)}
          onClick={() => { this.closeMenu(); }}
        >
          Sales Team
        </EuiContextMenuItem>
      ), (
        <EuiContextMenuItem
          key="Engineering"
          icon={(<EuiAvatar type="space" name="Engineering" size="s" />)}
          onClick={() => { this.closeMenu(); }}
        >
          Engineering
        </EuiContextMenuItem>
      ), (
        <EuiContextMenuItem
          key="Security"
          icon={(<EuiAvatar type="space" name="Security" size="s" initialsLength={2} />)}
          onClick={() => { this.closeMenu(); }}
        >
          Security
        </EuiContextMenuItem>
      ), (
        <div className="euiContextMenuItem">
          <EuiButton size="s" style={{ width: `100%` }}>Manage spaces</EuiButton>
        </div>
      )
    ];

    return (
      <EuiPopover
        id="headerSpacesMenu"
        ownFocus
        button={button}
        isOpen={this.state.isOpen}
        anchorPosition="downLeft"
        closePopover={this.closeMenu}
        panelPaddingSize="none"
      >
        <EuiContextMenuPanel
          id="headerSpacesMenuList"
          title="Change current space"
          items={items}
        />
      </EuiPopover>
    );
  }
}
