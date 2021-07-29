import React from 'react';
import { Link } from 'react-router-dom';
import { useEuiTheme } from '../../../../src/services';

import { EuiText, EuiSpacer, EuiFlexItem } from '../../../../src/components';

import { useDebouncedUpdate } from './hooks';

import { ThemeSection } from './_theme_section';
import { ThemeValue } from './_values';

import { getPropsFromThemeKey, _EuiThemeBreakpoint } from './_props';

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
        <p>
          It is not recommended to consume these values directly, but to use one
          of our <Link to="/utilities/responsive">responsive components</Link>.
        </p>
      </EuiText>
      <EuiSpacer />

      <ThemeSection
        code="EuiThemeBreakpoint"
        description={
          <p>
            These original set of breakpoint keys specify the minimum window
            size and are required. However, you can adjust and/or add more keys
            as needed.
          </p>
        }
        themeValues={Object.keys(breakpointTypes).map((prop) => {
          return (
            <EuiFlexItem key={prop} className={'guideSass__animRow'}>
              <ThemeValue
                property="breakpoint"
                type={breakpointTypes[prop]}
                name={prop}
                value={breakpointClone[prop]}
                onUpdate={(value) => updateBreakpoint(prop, value)}
                groupProps={{
                  alignItems: 'center',
                }}
              />
            </EuiFlexItem>
          );
        })}
      />
    </div>
  );
};
