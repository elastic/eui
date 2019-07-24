import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EuiSelect, EuiFormRow } from '../../../../src/components';

export class GuideThemeSelector extends Component {
  constructor(props) {
    super(props);

    this.themeOptions = [
      {
        text: 'Light',
        value: 'light',
      },
      {
        text: 'Dark',
        value: 'dark',
      },
    ];

    this.state = {
      value: this.themeOptions[0].value,
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <EuiFormRow label="Theme">
        <EuiSelect
          options={this.themeOptions}
          value={this.props.selectedTheme}
          onChange={e => {
            this.props.onToggleTheme(e.target.value);
          }}
          aria-label="Switch the theme"
        />
      </EuiFormRow>
    );
  }
}

GuideThemeSelector.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
};
