import React, { Component, Fragment } from 'react';

import {
  EuiCheckboxGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.checkboxes = [
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
      },
    ];

    this.checkboxesDisabled = this.checkboxes.map(checkbox => {
      return { ...checkbox, id: `${checkbox.id}_disabled` };
    });

    this.checkboxesIndividuallyDisabled = this.checkboxes.map(checkbox => {
      const isIndividuallyDisabled =
        checkbox.id.charAt(checkbox.id.length - 1) === '1';
      return {
        ...checkbox,
        id: `${checkbox.id}_individually_disabled`,
        label: isIndividuallyDisabled
          ? 'Option two is individually disabled'
          : checkbox.label,
        disabled: isIndividuallyDisabled,
      };
    });

    this.state = {
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
        [`${idPrefix}1_disabled`]: true,
        [`${idPrefix}1_individually_disabled`]: true,
      },
    };
  }

  onChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...this.state.checkboxIdToSelectedMap,
      ...{
        [optionId]: !this.state.checkboxIdToSelectedMap[optionId],
      },
    };

    this.setState({
      checkboxIdToSelectedMap: newCheckboxIdToSelectedMap,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiCheckboxGroup
          options={this.checkboxes}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs">
          <h3>Disabled</h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <EuiCheckboxGroup
          options={this.checkboxesDisabled}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs">
          <h3>Individually disabled checkbox</h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <EuiCheckboxGroup
          options={this.checkboxesIndividuallyDisabled}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onChange}
        />
      </Fragment>
    );
  }
}
