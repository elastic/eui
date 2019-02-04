import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiSwitch,
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
    const otherLocale = this.props.selectedLocale === 'en' ? 'en-xa' : 'en';

    return (
      <EuiSwitch
        label="pseudo translation"
        checked={this.props.selectedLocale === 'en-xa'}
        onChange={() => this.props.onToggleLocale(otherLocale)}
        compressed={true}
      />
    );
  }
}

GuideLocaleSelector.propTypes = {
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
};
