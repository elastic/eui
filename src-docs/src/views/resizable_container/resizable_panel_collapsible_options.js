import React from 'react';
import {
  EuiEmptyPrompt,
  EuiResizableContainer,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
  EuiButton,
} from '../../../../src/components';

export default () => {
  return (
    <>
      <div className="guideSection__shadedBox">
        <EuiResizableContainer style={{ height: '400px' }}>
          {(EuiResizablePanel, EuiResizableButton) => (
            <>
              <EuiResizablePanel
                mode="collapsible"
                initialSize={15}
                minSize="5%">
                <EuiListGroup>
                  {[...Array(4)].map((el, i) => (
                    <EuiListGroupItem
                      key={i}
                      size="s"
                      onClick={() => {}}
                      label="Action"
                      isDisabled
                    />
                  ))}
                </EuiListGroup>
              </EuiResizablePanel>

              <EuiResizableButton />

              <EuiResizablePanel mode="main" initialSize={70} minSize="50px">
                <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                  <EuiEmptyPrompt
                    iconType="globe"
                    title={<h2>Add some data to get started</h2>}
                    body={
                      <>
                        <p>You&rsquo;ll need data to perform actions.</p>
                      </>
                    }
                    actions={
                      <EuiButton color="primary" fill>
                        Add data
                      </EuiButton>
                    }
                  />
                </EuiPanel>
              </EuiResizablePanel>

              <EuiResizableButton />

              <EuiResizablePanel
                mode="collapsible"
                initialSize={15}
                minSize="5%">
                <EuiListGroup>
                  {[...Array(4)].map((el, i) => (
                    <EuiListGroupItem
                      key={i}
                      size="s"
                      onClick={() => {}}
                      label="Action"
                      isDisabled
                    />
                  ))}
                </EuiListGroup>
              </EuiResizablePanel>
            </>
          )}
        </EuiResizableContainer>
      </div>
    </>
  );
};
