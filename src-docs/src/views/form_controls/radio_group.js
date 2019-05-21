import React, { Component, Fragment } from 'react';

import { EuiRadioGroup, EuiSpacer, EuiTitle } from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.radios = [
      {
        id: `${idPrefix}0`,
        label: 'Option one',
      },
      {
        id: `${idPrefix}1`,
        label: 'Option two is checked by default',
      },
      {
        id: `${idPrefix}2`,
        label: 'Option three',
        disabled: true,
      },
    ];

    this.state = {
      radioIdSelected: `${idPrefix}1`,
    };
  }

  onChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiRadioGroup
          options={this.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs">
          <h3>Disabled</h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <EuiRadioGroup
          options={this.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs">
          <h3>Compressed</h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <EuiRadioGroup
          options={this.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onChange}
          compressed
        />
      </Fragment>
    );
  }
}
