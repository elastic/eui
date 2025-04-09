import React from 'react';
import { css } from '@emotion/react';

import { EuiBetaBadge, EuiSpacer, EuiTitle } from '../../../../src/components';

const defaultColors = ['hollow', 'accent'] as const;
const deprecationColors = ['subdued', 'warning'] as const;

const wrapperStyles = css`
  display: grid;
  align-items: flex-start;
  gap: 1rem;
`;

export default () => (
  <>
    <EuiTitle size="xs">
      <h3>Colors and types</h3>
    </EuiTitle>
    <EuiSpacer size="m" />
    <div
      css={[
        wrapperStyles,
        css`
          grid: repeat(2, max-content) / repeat(6, max-content);
        `,
      ]}
    >
      {defaultColors.map((item) => {
        const label = 'Beta';
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
            <EuiBetaBadge label={label} color={item} iconType="beta" />
            <EuiBetaBadge label="Tech preview" color={item} iconType="flask" />
            <EuiBetaBadge size="s" label={label} color={item} iconType="beta" />
            <EuiBetaBadge
              size="s"
              label="Tech preview"
              color={item}
              iconType="flask"
            />
          </>
        );
      })}
    </div>
    <EuiSpacer />
    <div
      css={[
        wrapperStyles,
        css`
          grid: repeat(2, max-content) / repeat(2, max-content);
        `,
      ]}
    >
      {deprecationColors.map((item) => {
        const label = 'Deprecated';
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
          </>
        );
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
