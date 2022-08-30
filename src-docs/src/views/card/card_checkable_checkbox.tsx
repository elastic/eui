import React, { useState } from 'react';

import { EuiCheckableCard, useGeneratedHtmlId } from '../../../../src';

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
