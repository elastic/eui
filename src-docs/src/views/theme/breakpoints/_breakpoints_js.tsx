import React from 'react';
import { css } from '@emotion/react';
import {
  EuiIcon,
  EuiCode,
  EuiThemeBreakpoints,
  useEuiBreakpoint,
  useCurrentEuiBreakpoint,
  useIsWithinBreakpoints,
  isWithinBreakpoints,
  useEuiTheme,
} from '../../../../../src';

import { EuiThemeBreakpoints as _EuiThemeBreakpoints } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export default () => {
  const currentBreakpoint = useCurrentEuiBreakpoint();
  const { euiTheme } = useEuiTheme();

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
            {isWithinBreakpoints(currentBreakpoint || 0, ['xs', 's']) ? (
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
            {useIsWithinBreakpoints(['l', 'xl']) ? (
              <EuiIcon type="checkInCircleFilled" color="success" />
            ) : (
              <EuiIcon type="cross" color="danger" />
            )}
          </p>
        }
        snippet="useIsWithinBreakpoints(['l', 'xl'])"
        snippetLanguage="js"
      />

      <ThemeExample
        title={<code>useEuiBreakpoint(sizes[])</code>}
        type="hook"
        description={
          <>
            <p>
              Given an array of breakpoint keys, this hook generates a CSS media
              query string based on the minimum width and maximum width
              provided.
            </p>
            <p>
              You can also create media queries with a{' '}
              <EuiCode>(max-width)</EuiCode> only or{' '}
              <EuiCode>(min-width)</EuiCode> only by utilizing the{' '}
              <EuiCode>xs</EuiCode> and <EuiCode>xl</EuiCode> arguments.
            </p>
          </>
        }
        example={
          <p
            css={css`
              ${useEuiBreakpoint(['s', 'l'])} {
                font-weight: ${euiTheme.font.weight.bold};
              }
              ${useEuiBreakpoint(['xs', 's'])} {
                color: ${euiTheme.colors.dangerText};
              }
              ${useEuiBreakpoint(['m'])} {
                color: ${euiTheme.colors.warningText};
              }
              ${useEuiBreakpoint(['l', 'xl'])} {
                color: ${euiTheme.colors.successText};
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
    </>
  );
};

export const BreakpointValuesJS = () => {
  const {
    euiTheme: { breakpoint },
  } = useEuiTheme();
  const breakpointTypes = getPropsFromComponent(_EuiThemeBreakpoints);
  const currentBreakpoint = useCurrentEuiBreakpoint();

  return (
    <>
      <ThemeValuesTable
        items={EuiThemeBreakpoints.map((size) => {
          return {
            id: size,
            token: `breakpoint.${size}`,
            type: breakpointTypes[size],
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
    </>
  );
};
