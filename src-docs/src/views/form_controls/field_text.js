import React, { Component, Fragment } from 'react';

import {
  EuiFieldText,
  EuiSpacer,
  EuiFormLabel,
  EuiButtonEmpty,
  EuiButtonIcon,
} from '../../../../src/components';
import { EuiIcon } from '../../../../src/components/icon';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFieldText
          compressed
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          compressed
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          compressed
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          compressed
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          compressed
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Compressed"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          isInvalid
          fullWidth
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          compressed
          placeholder="Prepend"
          value={this.state.value}
          onChange={this.onChange}
          prepend={<EuiFormLabel>Label</EuiFormLabel>}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          compressed
          placeholder="Prepend"
          value={this.state.value}
          onChange={this.onChange}
          prepend={<EuiIcon type="vector" />}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Append"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          append={<EuiFormLabel>px square</EuiFormLabel>}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Append"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          append={<EuiIcon type="vector" />}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Prepend & Append"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          prepend={<EuiIcon type="vector" />}
          append={<EuiFormLabel>px square</EuiFormLabel>}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Prepend & Append button"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          prepend={
            <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
              Button
            </EuiButtonEmpty>
          }
          append={
            <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
              Button
            </EuiButtonEmpty>
          }
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Icon button and label in prepend"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          prepend={[
            <EuiButtonIcon iconType="magnet" />,
            <EuiFormLabel>field.name</EuiFormLabel>,
          ]}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Icon button and label in append"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          append={[
            <EuiFormLabel>field.name</EuiFormLabel>,
            <EuiButtonIcon iconType="magnet" />,
          ]}
        />
      </Fragment>
    );
  }
}
