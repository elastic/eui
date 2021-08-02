import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageBody,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <EuiPage paddingSize="none" className="eui-fullHeight">
    <EuiPageBody className="eui-fullHeight">
      <EuiPageContent
        color="transparent"
        borderRadius="none"
        hasShadow={false}
        paddingSize="none"
        className="eui-fullHeight">
        <EuiPageContentBody
          restrictWidth
          paddingSize="l"
          className="eui-fullHeight">
          <EuiFlexGroup
            className="eui-fullHeight"
            gutterSize="none"
            direction="column"
            responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiPanel color="danger" />
            </EuiFlexItem>
            <EuiSpacer size="l" />
            <EuiFlexItem className="eui-fullHeight">
              <EuiFlexGroup className="eui-fullHeight" gutterSize="l">
                <EuiFlexItem grow={2}>
                  <EuiPanel
                    tabIndex={0}
                    className="eui-yScroll"
                    hasShadow={false}>
                    {content}
                  </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiPanel hasShadow={false} />
                  <EuiSpacer />
                  {button}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
