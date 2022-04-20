import React from 'react';

import {
  EuiText,
  EuiSpacer,
  useEuiTheme,
  EuiPanel,
  EuiTitle,
} from '../../../../../src';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { useDebouncedUpdate } from '../hooks';

import { ThemeValue } from './_values';

import { EuiThemeLevelsProps } from '../_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const levels = euiTheme.levels;
  const [levelClone, updateLevel] = useDebouncedUpdate({
    property: 'levels',
    value: levels,
    onUpdate: onThemeUpdate,
  });

  const levelsTypes = getPropsFromComponent(EuiThemeLevelsProps);

  return (
    <div>
      <EuiText>
        <h2>Levels (z-index)</h2>
      </EuiText>
      <EuiSpacer size="xl" />
      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeLevels</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            This list is a stringent set of leveling constants. It is fragile
            and yet the values should be considered only competitive as
            siblings.
          </p>
        </EuiText>

        <EuiSpacer />

        {Object.keys(levelsTypes).map((prop) => {
          return (
            <ThemeValue
              key={prop}
              property="levels"
              type={levelsTypes[prop]}
              name={prop}
              value={levelClone[prop]}
              onUpdate={(value) => updateLevel(prop, value)}
              groupProps={{
                alignItems: 'center',
              }}
              numberProps={{
                style: { width: 140 },
              }}
            />
          );
        })}
      </EuiPanel>
    </div>
  );
};
