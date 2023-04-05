import React from 'react';

import { EuiInlineEditText } from '../../../../src';

export default () => {
  // TO DO: Convert this example to use something like a modal
  const confirmInlineEditChanges = () => {
    // eslint-disable-next-line no-restricted-globals
    const flag = confirm('Are you sure you want to save?') ? true : false;
    return flag;
  };

  return (
    <>
      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size="m"
        editModeProps={{
          inputProps: { icon: 'cross' },
        }}
        readModeProps={{
          color: 'success',
        }}
        onConfirm={confirmInlineEditChanges}
      />
    </>
  );
};
