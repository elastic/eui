import React, { useState, useEffect } from 'react';
import {
  isWithinBreakpoints,
  useEuiTheme,
  useIsWithinBreakpoints,
} from '../../../../../src/services';

import {
  EuiIcon,
  getBreakpoint,
  throttle,
  EuiBreakpointSize,
  EuiCode,
  EuiThemeBreakpoints,
} from '../../../../../src';

import { EuiThemeBreakpoints as _EuiThemeBreakpoints } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export default () => {
  const { euiTheme } = useEuiTheme();
  const isLargeBreakpoint = useIsWithinBreakpoints(['l', 'xl']);

  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(
      typeof window === 'undefined' ? 0 : window.innerWidth,
      euiTheme.breakpoint
    )
  );

  const [withinBreakpoints, setWithinBreakpoints] = useState(
    isWithinBreakpoints(typeof window === 'undefined' ? 0 : window.innerWidth, [
      'xs',
      's',
    ])
  );

  const functionToCallOnWindowResize = throttle(() => {
    setCurrentBreakpoint(getBreakpoint(window.innerWidth, euiTheme.breakpoint));
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
        title={<code>getBreakpoint(width, breakpoints)</code>}
        type="function"
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
        snippet="getBreakpoint(window.innerWidth, euiTheme.breakpoint)"
        snippetLanguage="js"
      />

      <ThemeExample
        title={<code>isWithinBreakpoints(width, sizes[])</code>}
        type="function"
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
            Targeting mobile devices only:{' '}
            {withinBreakpoints ? (
              <EuiIcon type="checkInCircleFilled" color="success" />
            ) : (
              <EuiIcon type="cross" color="danger" />
            )}
          </p>
        }
        snippet="isWithinBreakpoints(window.innerWidth, ['xs', 's'])"
        snippetLanguage="js"
      />

      <ThemeExample
        title={<code>useIsWithinBreakpoints(sizes[], isActive?)</code>}
        type="hook"
        description={
          <>
            <p>
              This hook automatically sets up with resize listeners and
              calculates the current breakpoint based on the{' '}
              <strong>whole window width</strong>. The{' '}
              <EuiCode>isActive</EuiCode> parameter allows it to easily be
              turned on/off from within your component.
            </p>
          </>
        }
        example={
          <p>
            Targeting large devices only:{' '}
            {isLargeBreakpoint ? (
              <EuiIcon type="checkInCircleFilled" color="success" />
            ) : (
              <EuiIcon type="cross" color="danger" />
            )}
          </p>
        }
        snippet="useIsWithinBreakpoints(['l', 'xl'])"
        snippetLanguage="js"
      />
    </>
  );
};

export const BreakpointValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const breakpoint = euiTheme.breakpoint;
  const breakpointTypes = getPropsFromComponent(_EuiThemeBreakpoints);

  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(
      typeof window === 'undefined' ? 0 : window.innerWidth,
      euiTheme.breakpoint
    )
  );

  const functionToCallOnWindowResize = throttle(() => {
    setCurrentBreakpoint(getBreakpoint(window.innerWidth, euiTheme.breakpoint));
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
      <ThemeValuesTable
        items={EuiThemeBreakpoints.map((size) => {
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
