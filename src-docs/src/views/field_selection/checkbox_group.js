import React, {
  Component,
} from 'react';

import {
  EuiCheckboxGroup,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.checkboxes = [{
      id: `${idPrefix}0`,
      label: 'Option one',
    }, {
      id: `${idPrefix}1`,
      label: 'Option two is checked by default',
    }, {
      id: `${idPrefix}2`,
      label: 'Option three',
    }];

    this.state = {
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
      },
    };
  }

  onChange = optionId => {
    const newCheckboxIdToSelectedMap = ({ ...this.state.checkboxIdToSelectedMap, ...{
      [optionId]: !this.state.checkboxIdToSelectedMap[optionId],
    } });

    this.setState({
      checkboxIdToSelectedMap: newCheckboxIdToSelectedMap,
    });
  };

  render() {
    return (
      <EuiCheckboxGroup
        options={this.checkboxes}
        idToSelectedMap={this.state.checkboxIdToSelectedMap}
        onChange={this.onChange}
      />
    );
  }
}
