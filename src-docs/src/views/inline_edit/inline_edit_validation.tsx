import React, { useState } from 'react';

import { EuiInlineEditText } from '../../../../src';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const isInvalid = errors.length > 0;

  const mockApiCall = (value: string) =>
    new Promise((resolve) => {
      localStorage.setItem('inlineEditValueValidated', value);
      setTimeout(resolve, 3000);
    });

  const defaultInlineEditValue =
    localStorage.getItem('inlineEditValueValidated') ||
    'This value will persist when you refresh the page!';

  return (
    <>
      <EuiInlineEditText
        inputAriaLabel="This input will validate on save"
        defaultValue={defaultInlineEditValue}
        editModeProps={{
          formRowProps: { error: errors },
          cancelButtonProps: { onClick: () => setErrors([]) },
          inputProps: { readOnly: isLoading },
        }}
        isInvalid={isInvalid}
        isLoading={isLoading}
        onSave={async (value) => {
          // Validate edited text
          if (!value) {
            setErrors(['Please enter text.']);
            return false;
          } else if (value.length > 20) {
            setErrors([
              'Your text is too long - please enter less than 20 characters',
            ]);
            return false;
          }

          // Clear errors, set loading state, and "call" an API
          setErrors([]);
          setIsLoading(true);
          await mockApiCall(value);
          setIsLoading(false);
          return true;
        }}
      />
    </>
  );
};
