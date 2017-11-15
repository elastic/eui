import React, {
  Component,
} from 'react';

import {
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiSelect,
} from '../../../../src/components';

// Don't use this, make proper ids instead. This is just for the example.
function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();
  }

  render() {
    return (
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
  }
}
