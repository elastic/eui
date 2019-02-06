import React, { SFC } from 'react';

export const EuiColorPickerEmptySwatch: SFC<{}> = () => {
  return (
    <svg>
      <line x1="0" y1="100%" x2="100%" y2="0" />
    </svg>
  );
};
