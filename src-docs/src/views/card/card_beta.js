import React from 'react';

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const icons = ['dashboard', 'monitoring'];
const badges = [null, 'Beta'];

const cardNodes = icons.map(function (item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiCard
        icon={<EuiIcon size="xxl" type={`${item}App`} />}
        title={`Kibana ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        betaBadgeLabel={badges[index]}
        betaBadgeTooltipContent={
          badges[index]
            ? 'This module is not GA. Please help us by reporting any bugs.'
            : undefined
        }
        onClick={() => {}}
      />
    </EuiFlexItem>
  );
});

export default () => (
  <EuiFlexGroup gutterSize="l">
    {cardNodes}
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="lensApp" />}
        title="Lens"
        isDisabled
        description="Disabled cards can have active links using EuiBetaBadge."
        betaBadgeProps={{
          href: 'http://www.elastic.co/subscriptions',
          target: '_blank',
        }}
        betaBadgeLabel="Basic"
        betaBadgeTooltipContent="This feature requires a Basic License"
        onClick={() => {}}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
