import React, { useState, ChangeEvent } from 'react';

import { EuiInlineEditText } from '../../../../src';

export default () => {
  const [inlineEditValue, setInlineEditValue] = useState('Hello World!');

  const inlineEditOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInlineEditValue(e.target.value);
  };

  return (
    <EuiInlineEditText
      inputAriaLabel="Edit title inline"
      value={inlineEditValue}
      onChange={inlineEditOnChange}
      onCancel={(previousValue) => {
        setInlineEditValue(previousValue);
      }}
    />
  );
};
