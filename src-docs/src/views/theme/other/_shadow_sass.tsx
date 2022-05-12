import React from 'react';
import { keysOf, _EuiShadowSizesDescriptions } from '../../../../../src';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

const shadows = {
  euiSlightShadow: 'xs',
  euiBottomShadowSmall: 's',
  euiBottomShadowMedium: 'm',
  euiBottomShadow: 'l',
  euiBottomShadowLarge: 'xl',
  euiBottomShadowFlat: {
    description:
      'Subtle shadow on all sides but is usually used for popovers that pop in the up direction.',
  },
};

export default () => {
  return (
    <>
      <ThemeExample
        title="Mixins"
        type={null}
        description={
          <>
            <p>
              Shadows can be applied through Sass mixins only. There are a
              variety of sizes depending on the layer depth you are trying to
              achieve.
            </p>
            <p>
              Usually you want to avoid putting shadows on containers with the
              same background color of its parent (e.g. white on white);
            </p>
          </>
        }
        examplePanel={{
          color: 'subdued',
        }}
        example={
          <div className="guideSass__shadow guideSass__shadow--euiBottomShadow">
            <strong>Works best on differently shaded backgrounds.</strong>
          </div>
        }
        snippet={'@include euiBottomShadow;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const ShadowValuesSass = () => {
  return (
    <>
      <ThemeValuesTable
        valign="middle"
        items={keysOf(shadows).map((shadow) => {
          return {
            id: shadow,
            token: `@mixin ${shadow};`,
            description:
              typeof shadows[shadow] === 'string'
                ? // @ts-ignore TODO
                  _EuiShadowSizesDescriptions[shadows[shadow]]
                : // @ts-ignore TODO
                  shadows[shadow].description,
          };
        })}
        render={(item) => (
          <div className={`guideSass__shadow guideSass__shadow--${item.id}`} />
        )}
      />
    </>
  );
};
