import React from 'react';

import { EuiInlineEditText } from '../../../../src';

export default () => {
  const confirmInlineEditChanges = () => {
    // eslint-disable-next-line no-restricted-globals
    const flag = confirm('Are you sure you want to save?') ? true : false;
    return flag;
  };

  return (
    <>
      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello! I will need to confirm my changes."
        size="m"
        onConfirm={confirmInlineEditChanges}
      />
    </>
  );
};
