import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
} from '../../../../src/components';

export class GuideThemeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isThemePopoverOpen: false,
    };
  }

  onThemeButtonClick = () => {
    this.setState({
      isThemePopoverOpen: !this.state.isThemePopoverOpen,
    });
  };

  closeThemePopover = () => {
    this.setState({
      isThemePopoverOpen: false,
    });
  };

  render() {
    const themeButton = (
      <EuiButtonEmpty
        size="s"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onThemeButtonClick}
      >
        Theme
      </EuiButtonEmpty>
    );

    const themeOptions = [{
      name: 'Light',
      value: 'light',
    }, {
      name: 'Dark',
      value: 'dark',
    }, {
      name: 'K6',
      value: 'k6',
    }, {
      name: 'K6 dark',
      value: 'k6_dark',
    }].map(option => {
      const { name, value } = option;

      return (
        <EuiContextMenuItem
          key={value}
          icon={value === this.props.selectedTheme ? 'check' : 'empty'}
          onClick={() => { this.closeThemePopover(); this.props.onToggleTheme(value); }}
        >
          {`${name}`}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiPopover
        id="pageChromeThemePopover"
        button={themeButton}
        isOpen={this.state.isThemePopoverOpen}
        closePopover={this.closeThemePopover}
        panelPaddingSize="none"
        anchorPosition="downRight"
      >
        <EuiContextMenuPanel
          style={{ width: '120px' }}
          items={themeOptions}
        />
      </EuiPopover>
    );
  }
}

GuideThemeSelector.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
};
