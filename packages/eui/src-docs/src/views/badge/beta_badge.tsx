import React from 'react';
import { css } from '@emotion/react';

import { EuiBetaBadge, EuiSpacer, EuiTitle } from '../../../../src/components';

const colors = ['hollow', 'accent', 'subdued', 'warning'] as const;

export default () => (
  <>
    <EuiTitle size="xs">
      <h3>Colors and types</h3>
    </EuiTitle>
    <EuiSpacer size="m" />
    <div
      css={css`
        display: grid;
        align-items: flex-start;
        grid: repeat(4, max-content) / repeat(6, max-content);
        gap: 1rem;

        span:nth-child(2n + 14) {
          grid-column: span 5;
        }
      `}
    >
      {colors.map((item) => {
        const label = item == 'hollow' || item == 'accent' ? 'Beta' : 'Deprecated';

        return (
          <>
            <EuiBetaBadge
              label={label}
              color={item}
              tooltipContent="This module is not GA. Please help us by reporting any bugs."
            />
            <EuiBetaBadge
              label={label}
              color={item}
              size="s"
              tooltipContent="This module is not GA. Please help us by reporting any bugs."
            />
            {label == 'Beta' ? (
              <>
                <EuiBetaBadge label={label} color={item} iconType="beta" />
                <EuiBetaBadge label="Tech preview" color={item} iconType="beaker" />
                <EuiBetaBadge size="s" label={label} color={item} iconType="beta" />
                <EuiBetaBadge size="s" label="Tech preview" color={item} iconType="beaker" />
              </>
            ): null}
          </>
        )
      })}
    </div>
    <EuiSpacer />
    <EuiTitle size="xs">
      <h3>Clickable example</h3>
    </EuiTitle>
    <EuiSpacer size="m" />
    <div>
      <EuiBetaBadge
        label="Beta"
        href="http://www.elastic.co/subscriptions"
        target="_blank"
      />
    </div>
    <EuiSpacer />
    <EuiTitle size="xs">
      <h3>Placement alongside titles</h3>
    </EuiTitle>
    <EuiSpacer size="m" />
    <EuiTitle size="s">
      <h3>
        New feature &nbsp;
        <EuiBetaBadge
          label="Beta"
          size="s"
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
      </h3>
    </EuiTitle>    
  </>
);
