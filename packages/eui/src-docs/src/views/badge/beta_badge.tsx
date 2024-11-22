import React from 'react';
import { css } from '@emotion/react';

import { EuiBetaBadge, EuiSpacer, EuiTitle } from '../../../../src/components';

const colors = ['hollow', 'accent', 'subdued', 'warning'] as const;

export default () => (
  <>
    <div
      css={css`
        display: grid;
        align-items: flex-start;
        grid: repeat(3, max-content) / repeat(6, max-content);
        gap: 0.75rem;
      `}
    >
      {colors.map((item) => (
        <>
          <EuiBetaBadge
            label="Beta"
            color={item}
            tooltipContent="This module is not GA. Please help us by reporting any bugs."
          />
          <EuiBetaBadge
            label="Beta"
            color={item}
            size="s"
            tooltipContent="This module is not GA. Please help us by reporting any bugs."
          />
          <EuiBetaBadge label="Beta" color={item} iconType="beta" />
          <EuiBetaBadge size="s" label="Beta" color={item} iconType="beta" />
          <EuiBetaBadge label="Lab" color={item} iconType="beaker" />
          <EuiBetaBadge label="Lab" size="s" color={item} iconType="beaker" />
        </>
      ))}
    </div>
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
        gap: 0.75rem;
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
