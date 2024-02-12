import React from 'react';

import { EuiInlineEditText } from '../../../../src';

export default () => {
  return (
    <EuiInlineEditText
      inputAriaLabel="Edit text inline for readMode and editMode props"
      defaultValue="This inline edit component has been customized!"
      readModeProps={{
        color: 'primary',
        iconSide: 'left',
      }}
      editModeProps={{
        inputProps: {
          prepend: 'Prepend example',
        },
        formRowProps: {
          helpText: 'Example help text',
        },
        saveButtonProps: {
          color: 'primary',
        },
        cancelButtonProps: {
          display: 'empty',
        },
      }}
    />
  );
};
