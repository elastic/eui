import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
} from '../../../../src/components';

export class GuideLocaleSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocalePopoverOpen: false,
    };
  }

  onLocaleButtonClick = () => {
    this.setState({
      isLocalePopoverOpen: !this.state.isLocalePopoverOpen,
    });
  };

  closeLocalePopover = () => {
    this.setState({
      isLocalePopoverOpen: false,
    });
  };

  render() {
    const localeButton = (
      <EuiButtonEmpty
        size="s"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onLocaleButtonClick}
        aria-label="Select a locale"
      >
        <span className="guideSideNav__locale">{this.props.selectedLocale}</span>
      </EuiButtonEmpty>
    );

    const localeOptions = [{
      name: 'English',
      value: 'en',
    }, {
      name: 'Pseudo-English',
      value: 'en-xa',
    }].map(option => {
      const { name, value } = option;

      return (
        <EuiContextMenuItem
          key={value}
          icon={value === this.props.selectedLocale ? 'check' : 'empty'}
          onClick={() => { this.closeLocalePopover(); this.props.onToggleLocale(value); }}
        >
          {`${name}`}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiPopover
        id="pageChromeLocalePopover"
        button={localeButton}
        isOpen={this.state.isLocalePopoverOpen}
        closePopover={this.closeLocalePopover}
        panelPaddingSize="none"
        anchorPosition="downRight"
      >
        <EuiContextMenuPanel
          style={{ width: '60px' }}
          items={localeOptions}
        />
      </EuiPopover>
    );
  }
}

GuideLocaleSelector.propTypes = {
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
};
