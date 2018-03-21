import React, { Fragment } from 'react';

import {
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiSelect,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFieldText
      placeholder="Placeholder text"
      isLoading
    />

    <EuiSpacer size="s" />

    <EuiFieldText
      defaultValue="Text field with customizable icon"
      icon="user"
      isLoading
      disabled
    />

    <EuiSpacer size="s" />

    <EuiFieldNumber
      defaultValue="23"
      isLoading
    />

    <EuiSpacer size="s" />

    <EuiFieldPassword
      defaultValue="password"
      isLoading
    />

    <EuiSpacer size="s" />

    <EuiFieldSearch
      defaultValue="Search field"
      isLoading
    />

    <EuiSpacer size="s" />

    <EuiSelect
      isLoading
      options={[
        { value: 'option_one', text: 'Option one' },
        { value: 'option_two', text: 'Option two' },
        { value: 'option_three', text: 'Option three' },
      ]}
    />
  </Fragment>
);
