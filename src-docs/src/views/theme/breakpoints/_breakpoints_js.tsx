import React, { useState, useEffect } from 'react';
import { isWithinBreakpoints, useEuiTheme } from '../../../../../src/services';

import {
  EuiIcon,
  getBreakpoint,
  throttle,
  EuiBreakpointSize,
  EuiCode,
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

  const [withinBreakpoints, setWithinBreakpoints] = useState(
    isWithinBreakpoints(typeof window === 'undefined' ? 0 : window.innerWidth, [
      'xs',
      's',
    ])
  );

  const functionToCallOnWindowResize = throttle(() => {
    setCurrentBreakpoint(getBreakpoint(window.innerWidth));
    setWithinBreakpoints(isWithinBreakpoints(window.innerWidth, ['xs', 's']));
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
        title={<code>getBreakpoint(width)</code>}
        description={
          <p>
            Given the current <EuiCode>width</EuiCode>, this function returns
            the string that is the name of the breakpoint key that is less than
            or equal to the width.
          </p>
        }
        example={
          <p>
            Current breakpoint: <strong>{currentBreakpoint}</strong>
          </p>
        }
        snippet="getBreakpoint(window.innerWidth)"
        snippetLanguage="js"
      />

      <ThemeExample
        title={<code>isWithinBreakpoints(width, sizes[])</code>}
        description={
          <>
            <p>
              Given the current <EuiCode>width</EuiCode> and an array of
              breakpoint keys, this function returns true or false if the{' '}
              <EuiCode>width</EuiCode> falls <strong>within any</strong> of the
              named breakpoints.
            </p>
            <p>
              You can also use{' '}
              <EuiCode>isWithinMinBreakpoint(width, key)</EuiCode> or{' '}
              <EuiCode>isWithinMaxBreakpoint(width, key)</EuiCode> for checking
              for a specific minimum or maximum width.
            </p>
          </>
        }
        example={
          <p>
            Targeting mobile devices only{' '}
            {withinBreakpoints && (
              <EuiIcon type="checkInCircleFilled" color="success" />
            )}
          </p>
        }
        snippet="isWithinBreakpoints(window.innerWidth, ['xs', 's'])"
        snippetLanguage="js"
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
        valueColumnProps={{
          title: 'Min width',
        }}
        sampleColumnProps={{
          title: 'Current',
          width: '80px',
        }}
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
