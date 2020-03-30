import React, { useState } from 'react';

import { EuiCollapsibleNav } from '../../../../src/components/collapsible_nav';
import { EuiButton, EuiButtonToggle } from '../../../../src/components/button';
import { EuiTitle } from '../../../../src/components/title';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiText } from '../../../../src/components/text';
import { EuiCode } from '../../../../src/components/code';

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(false);

  return (
    <>
      <EuiCollapsibleNav
        isOpen={navIsOpen}
        button={
          <EuiButton onClick={() => setNavIsOpen(!navIsOpen)}>
            Toggle nav
          </EuiButton>
        }
        isDocked={navIsDocked}
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

      {navIsDocked && (
        <EuiText size="s" color="subdued">
          <p>
            The button gets hidden by default when nav is docked unless you set{' '}
            <EuiCode language="js">hideButtonIfDocked = false</EuiCode>.
          </p>
        </EuiText>
      )}
    </>
  );
};
