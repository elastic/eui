import React from 'react';
import { css } from '@emotion/react';

import { EuiBetaBadge, EuiSpacer, EuiTitle } from '../../../../src/components';

const colors = ['hollow', 'accent', 'subdued'] as const;

export default () => (
  <>
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
        <EuiBetaBadge label="Beta" color={item} iconType="beta" />
        &emsp;
        <EuiBetaBadge size="s" label="Beta" color={item} iconType="beta" />
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
    <EuiSpacer />
    <EuiTitle size="xs">
      <h3>Clickable beta badges</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `}
    >
      <EuiBetaBadge
        label="Lens"
        iconType="lensApp"
        onClick={() => alert('Goes to Lens')}
      />
      <EuiBetaBadge
        label="Basic"
        href="http://www.elastic.co/subscriptions"
        target="_blank"
      />
    </div>
  </>
);
