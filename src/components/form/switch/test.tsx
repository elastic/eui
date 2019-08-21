import React from 'react';

import { EuiSwitch } from './switch';

export const Test = ({ checked }: { checked: boolean }) => (
  <EuiSwitch
    checked={checked}
    label="Test"
    onChange={e => console.log(e.target.checked)}
  />
);
