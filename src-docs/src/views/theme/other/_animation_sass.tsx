import React, { FunctionComponent } from 'react';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';
import { ThemeRowType } from '../_props';

const animationSpeeds = [
  'euiAnimSpeedExtraFast',
  'euiAnimSpeedFast',
  'euiAnimSpeedNormal',
  'euiAnimSpeedSlow',
  'euiAnimSpeedExtraSlow',
];

const animationEases = ['euiAnimSlightBounce', 'euiAnimSlightResistance'];

export const SpeedSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  return (
    <ThemeExample
      title={<code>$euiAnimSpeed[Speed]</code>}
      description={description}
      example={
        <div className="guideSass__speedExample">
          <strong>Hover me</strong>
        </div>
      }
      snippet={'transition: background $euiAnimSpeedSlow;'}
      snippetLanguage="scss"
    />
  );
};

export const SpeedValuesSass = () => {
  const values = useJsonVars();
  return (
    <ThemeValuesTable
      items={animationSpeeds.map((speed) => {
        return {
          id: speed,
          token: `$${speed}`,
          value: `${values[speed]}`,
        };
      })}
      sampleColumnProps={{ width: '80px', align: 'left' }}
      render={(item) => (
        <div className={'guideSass__animRow'}>
          <div className={'guideSass__animParent'}>
            <div
              className="guideSass__animChild"
              // Using inline style tag to override `:focus`
              style={{
                transitionDuration: item.value,
              }}
            />
          </div>
        </div>
      )}
    />
  );
};

export const EasingSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  return (
    <ThemeExample
      title={<code>$euiThemeAnimation[Ease]</code>}
      description={description}
      example={
        <div className="guideSass__easeExample">
          <strong>Hover me</strong>
        </div>
      }
      snippet={
        'transition: padding $euiAnimSpeedSlow $euiAnimSlightResistance;'
      }
      snippetLanguage="scss"
    />
  );
};

export const EasingValuesSass = () => {
  const values = useJsonVars();
  return (
    <ThemeValuesTable
      items={animationEases.map((ease) => {
        return {
          id: ease,
          token: `$${ease}`,
          value: `${values[ease]}`,
        };
      })}
      sampleColumnProps={{ width: '80px', align: 'left' }}
      valueColumnProps={{ width: '260px' }}
      render={(item) => (
        <div className={'guideSass__animRow'}>
          <div className={'guideSass__animParent'}>
            <div
              className="guideSass__animChild"
              // Using inline style tag to override `:focus`
              style={{
                transitionTimingFunction: item.value,
              }}
            />
          </div>
        </div>
      )}
    />
  );
};
