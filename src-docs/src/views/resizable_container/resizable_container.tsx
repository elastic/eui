import React from 'react';

import { EuiResizableContainer } from '../../../../src/components/resizable_container';

export default () => (
  <EuiResizableContainer>
    {(Panel, Resizer) => (
      <>
        <Panel className="visEditor__visualization" initialWidth={50}>
          <div className="visEditor__canvas" />
        </Panel>

        <Resizer />

        <Panel className={'visEditor__collapsibleSidebar '} initialWidth={50}>
          <div className="visEditor__canvas" />
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
