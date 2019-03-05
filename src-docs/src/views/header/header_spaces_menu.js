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
  EuiHighlight,
  EuiSelectable,
  EuiPopoverTitle,
} from '../../../../src/components';
import { Fragment } from 'react-is';

export default class extends Component {
  constructor(props) {
    super(props);

    this.spaces = [
      {
        label: 'Sales team',
        checked: 'on'
      },
      {
        label: 'Engineering',
      },
      {
        label: 'Security',
      },
      {
        label: 'Default',
      },
    ];

    this.additionalSpaces = [
      {
        label: 'Sales team 2',
      },
      {
        label: 'Engineering 2',
      },
      {
        label: 'Security 2',
      },
      {
        label: 'Default 2',
      },
    ];

    this.state = {
      spaces: this.spaces,
      isOpen: false,
      selectedSpaces: [this.spaces[0]],
    };
  }

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
      isOpen: false,
    });
  };

  addMoreSpaces = () => {
    this.setState({
      spaces: this.spaces.concat(this.additionalSpaces),
    });
  }


  renderSpace = (space, searchTerm) => {
    const { label } = space;
    return (
      <Fragment key={label}>
        <EuiAvatar type="space" name={label} size="s" />
        &emsp;
        <EuiHighlight search={searchTerm}>
          {label}
        </EuiHighlight>
      </Fragment>
    );
  }

  render() {
    const { selectedSpaces, isOpen, spaces } = this.state;

    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="headerSpacesMenuList"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Apps menu"
        onClick={this.onMenuButtonClick}
      >
        <EuiAvatar type="space" size="s" name="Sales Team" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id="headerSpacesMenu"
        ownFocus
        button={button}
        isOpen={isOpen}
        anchorPosition="downLeft"
        closePopover={this.closeMenu}
        panelPaddingSize="none"
      >
        <EuiSelectable
          searchable
          searchProps={{
            placeholder: 'Find a space',
            compressed: true,
          }}
          options={spaces}
          selectedOptions={selectedSpaces}
          singleSelection
          style={{ width: 300 }}
          onChange={this.onChange}
          renderOption={this.renderSpace}
          listProps={{
            rowHeight: 40,
          }}
        >
          {(search, list) => (
            <Fragment>
              <EuiPopoverTitle>{search}</EuiPopoverTitle>
              {list}
              <EuiPopoverTitle>
                <EuiButton size="s" fullWidth onClick={this.addMoreSpaces}>
                  Add more spaces
                </EuiButton>
              </EuiPopoverTitle>
            </Fragment>
          )}
        </EuiSelectable>
      </EuiPopover>
    );
  }
}
