import React from 'react';
import { css } from '@emotion/react';
import {
  EuiIcon,
  EuiCode,
  EuiText,
  useEuiBreakpoint,
  useEuiMaxBreakpoint,
  useEuiMinBreakpoint,
  useCurrentEuiBreakpoint,
  useIsWithinBreakpoints,
  useIsWithinMaxBreakpoint,
  useIsWithinMinBreakpoint,
  useEuiTheme,
} from '../../../../../src';
import { sortMapBySmallToLargeValues } from '../../../../../src/services/breakpoint/_sorting';

import { euiThemeBreakpointType } from '../_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export default () => {
  const currentBreakpoint = useCurrentEuiBreakpoint();
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>useCurrentEuiBreakpoint()</code>}
        type="hook"
        description={
          <>
            <p>
              This hook returns the named breakpoint size of the current browser
              window width, responsively updating whenever the window is
              resized.
            </p>
            <p>
              The hook automatically inherits breakpoint sizes from the current
              EUI theme and any theme overrides.
            </p>
          </>
        }
        example={
          <p>
            Current breakpoint: <strong>{currentBreakpoint}</strong>
          </p>
        }
        snippet="const currentBreakpoint = useCurrentEuiBreakpoint()"
        snippetLanguage="js"
      />

      <ThemeExample
        title={<code>useIsWithinBreakpoints(sizes[], isResponsive?)</code>}
        type="hook"
        description={
          <>
            <p>
              This hook returns true or false if the current browser window
              width is within the passed breakpoint <EuiCode>sizes</EuiCode>.{' '}
              The <EuiCode>isResponsive</EuiCode> parameter allows it to easily
              be turned on/off from within your component.
            </p>
            <p>
              You can also use <EuiCode>useIsWithinMaxBreakpoint(size)</EuiCode>{' '}
              and <EuiCode>useIsWithinMinBreakpoint(size)</EuiCode>. The min/max
              hooks return true or false if the current browser window width is
              above or below the passed breakpoint <EuiCode>size</EuiCode>{' '}
              respectively.
            </p>
            <p>
              These hooks automatically inherits breakpoint sizes from the
              current EUI theme and any theme overrides.
            </p>
          </>
        }
        example={
          <EuiText size="s">
            <p>
              Targeting large devices only:{' '}
              {useIsWithinBreakpoints(['l', 'xl']) ? (
                <EuiIcon type="checkInCircleFilled" color="success" />
              ) : (
                <EuiIcon type="cross" color="danger" />
              )}
            </p>
            <p>
              Targeting medium devices and below:{' '}
              {useIsWithinMaxBreakpoint('m') ? (
                <EuiIcon type="checkInCircleFilled" color="success" />
              ) : (
                <EuiIcon type="cross" color="danger" />
              )}
            </p>
            <p>
              Targeting small devices and above:{' '}
              {useIsWithinMinBreakpoint('s') ? (
                <EuiIcon type="checkInCircleFilled" color="success" />
              ) : (
                <EuiIcon type="cross" color="danger" />
              )}
            </p>
          </EuiText>
        }
        snippet={`useIsWithinBreakpoints(['l', 'xl'])
useIsWithinMaxBreakpoint('m')
useIsWithinMinBreakpoint('s')`}
        snippetLanguage="js"
      />

      <ThemeExample
        title={<code>useEuiBreakpoint(sizes[])</code>}
        type="hook"
        description={
          <p>
            Given an array of screen sizes, this hook generates a CSS media
            query string based on the minimum and maximum screen sizes provided.
          </p>
        }
        example={
          <p
            css={css`
              ${useEuiBreakpoint(['s', 'l'])} {
                font-weight: ${euiTheme.font.weight.bold};
              }
              ${useEuiBreakpoint(['xs', 's'])} {
                color: ${euiTheme.colors.textDanger};
              }
              ${useEuiBreakpoint(['m'])} {
                color: ${euiTheme.colors.textWarning};
              }
              ${useEuiBreakpoint(['l', 'xl'])} {
                color: ${euiTheme.colors.textSuccess};
              }
            `}
          >
            This text is bold on small to large screens, red on small and below
            screens, yellow on medium screens, and green on large and above
            screens.
          </p>
        }
        snippet={`\${useEuiBreakpoint(['s', 'l'])} {
    font-weight: bold;
  }
  \${useEuiBreakpoint(['xs', 's'])} {
    color: red;
  }
  \${useEuiBreakpoint(['m'])} {
    color: yellow;
  }
  \${useEuiBreakpoint(['l', 'xl'])} {
    color: green;
  }`}
        snippetLanguage="emotion"
      />

      <ThemeExample
        title={
          <>
            <code>useEuiMaxBreakpoint(size)</code>
            <br />
            <code>useEuiMinBreakpoint(size)</code>
          </>
        }
        type="hook"
        description={
          <p>
            Given a single breakpoint key, these hooks generate a min or max CSS
            media query string based on the single breakpoint dimension
            returned.
          </p>
        }
        example={
          <p
            css={css`
              ${useEuiMaxBreakpoint('m')} {
                color: ${euiTheme.colors.textDanger};
              }
              ${useEuiMinBreakpoint('m')} {
                color: ${euiTheme.colors.textSuccess};
              }
            `}
          >
            This text is red on screens below the medium breakpoint, and green
            on screens above.
          </p>
        }
        snippet={`\${useEuiMaxBreakpoint('m')} {
    color: red;
  }
  \${useEuiMinBreakpoint('m')} {
    color: green;
  }`}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const CUSTOM_BREAKPOINTS = {
  xxs: 0,
  xs: 250,
  s: 500,
  m: 1000,
  l: 1500,
  xl: 2000,
  xxl: 2500,
};
export const CustomBreakpointsJS = () => {
  const currentBreakpoint = useCurrentEuiBreakpoint();

  return (
    <ThemeExample
      title={<code>EuiProvider</code>}
      type="theme"
      description={
        <>
          <p>
            Theme breakpoints can be overriden or added via{' '}
            <EuiCode>EuiProvider</EuiCode>&apos;s or{' '}
            <EuiCode>EuiThemeProvider</EuiCode>&apos;s <EuiCode>modify</EuiCode>{' '}
            prop.
          </p>
          <p>
            Excluding a default breakpoint key in your{' '}
            <EuiCode>breakpoint</EuiCode> override will use the EUI default
            value for that size as a fallback.
          </p>
        </>
      }
      example={
        <p>
          Current custom breakpoint: <strong>{currentBreakpoint}</strong>
        </p>
      }
      snippet={`<EuiThemeProvider
  modify={{
    breakpoint: {
      xxs: 0,
      xs: 250,
      s: 500,
      m: 1000,
      l: 1500,
      xl: 2000,
      xxl: 2500,
    },
  }}
>
  <App />
</EuiThemeProvider>
`}
      snippetLanguage="js"
    />
  );
};

export const BreakpointValuesJS = () => {
  const {
    euiTheme: { breakpoint },
  } = useEuiTheme();
  const breakpoints = Object.keys(sortMapBySmallToLargeValues(breakpoint));
  const currentBreakpoint = useCurrentEuiBreakpoint();

  return (
    <ThemeValuesTable
      items={breakpoints.map((size) => {
        return {
          id: size,
          token: `breakpoint.${size}`,
          type: euiThemeBreakpointType,
          value: breakpoint[size],
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
  );
};
