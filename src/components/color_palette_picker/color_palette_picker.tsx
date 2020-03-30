import React, { FunctionComponent } from 'react';

import {
  EuiSuperSelect,
  EuiSuperSelectProps,
  EuiFormControlLayoutProps,
} from '../form';

import { EuiText } from '../text';

import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { CommonProps } from '../common';

import { EuiIcon } from '../icon';

export type EuiColorPalettePickerProps = CommonProps & {
  /**
   *  Use the compressed style for EuiColorPalette
   */
  compressed?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  readOnly?: boolean;
  isInvalid?: boolean;
  /**
   * Creates an input group with element(s) coming before input. It only shows when the `display` is set to `default`.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];

  /**
   * Creates an input group with element(s) coming after input. It only shows when the `display` is set to `default`.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
  /**
   * Whether to render the alpha channel (opacity) value range slider.
   */
  /**
   * Will format the text input in the provided format when possible (hue and saturation selection)
   * Exceptions: Manual text input and swatches will display as-authored
   * Default is to display the last format entered by the user
   */
  valueOfSelected?: any;

  /**
   * You must pass an `onChange` function to handle the update of the value
   */
  onChange?: (options: any) => void;
  /**
   * An array of objects. `value`: a unique value | `title`: the name of your palette (not required) | `type`: specify if your palette is a `gradient` or `stops` | `palette`: if your palette is a gradient pass a CSS linear gradient or if it's stops pass an array of hexadecimals
   */
  palettes: EuiSuperSelectProps<any>['options'];
};

export const EuiColorPalettePicker: FunctionComponent<
  EuiColorPalettePickerProps
> = ({
  className,
  compressed = false,
  disabled,
  fullWidth = false,
  isInvalid = false,
  onChange,
  readOnly = false,
  valueOfSelected,
  palettes,
  append,
  prepend,
}) => {
  const getPalette = (palettes: any, type: string) =>
    type === 'stops' ? (
      <div className="euiColorPalettePicker__colorContainer">
        {palettes.map((hexCode: string) => (
          <span
            title={hexCode}
            style={{ backgroundColor: hexCode }}
            key={hexCode}
            className={'euiColorPalettePicker__colorStop'}
          />
        ))}
      </div>
    ) : (
      <div
        className="euiColorPalettePicker__colorContainer"
        style={{ background: palettes }}
      />
    );

  const getButton = (title: any) => (
    <EuiFlexGroup gutterSize="xs">
      <EuiFlexItem>
        <EuiText size="xs">
          <span>{title}</span>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiIcon type="gear" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const paletteOptions = palettes.map((item: any) => {
    return {
      value: String(item.value),
      inputDisplay:
        item.type !== 'button'
          ? getPalette(item.palette, item.type)
          : getButton(item.title),
      dropdownDisplay: (
        <EuiFlexGroup gutterSize="xs" direction="column">
          {item.title && item.type !== 'button' && (
            <EuiFlexItem>
              <EuiText
                size="xs"
                className="euiColorPalettePicker__paletteTitle">
                <span>{item.title}</span>
              </EuiText>
            </EuiFlexItem>
          )}

          <EuiFlexItem>
            {item.type !== 'button'
              ? getPalette(item.palette, item.type)
              : getButton(item.title)}
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    };
  });

  return (
    <EuiSuperSelect
      className={className}
      options={paletteOptions}
      valueOfSelected={valueOfSelected}
      onChange={onChange}
      aria-label="Bars color palette"
      hasDividers
      isInvalid={isInvalid}
      compressed={compressed}
      disabled={disabled}
      readOnly={readOnly}
      fullWidth={fullWidth}
      append={append}
      prepend={prepend}
    />
  );
};
