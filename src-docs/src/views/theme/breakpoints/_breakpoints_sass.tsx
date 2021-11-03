import React from 'react';

import { EuiCode, EuiIcon } from '../../../../../src';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export default () => {
  const values = useJsonVars();
  const euiBreakpoints = values.euiBreakpoints;
  const euiBreakpointKeys = Object.keys(euiBreakpoints);

  return (
    <>
      <ThemeExample
        title={'Mixin'}
        description={
          <p>
            Breakpoints in EUI are provided through the use of a Sass mixin{' '}
            <EuiCode>@include euiBreakpoint()</EuiCode> that accepts an array of
            sizes.
          </p>
        }
        example={<p>Targeting mobile devices only</p>}
        snippet="@include euiBreakpoint('xs','s') {...}"
        snippetLanguage="scss"
      />

      <ThemeExample
        title={'Sass map'}
        description={
          <p>
            The actual breakpoint values are provided through a map of values
            called <EuiCode>$euiBreakpoints</EuiCode>. If you just need to grab
            the minimum width of a particular breakpoint you can use{' '}
            <EuiCode>map-get()</EuiCode>.
          </p>
        }
        example={<p>Grabbing minimum window width for small breakpoint</p>}
        snippet="map-get($euiBreakpoints, 's')"
        snippetLanguage="scss"
      />

      <ThemeValuesTable
        items={euiBreakpointKeys.map((size) => {
          return {
            id: size,
            token: `$euiBreakpoints.${size}`,
            value: `${euiBreakpoints[size]}`,
          };
        })}
        valueColumnProps={{
          title: 'Min width',
        }}
        sampleColumnProps={{
          title: 'Current',
          width: '80px',
        }}
        render={(item) => (
          <div className={`guideSass__breakpoint--${item.id}`}>
            <EuiIcon
              title="Current window size is within this breakpoint"
              type="checkInCircleFilled"
              color="success"
            />
          </div>
        )}
      />
    </>
  );
};
