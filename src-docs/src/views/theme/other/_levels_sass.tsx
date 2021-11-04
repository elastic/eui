import React from 'react';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

import { ThemeValuesTable } from '../_components/_theme_values_table';

const euiLevels = [
  'euiZToastList',
  'euiZModal',
  'euiZMask',
  'euiZNavigation',
  'euiZContentMenu',
  'euiZHeader',
  'euiZFlyout',
  'euiZMaskBelowHeader',
  'euiZDataGrid',
  'euiZContent',
];

export default () => {
  const values = useJsonVars();
  return (
    <>
      <ThemeValuesTable
        items={euiLevels.map((level) => {
          return {
            id: level,
            token: `$${level};`,
            value: values[level],
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
