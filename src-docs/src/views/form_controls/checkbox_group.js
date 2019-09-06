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

    this.state = {
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
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
          options={this.checkboxes}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onChange}
          disabled
        />
      </Fragment>
    );
  }
}
