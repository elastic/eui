import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.toggleButtons = [{
      id: `${idPrefix}0`,
      label: 'Option one',
      content: 'Option one',
    }, {
      id: `${idPrefix}1`,
      label: 'Option two is selected by default',
      content: 'Option two is selected by default',
    }, {
      id: `${idPrefix}2`,
      label: 'Option three',
      content: 'Option three',
    }];

    this.state = {
      toggleIdSelected: `${idPrefix}1`,
    };
  }

  onChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiButtonGroup
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs"><h3>Primary</h3></EuiTitle>

        <EuiSpacer size="s" />

        <EuiButtonGroup
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
          color="primary"
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs"><h3>Disabled</h3></EuiTitle>

        <EuiSpacer size="s" />

        <EuiButtonGroup
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
          disabled
        />
      </Fragment>
    );
  }
}
