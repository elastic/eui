import React, { useState } from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState('static');

  const sections = [
    {
      items: [
        <EuiHeaderLogo
          iconType="logoKibana"
          href="#"
          aria-label="Go to home page"
        />,
      ],
      borders: 'none',
    },
    {
      items: [
        <div style={{ padding: 16 }}>
          <EuiSwitch
            label={`position: ${position}`}
            checked={position === 'fixed'}
            onChange={e => setPosition(e.target.checked ? 'fixed' : 'static')}
          />
        </div>,
      ],
      borders: 'none',
    },
  ];

  return <EuiHeader position={position} sections={sections} />;
};
