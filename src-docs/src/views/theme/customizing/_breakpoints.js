import React from 'react';

import {
  EuiText,
  EuiSpacer,
  useEuiTheme,
  EuiPanel,
  EuiTitle,
} from '../../../../../src';

import { useDebouncedUpdate } from '../hooks';

import { ThemeValue } from './_values';

import { getPropsFromThemeKey, _EuiThemeBreakpoint } from '../_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const breakpoint = euiTheme.breakpoint;
  const [breakpointClone, updateBreakpoint] = useDebouncedUpdate({
    property: 'breakpoint',
    value: breakpoint,
    onUpdate: onThemeUpdate,
  });

  const breakpointTypes = getPropsFromThemeKey(_EuiThemeBreakpoint);

  return (
    <div>
      <EuiText>
        <h2>Breakpoints</h2>
      </EuiText>
      <EuiSpacer size="xl" />
      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>EuiThemeBreakpoint</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            This default set of breakpoint tokens specify the{' '}
            <strong>minimum</strong> window size and are used throughout EUI.
            You can always customize or add more keys as needed.
          </p>
        </EuiText>

        <EuiSpacer />

        {Object.keys(breakpointTypes).map((prop) => {
          return (
            <ThemeValue
              key={prop}
              property="breakpoint"
              type={breakpointTypes[prop]}
              name={prop}
              value={breakpointClone[prop]}
              onUpdate={(value) => updateBreakpoint(prop, value)}
              groupProps={{
                alignItems: 'center',
              }}
            />
          );
        })}
      </EuiPanel>
    </div>
  );
};
