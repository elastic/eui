import React, { useState } from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderProps,
  EuiHeaderSections,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState<EuiHeaderProps['position']>(
    'static'
  );

  const sections: EuiHeaderSections[] = [
    {
      items: [<EuiHeaderLogo>Elastic</EuiHeaderLogo>],
      borders: 'right',
    },
  ];

  return (
    <>
      <EuiSwitch
        label={'Make header fixed position'}
        checked={position === 'fixed'}
        onChange={(e) => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <EuiSpacer />
      <EuiHeader position={position} sections={sections} />
    </>
  );
};
