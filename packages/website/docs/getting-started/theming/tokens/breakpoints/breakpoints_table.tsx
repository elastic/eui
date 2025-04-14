import {
  useEuiTheme,
  useCurrentEuiBreakpoint,
  EuiIcon,
  _EuiThemeBreakpoints,
} from '@elastic/eui';

import { ThemeValuesTable } from '../../theme_values_table';

const sortMapBySmallToLargeValues = (breakpointsMap: _EuiThemeBreakpoints) =>
  Object.fromEntries(
    Object.entries(breakpointsMap).sort(([, a], [, b]) => a - b)
  ) as _EuiThemeBreakpoints;

export const BreakpointsTable = () => {
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
