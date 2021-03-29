import React, { useState } from 'react';

import { EuiCheckableCard } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <EuiCheckableCard
      id={htmlIdGenerator()()}
      label="I am a checkbox"
      checkableType="checkbox"
      value="checkbox1"
      checked={checkbox}
      onChange={() => setCheckbox(!checkbox)}
    />
  );
};
