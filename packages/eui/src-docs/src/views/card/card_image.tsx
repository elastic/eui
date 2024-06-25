import React from 'react';

import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
} from '../../../../src';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        image={
          <div>
            <img src="https://picsum.photos/id/13/400/200" alt="Nature" />
          </div>
        }
        title="Elastic in Nature"
        description="Example of a card's description. Stick to one or two sentences."
        footer={
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButton>Go for it</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        image="https://picsum.photos/400/200"
        title="Elastic in Water"
        description="Example of a card's description. Stick to one or two sentences."
        isDisabled
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        href="https://elastic.github.io/eui/"
        image="https://picsum.photos/id/57/400/200"
        icon={<EuiIcon size="xxl" type="logoBeats" />}
        title={'Beats in the City'}
        description="This card has an href and should be a link."
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
