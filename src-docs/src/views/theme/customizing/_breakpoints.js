import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  EuiText,
  EuiSpacer,
  useEuiTheme,
  EuiPanel,
  EuiTitle,
} from '../../../../../src';
import { sortMapBySmallToLargeValues } from '../../../../../src/services/breakpoint/_sorting';

import { useDebouncedUpdate } from '../hooks';
import { euiThemeBreakpointType } from '../_props';
import { ThemeValue } from './_values';

export default ({ onThemeUpdate }) => {
  const {
    euiTheme: { breakpoint },
  } = useEuiTheme();
  const breakpoints = useMemo(() => {
    return sortMapBySmallToLargeValues(breakpoint);
  }, [breakpoint]);

  const [breakpointClone, updateBreakpoint] = useDebouncedUpdate({
    property: 'breakpoint',
    value: breakpoint,
    onUpdate: onThemeUpdate,
  });

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
            You can{' '}
            <Link to="/theming/breakpoints/values#custom-values">
              customize sizes or add more keys
            </Link>{' '}
            as needed, but you cannot remove the default keys.
          </p>
        </EuiText>

        <EuiSpacer />

        {Object.keys(breakpoints).map((prop) => {
          return (
            <ThemeValue
              key={prop}
              property="breakpoint"
              type={euiThemeBreakpointType}
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
