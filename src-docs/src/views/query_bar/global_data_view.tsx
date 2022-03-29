import React, { useState } from 'react';
import { EuiButton } from '../../../../src';

export const DataViewSelector = ({ ...rest }) => {
  const longName =
    'Data view selector with a really long name to make sure it truncates';
  const shortName = 'kib-*';
  const [name, setName] = useState(shortName);

  return (
    <EuiButton
      iconType={'arrowDown'}
      iconSide="right"
      onClick={() => setName(name === shortName ? longName : shortName)}
      {...rest}
    >
      {name}
    </EuiButton>
  );
};
