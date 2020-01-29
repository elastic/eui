import React, { Component, Fragment } from 'react';

import {
  EuiCheckableCard,
  EuiSpacer,
  EuiRadioGroup,
  EuiTitle,
  EuiFormFieldset,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  state = {
    radioName: makeId(),
    radio: 'radio2',
    nestedRadio: 'nestedRadio1',
    checkbox: false,
  };

  render() {
    const { radioName } = this.state;

    const nestedRadios = [
      {
        id: 'nestedRadio1',
        label: 'Nested option one',
      },
      {
        id: 'nestedRadio2',
        label: 'Nested option two',
      },
      {
        id: 'nestedRadio3',
        label: 'Nested option three',
      },
    ];

    return (
      <Fragment>
        <EuiFormFieldset
          legend={{
            children: (
              <EuiTitle size="xs">
                <span>Checkable card radio group with legend</span>
              </EuiTitle>
            ),
          }}>
          <EuiCheckableCard
            id={makeId()}
            label="Option one"
            name={radioName}
            value="radio1"
            checked={this.state.radio === 'radio1'}
            onChange={() => this.setState({ radio: 'radio1' })}
          />

          <EuiSpacer size="m" />

          <EuiCheckableCard
            id={makeId()}
            label="Option two"
            name={radioName}
            value="radio2"
            checked={this.state.radio === 'radio2'}
            onChange={() => this.setState({ radio: 'radio2' })}>
            <EuiRadioGroup
              options={nestedRadios}
              idSelected={this.state.nestedRadio}
              onChange={nestedRadio => this.setState({ nestedRadio })}
              disabled={this.state.radio !== 'radio2'}
            />
          </EuiCheckableCard>

          <EuiSpacer size="m" />

          <EuiCheckableCard
            id={makeId()}
            label="Option three (disabled)"
            name={radioName}
            value="radio3"
            checked={this.state.radio === 'radio3'}
            onChange={() => this.setState({ radio: 'radio3' })}
            disabled
          />
        </EuiFormFieldset>

        <EuiSpacer size="xl" />

        <EuiCheckableCard
          id={makeId()}
          label="I am a checkbox"
          checkableType="checkbox"
          value="checkbox1"
          checked={this.state.checkbox}
          onChange={() => this.setState({ checkbox: !this.state.checkbox })}
        />
      </Fragment>
    );
  }
}
