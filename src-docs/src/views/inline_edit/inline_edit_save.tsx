import React from 'react';

import { EuiInlineEditText } from '../../../../src';

export default () => {
  const saveToLocalStorage = (newInlineEditValue: string) => {
    localStorage.setItem('inlineEditValue', newInlineEditValue);
  };

  const defaultInlineEditValue =
    localStorage.getItem('inlineEditValue') ||
    'This value will persist when you refresh the page!';

  return (
    <EuiInlineEditText
      inputAriaLabel="Edit text inline"
      defaultValue={defaultInlineEditValue}
      onSave={saveToLocalStorage}
    />
  );
};
