import React, { useState } from 'react';

import {
  EuiButton,
  EuiI18n,
  EuiMark,
  EuiSpacer,
  EuiTitle,
  useEuiI18n,
} from '../../../../src/components';

export default () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <EuiTitle size="xs">
        <h3>useEuiI18n with string interpolation</h3>
      </EuiTitle>
      <p>
        {useEuiI18n(
          'euiI18nInterpolation.clickedCount',
          'Clicked on button {count} times.',
          {
            count,
          }
        )}
      </p>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h3>EuiI18n with string interpolation</h3>
      </EuiTitle>
      <p>
        <EuiI18n
          token="euiI18nInterpolation.clickedCount"
          default="Clicked on button {count} times."
          values={{
            count,
          }}
        />
      </p>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h3>useEuiI18n with component interpolation</h3>
      </EuiTitle>
      <p>
        {useEuiI18n(
          'euiI18nInterpolation.clickedCount',
          'Clicked on button {count} times.',
          {
            count: <EuiMark color="primary">{count}</EuiMark>,
          }
        )}
      </p>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h3>EuiI18n with component interpolation</h3>
      </EuiTitle>
      <p>
        <EuiI18n
          token="euiI18nInterpolation.clickedCount"
          default="Clicked on button {count} times."
          values={{
            count: <EuiMark color="primary">{count}</EuiMark>,
          }}
        />
      </p>

      <EuiSpacer size="l" />

      <EuiButton onClick={() => setCount(count + 1)} size="s">
        Increase count
      </EuiButton>
    </>
  );
};
