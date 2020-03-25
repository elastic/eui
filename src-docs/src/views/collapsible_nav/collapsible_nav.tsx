import React, { useState } from 'react';

import { EuiCollapsibleNav } from '../../../../src/components/collapsible_nav';
import { EuiButton, EuiButtonToggle } from '../../../../src/components/button';
import { EuiTitle } from '../../../../src/components/title';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(false);

  return (
    <>
      <EuiButton
        onClick={() => setNavIsOpen(!navIsOpen)}
        aria-label="Toggle main navigation"
        aria-controls="guideCollapsibleNavExampleNav"
        aria-expanded={navIsOpen}
        aria-pressed={navIsOpen}>
        Toggle nav
      </EuiButton>
      {navIsOpen && (
        <EuiCollapsibleNav
          id="guideCollapsibleNavExampleNav"
          aria-label="Example of main navigation flyout"
          docked={navIsDocked}
          onClose={() => setNavIsOpen(false)}>
          <div style={{ padding: 16 }}>
            <EuiTitle>
              <h2>I am some nav</h2>
            </EuiTitle>
            <EuiSpacer />
            <EuiButtonToggle
              label={`Docked: ${navIsDocked ? 'on' : 'off'}`}
              fill={navIsDocked}
              onChange={() => {
                setNavIsDocked(!navIsDocked);
              }}
            />
          </div>
        </EuiCollapsibleNav>
      )}
    </>
  );
};
