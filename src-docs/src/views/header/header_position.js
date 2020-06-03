import React, { useState } from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState('static');

  const sections = [
    {
      items: [<EuiHeaderLogo iconType="logoKibana">Kibana</EuiHeaderLogo>],
      borders: 'right',
    },
  ];

  return (
    <>
      <EuiSwitch
        label={'Make header fixed position'}
        checked={position === 'fixed'}
        onChange={e => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <EuiSpacer />
      <EuiHeader position={position} sections={sections} />
    </>
  );
};
