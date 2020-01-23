import React, { Component, Fragment } from 'react';

import {
  EuiCode,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiDescribedFormGroup,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiLink,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.state = {
      isSwitchChecked: false,
      checkboxes: [
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
      ],
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
      },
      radios: [
        {
          id: `${idPrefix}4`,
          label: 'Option one',
        },
        {
          id: `${idPrefix}5`,
          label: 'Option two is selected by default',
        },
        {
          id: `${idPrefix}6`,
          label: 'Option three',
        },
      ],
      radioIdSelected: `${idPrefix}5`,
    };
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onCheckboxChange = optionId => {
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

  onRadioChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
    });
  };

  render() {
    return (
      <EuiForm>
        <EuiDescribedFormGroup
          title={<h3>Single text field</h3>}
          description={
            <Fragment>
              A single text field that can be used to display additional text.
              It can have{' '}
              <EuiLink href="http://www.elastic.co" target="_blank">
                links
              </EuiLink>{' '}
              or any other type of content.
            </Fragment>
          }>
          <EuiFormRow label="Text field">
            <EuiFieldText name="first" aria-label="Example" />
          </EuiFormRow>
        </EuiDescribedFormGroup>

        <EuiDescribedFormGroup title={<h3>No description</h3>}>
          <EuiFormRow label="Text field">
            <EuiFieldText name="first" />
          </EuiFormRow>
        </EuiDescribedFormGroup>

        <EuiDescribedFormGroup
          title={<h3>Multiple fields</h3>}
          description="Here are three form rows. The first form row does not have a title.">
          <EuiFormRow
            hasEmptyLabelSpace
            helpText={<span>This is a help text</span>}>
            <EuiSelect
              hasNoInitialSelection
              options={[
                { value: 'option_one', text: 'Option one' },
                { value: 'option_two', text: 'Option two' },
                { value: 'option_three', text: 'Option three' },
              ]}
            />
          </EuiFormRow>

          <EuiFormRow label="File picker">
            <EuiFilePicker />
          </EuiFormRow>

          <EuiFormRow label="Range">
            <EuiRange min={0} max={100} name="range" id="range" />
          </EuiFormRow>
        </EuiDescribedFormGroup>

        <EuiDescribedFormGroup
          title={<h2>Full width</h2>}
          titleSize="xxxs"
          description={
            <Fragment>
              By default, <EuiCode>EuiDescribedFormGroup</EuiCode> will be
              double the default width of form elements. However, you can pass{' '}
              <EuiCode>fullWidth</EuiCode> prop to this, the individual field
              and row components to expand to their container.
            </Fragment>
          }
          fullWidth>
          <EuiFormRow
            label="Use a switch instead of a single checkbox"
            hasChildLabel={false}
            fullWidth>
            <EuiSwitch
              name="switch"
              label="Should we do this?"
              checked={this.state.isSwitchChecked}
              onChange={this.onSwitchChange}
            />
          </EuiFormRow>

          <EuiFormRow fullWidth>
            <EuiFieldText name="second" fullWidth />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      </EuiForm>
    );
  }
}
