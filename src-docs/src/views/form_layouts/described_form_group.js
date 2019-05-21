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
          idAria="single-example-aria"
          title={<h3>Single text field</h3>}
          description={
            <Fragment>
              When using this with a single form row where this text serves as
              the help text for the input, it is a good idea to pass{' '}
              <EuiCode>idAria=&quot;someID&quot;</EuiCode> to the form group and
              pass
              <EuiCode>describedByIds=&#123;[someID]&#125;</EuiCode> to its form
              row.
            </Fragment>
          }>
          <EuiFormRow
            label="Text field"
            describedByIds={['single-example-aria']}>
            <EuiFieldText name="first" />
          </EuiFormRow>
        </EuiDescribedFormGroup>

        <EuiDescribedFormGroup
          idAria="no-description"
          title={<h3>No description</h3>}>
          <EuiFormRow label="Text field" describedByIds={['no-description']}>
            <EuiFieldText name="first" />
          </EuiFormRow>
        </EuiDescribedFormGroup>

        <EuiDescribedFormGroup
          title={<strong>Multiple fields</strong>}
          titleSize="m"
          description="Here are three form rows. The first form row does not have a title.">
          <EuiFormRow
            hasEmptyLabelSpace
            helpText={
              <span>
                We do not pass <EuiCode>describedByIds</EuiCode> when there are
                multiple form rows.
              </span>
            }>
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
