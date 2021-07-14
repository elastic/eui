import React from 'react';

import { EuiBetaBadge, EuiSpacer, EuiTitle } from '../../../../src/components';

const colors = ['hollow', 'accent', 'subdued'];

export default () => (
  <div>
    {colors.map((item, index) => (
      <div key={index}>
        <EuiBetaBadge
          label="Beta"
          color={item}
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
        &emsp;
        <EuiBetaBadge
          label="Beta"
          color={item}
          size="s"
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
        &emsp;
        <EuiBetaBadge label="B" color={item} />
        &emsp;
        <EuiBetaBadge size="s" label="B" color={item} />
        &emsp;
        <EuiBetaBadge label="Lab" color={item} iconType="beaker" />
        &emsp;
        <EuiBetaBadge label="Lab" size="s" color={item} iconType="beaker" />
        <EuiSpacer size="s" />
      </div>
    ))}
    <EuiSpacer size="s" />
    <EuiTitle size="s">
      <h3>
        Beta badges will also line up nicely with titles &nbsp;
        <EuiBetaBadge
          label="Lab"
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
      </h3>
    </EuiTitle>
    <EuiTitle size="xxs">
      <h4>Clickable beta badges</h4>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiBetaBadge
      label="Lens"
      iconType="lensApp"
      onClick={() => alert('Goes to Lens')}
    />
    &emsp;
    <EuiBetaBadge
      label="Basic"
      href="http://www.elastic.co/subscriptions"
      target="_blank"
    />
  </div>
);
