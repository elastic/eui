import React, { Component, Fragment } from 'react';

import {
  EuiRangeStepped,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';


export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.options = [{
      id: `${idPrefix}0`,
      value: 0,
      label: 'Option one',
    }, {
      id: `${idPrefix}1`,
      value: 1,
      label: 'Option two is checked by default',
    }, {
      id: `${idPrefix}2`,
      value: 2,
      label: 'Option three',
    }];

    this.state = {
      value: this.options[1].value,
    };
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiRangeStepped
          options={this.options}
          onChange={this.onChange}
          value={this.state.value}
        />

        {this.state.value}
      </Fragment>
    );
  }
}
