import React, { FunctionComponent } from 'react';

import { EuiCode, EuiColorPickerSwatch } from '../../../../../src';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';
import { ThemeRowType } from '../_props';

const euiBorders = ['euiBorderThin', 'euiBorderThick', 'euiBorderEditable'];

export const TypesSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiBorder[Type]</code>}
        description={description}
        example={
          <div className={'guideSass__border guideSass__border--euiBorderThin'}>
            <strong>{`border: ${values.euiBorderThin};`}</strong>
          </div>
        }
        snippet={'border: $euiBorderThin;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const TypesValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiBorders.map((type) => {
          return {
            id: type,
            token: `$${type}`,
            value: values[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={'transparent'}
            disabled
            className={`guideSass__border--${item.id}`}
          />
        )}
      />
    </>
  );
};

export const ColorSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  const token = 'euiBorderColor';
  const color = useJsonVars()[token];

  return (
    <>
      <ThemeExample
        title={<code>${token}</code>}
        description={description}
        example={
          <div className={'guideSass__border guideSass__border--euiBorderThin'}>
            <strong>{`border-color: ${color};`}</strong>
          </div>
        }
        snippet={`border-color: $${token};`}
        snippetLanguage="scss"
      />
    </>
  );
};

export const ColorValuesSass = () => {
  const token = 'euiBorderColor';
  const color = useJsonVars()[token];

  return (
    <>
      <ThemeValuesTable
        items={[token].map((type) => {
          return {
            id: type,
            token: `$${type}`,
            value: color,
          };
        })}
        render={() => (
          <EuiColorPickerSwatch showToolTip={false} color={color} disabled />
        )}
      />
    </>
  );
};

const euiBorderWidths = ['euiBorderWidthThin', 'euiBorderWidthThick'];

export const WidthSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiBorderWidth[Size]</code>}
        description={
          <p>
            {description}
            <EuiCode language="sass">$euiBorderColor</EuiCode>.
          </p>
        }
        example={
          <div className={'guideSass__border guideSass__border--thickDashed'}>
            <strong>{`border: ${values.euiBorderWidthThick} dashed ${values.euiBorderColor};`}</strong>
          </div>
        }
        snippet={'border: $euiBorderWidthThick dashed $euiBorderColor;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const WidthValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiBorderWidths.map((type) => {
          return {
            id: type,
            token: `$${type}`,
            value: values[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={'transparent'}
            disabled
            className={`guideSass__border--${item.id}`}
          />
        )}
      />
    </>
  );
};

const euiBorderRadii = ['euiBorderRadius', 'euiBorderRadiusSmall'];

export const RadiusSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiBorderRadius[Size?]</code>}
        description={description}
        example={
          <div
            className={'guideSass__border guideSass__border--euiBorderRadius'}
          >
            <strong>{`border-radius: ${values.euiBorderRadius};`}</strong>
          </div>
        }
        snippet={'border-radius: $euiBorderRadius;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const RadiusValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiBorderRadii.map((type) => {
          return {
            id: type,
            token: `$${type}`,
            value: values[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={'transparent'}
            disabled
            className={`guideSass__border--${item.id}`}
          />
        )}
      />
    </>
  );
};
