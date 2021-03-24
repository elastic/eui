import React, { useState } from 'react';

import { EuiCollapsibleNav } from '../../../../src/components/collapsible_nav';
import { EuiButton } from '../../../../src/components/button';
import { EuiTitle } from '../../../../src/components/title';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiText } from '../../../../src/components/text';
import { EuiCode } from '../../../../src/components/code';

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );

  return (
    <>
      <EuiCollapsibleNav
        isOpen={navIsOpen}
        isDocked={navIsDocked}
        maskProps={{ style: 'opacity: 0' }}
        button={
          <EuiButton onClick={() => setNavIsOpen(!navIsOpen)}>
            Toggle nav
          </EuiButton>
        }
        onClose={() => setNavIsOpen(false)}>
        <div style={{ padding: 16 }}>
          <EuiTitle>
            <h2>I am some nav</h2>
          </EuiTitle>
          <EuiSpacer />
          <EuiText size="s" color="subdued">
            <p>
              The docked status is being stored in{' '}
              <EuiCode>localStorage</EuiCode>.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiButton
            onClick={() => {
              setNavIsDocked(!navIsDocked);
              localStorage.setItem('navIsDocked', JSON.stringify(!navIsDocked));
            }}>
            Docked: {navIsDocked ? 'on' : 'off'}
          </EuiButton>
        </div>
      </EuiCollapsibleNav>

      {navIsDocked && (
        <EuiText size="s" color="subdued">
          <p>
            The <EuiCode>button</EuiCode> gets hidden by default when the nav is
            docked unless you set{' '}
            <EuiCode language="js">showButtonIfDocked = true</EuiCode>.
          </p>
        </EuiText>
      )}
    </>
  );
};
