import React, { useState } from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState('static');

  return (
    <EuiHeader
      position={position}
      sections={{
        left: [
          {
            children: (
              <EuiHeaderLogo
                iconType="logoKibana"
                href="#"
                aria-label="Go to home page"
              />
            ),
            border: 'none',
          },
        ],
        right: [
          {
            children: (
              <EuiSwitch
                label={`position: ${position}`}
                checked={position === 'fixed'}
                onChange={e =>
                  setPosition(e.target.checked ? 'fixed' : 'static')
                }
              />
            ),
            border: 'none',
            style: {
              padding: 16,
            },
          },
        ],
      }}
    />
  );
};
