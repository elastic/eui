import React from 'react';

import { EuiButton, EuiInlineEditText, EuiSpacer } from '../../../../src';

export default () => {
  const saveToLocalStorage = (newInlineEditValue: string) => {
    localStorage.setItem('inlineEditValue', newInlineEditValue);
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem('inlineEditValue');
  };

  const defaultInlineEditValue =
    localStorage.getItem('inlineEditValue') ||
    'This value will persist when you refresh the page!';

  return (
    <>
      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue={defaultInlineEditValue}
        size="m"
        onSave={(onSaveVal) => saveToLocalStorage(onSaveVal)}
      />

      <EuiSpacer />

      <EuiButton onClick={removeFromLocalStorage}>
        Remove saved value from local storage
      </EuiButton>
    </>
  );
};
