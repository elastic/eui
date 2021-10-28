import React from 'react';

import { ThemeExample } from '../_components/_theme_example';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export const BaseSass = () => {
  const values = useJsonVars();
  return (
    <>
      <ThemeExample
        title={<code>$euiSize = {values.euiSize}</code>}
        description={
          <>
            <p>
              This base variable sets the scale for the entire theme. You can
              use calculations on top of the base value, or use one of the named
              scales below.
            </p>
          </>
        }
        example={
          <div className={'guideSass__euiSize'}>
            <strong>{`padding: ${values.euiSize};`}</strong>
          </div>
        }
        snippet={'padding: $euiSize;'}
        snippetLanguage="scss"
      />
    </>
  );
};

const euiSizes = [
  'euiSizeXS',
  'euiSizeS',
  'euiSizeM',
  'euiSize',
  'euiSizeL',
  'euiSizeXL',
  'euiSizeXXL',
];

export default () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiSize[Size]</code>}
        description={
          <>
            <p>Use the named keys as as much as possible.</p>
            <p>
              Sass can also interpret any math functions directly on pixel
              values.
            </p>
          </>
        }
        example={<div className={'guideSass__euiSizeXS2'} />}
        snippet={'padding: $euiSizeXS / 2;'}
        snippetLanguage="scss"
      />

      <ThemeValuesTable
        items={euiSizes.map((size) => {
          return {
            id: size,
            token: `$${size}`,
            value: values[size],
          };
        })}
        valign="middle"
        sampleColumnProps={{ width: '100px' }}
        render={(item) => (
          <div
            className="guideSass__size"
            style={{ width: item.value, height: item.value }}
          />
        )}
      />
    </>
  );
};
