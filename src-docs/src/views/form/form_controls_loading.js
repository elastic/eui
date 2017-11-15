import React from 'react';

import {
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiSelect,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFieldText
      placeholder="Placeholder text"
      isLoading
    />

    <br />
    <br />

    <EuiFieldText
      defaultValue="Text field with customizable icon"
      icon="user"
      isLoading
      disabled
    />

    <br />
    <br />

    <EuiFieldNumber
      defaultValue="23"
      isLoading
    />

    <br />
    <br />

    <EuiFieldPassword
      defaultValue="password"
      isLoading
    />

    <br />
    <br />

    <EuiFieldSearch
      defaultValue="Search field"
      isLoading
    />

    <br />
    <br />

    <EuiSelect
      isLoading
      options={[
        { value: 'option_one', text: 'Option one' },
        { value: 'option_two', text: 'Option two' },
        { value: 'option_three', text: 'Option three' },
      ]}
    />

  </div>
);
