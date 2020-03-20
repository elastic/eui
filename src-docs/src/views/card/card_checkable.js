import React, { Component, Fragment } from 'react';

import {
  EuiCheckableCard,
  EuiSpacer,
  EuiRadioGroup,
  EuiTitle,
  EuiFormFieldset,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default class extends Component {
  state = {
    radioName: htmlIdGenerator()(),
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
            id={htmlIdGenerator()()}
            label="Option one"
            name={radioName}
            value="radio1"
            checked={this.state.radio === 'radio1'}
            onChange={() => this.setState({ radio: 'radio1' })}
          />

          <EuiSpacer size="m" />

          <EuiCheckableCard
            id={htmlIdGenerator()()}
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
            id={htmlIdGenerator()()}
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
          id={htmlIdGenerator()()}
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
