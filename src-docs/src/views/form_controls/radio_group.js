import React, { Component } from 'react';

import { EuiRadioGroup } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';
import { DisplayToggles } from './display_toggles';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = htmlIdGenerator()();

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
        label: 'Option three is disabled',
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
      /* DisplayToggles wrapper for Docs only */
      <DisplayToggles
        canLoading={false}
        canReadOnly={false}
        canInvalid={false}
        canFullWidth={false}>
        <EuiRadioGroup
          options={this.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onChange}
          name="radio group"
          legend={{
            children: <span>This is a legend for a radio group</span>,
          }}
        />
      </DisplayToggles>
    );
  }
}
