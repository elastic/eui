import React, { useState, useEffect } from 'react';
import { useEuiTheme } from '../../../../../src/services';

import {
  EuiIcon,
  getBreakpoint,
  throttle,
  EuiBreakpointSize,
} from '../../../../../src';

import { getPropsFromThemeKey, _EuiThemeBreakpoint } from '../_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export default () => {
  const { euiTheme } = useEuiTheme();
  const breakpoint = euiTheme.breakpoint;
  const breakpointTypes = getPropsFromThemeKey(_EuiThemeBreakpoint);
  const breakpoints = Object.keys(breakpointTypes);

  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(typeof window === 'undefined' ? 0 : window.innerWidth)
  );

  const functionToCallOnWindowResize = throttle(() => {
    setCurrentBreakpoint(getBreakpoint(window.innerWidth));
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [functionToCallOnWindowResize]);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.breakpoint[size]</code>}
        description={
          <p>
            This default set of breakpoint tokens specify the{' '}
            <strong>minimum</strong> window size and are used throughout EUI.
            You can always customize or add more keys as needed.
          </p>
        }
      />

      <ThemeValuesTable
        items={breakpoints.map((size) => {
          return {
            id: size,
            token: `breakpoint.${size}`,
            type: breakpointTypes[size],
            value: breakpoint[size as EuiBreakpointSize],
          };
        })}
        valueColumnTitle="Min width"
        sampleColumnTitle="Current"
        sampleColumnWidth="80px"
        render={(item) => {
          if (item.id === currentBreakpoint)
            return (
              <EuiIcon
                title="Current window size is within this breakpoint"
                type="checkInCircleFilled"
                color="success"
              />
            );
        }}
      />
    </>
  );
};
