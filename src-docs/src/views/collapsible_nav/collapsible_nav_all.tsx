import React, { useState } from 'react';

import { EuiCollapsibleNav } from '../../../../src/components/collapsible_nav';

export default () => {
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);
  // const [navIsLocked, setNavIsLocked] = useState(false);

  return navIsOpen ? (
    <EuiCollapsibleNav onClose={() => setNavIsOpen(false)} />
  ) : (
    <></>
  );
};
