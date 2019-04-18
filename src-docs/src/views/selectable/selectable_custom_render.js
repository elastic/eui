import React, { Component, Fragment } from 'react';

import { EuiBadge, EuiHighlight, EuiSpacer, EuiTextColor, EuiSwitch } from '../../../../src/components';
import { EuiSelectable } from '../../../../src/components/selectable';
import { createDataStore } from '../tables/data_store';

export default class extends Component {
  constructor(props) {
    super(props);

    this.countries = createDataStore().countries.map(country => {
      return {
        id: country.code,
        label: `${country.name}`,
        prepend: country.flag,
        append: <EuiBadge>{country.code}</EuiBadge>,
      };
    });

    this.countries.unshift({
      label: 'Country options',
      isGroupLabel: true,
    });

    this.state = {
      options: this.countries,
      useCustomContent: false,
    };
  }

  onChange = (options) => {
    this.setState({
      options,
    });
  };

  onCustom = (e) => {
    this.setState({
      useCustomContent: e.currentTarget.checked,
    });
  }

  renderCountryOption = (option, searchValue) => {
    return (
      <Fragment>
        <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        <br />
        <EuiTextColor color="subdued"><small>I am secondary content, I am!</small></EuiTextColor>
      </Fragment>
    );
  }

  render() {
    const { options, useCustomContent } = this.state;

    let customProps;
    if (useCustomContent) {
      customProps = {
        height: 240,
        renderOption: this.renderCountryOption,
        listProps: {
          rowHeight: 50,
          showIcons: false,
        }
      };
    }

    return (
      <Fragment>
        <EuiSwitch label="Custom content with no icons" checked={useCustomContent} onChange={this.onCustom} />

        <EuiSpacer />

        <EuiSelectable
          searchable
          options={options}
          onChange={this.onChange}
          {...customProps}
        >
          {(list, search) => (
            <Fragment>
              {search}
              {list}
            </Fragment>
          )}
        </EuiSelectable>
      </Fragment>
    );
  }
}
