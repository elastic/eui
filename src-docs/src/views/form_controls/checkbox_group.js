import React, { Component } from 'react';

import { EuiCheckboxGroup } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.checkboxes = [
      {
        id: `${idPrefix}0`,
        label: 'Option one',
        'data-test-sub': 'dts_test',
      },
      {
        id: `${idPrefix}1`,
        label: 'Option two is checked by default',
        className: 'classNameTest',
      },
      {
        id: `${idPrefix}2`,
        label: 'Option three is disabled',
        disabled: true,
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
      /* DisplayToggles wrapper for Docs only */
      <DisplayToggles
        canLoading={false}
        canReadOnly={false}
        canInvalid={false}
        canFullWidth={false}>
        <EuiCheckboxGroup
          options={this.checkboxes}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onChange}
        />
      </DisplayToggles>
    );
  }
}
