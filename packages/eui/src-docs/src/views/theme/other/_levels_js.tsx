import React from 'react';

import { ThemeValuesTable } from '../_components/_theme_values_table';
import { getPropsFromComponent } from '../../../services/props/get_props';
import {
  EuiThemeLevels,
  _EuiThemeLevels,
} from '../../../../../src/global_styling';
import { useEuiTheme } from '../../../../../src/services';
import { EuiThemeLevelsProps } from '../_props';

export default () => {
  const { euiTheme } = useEuiTheme();

  const levelsTypes = getPropsFromComponent(
    EuiThemeLevelsProps
  ) as unknown as _EuiThemeLevels;

  return (
    <>
      <ThemeValuesTable
        items={EuiThemeLevels.map((level) => {
          return {
            id: level,
            token: `levels.${level}`,
            type: levelsTypes[level],
            value: euiTheme.levels[level],
          };
        })}
        sampleColumnProps={{ title: '' }}
        render={(item) => (
          <div
            className="guideSass__level"
            style={{ opacity: item.value * 0.0001 }}
          />
        )}
      />
    </>
  );
};
