import React, { useState } from 'react';

import { EuiCheckableCard } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [checkbox, setCheckbox] = useState(false);
  const checkboxCardId = useGeneratedHtmlId({ prefix: 'checkboxCard' });

  return (
    <EuiCheckableCard
      id={checkboxCardId}
      label="I am a checkbox"
      checkableType="checkbox"
      value="checkbox1"
      checked={checkbox}
      onChange={() => setCheckbox(!checkbox)}
    />
  );
};
