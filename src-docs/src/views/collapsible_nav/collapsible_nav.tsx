import React, { useState } from 'react';

import { EuiCollapsibleNav } from '../../../../src/components/collapsible_nav';
import { EuiButton } from '../../../../src/components/button';

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(false);

  return (
    <>
      <EuiButton onClick={() => setNavIsOpen(!navIsOpen)}>Toggle nav</EuiButton>
      {navIsOpen && (
        <EuiCollapsibleNav
          docked={navIsDocked}
          onClose={() => setNavIsOpen(false)}>
          <EuiButton onClick={() => setNavIsDocked(!navIsDocked)}>
            Toggle Docked
          </EuiButton>
        </EuiCollapsibleNav>
      )}
    </>
  );
};
