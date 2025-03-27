import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { css, SerializedStyles } from '@emotion/react';
import debounce from 'lodash/debounce';
import {
  EuiCode,
  EuiColorPicker,
  EuiColorPickerProps,
  EuiFlexGroup,
  EuiFlexGroupProps,
  EuiFlexItem,
  EuiText,
  EuiFieldNumber,
  EuiFieldNumberProps,
  EuiFieldText,
  EuiFieldTextProps,
  isValidHex,
  useColorPickerState,
  EuiSetColorMethod,
  useEuiTheme,
  EuiToolTip,
  EuiColorPickerSwatch,
} from '../../../../../src';

// @ts-ignore NOT TS yet
import { humanizeType } from '../../../services/playground/knobs';
import { getDescription } from '../../../services/props/get_description';

export const LANGUAGES = ['javascript', 'html'] as const;

type ThemeValue = {
  property: string;
  name: string;
  value?: ReactNode;
  example?: ReactNode;
  groupProps?: EuiFlexGroupProps;
  buttonStyle?: SerializedStyles;
  onUpdate?: (color: string | number) => void;
  type?: any;
  numberProps?: EuiFieldNumberProps;
  stringProps?: EuiFieldTextProps;
  colorProps?: Partial<EuiColorPickerProps>;
  forceUpdateType?: 'string' | 'number' | 'color';
};

export const ThemeValue: FunctionComponent<ThemeValue> = ({
  property,
  name,
  value,
  example,
  groupProps,
  buttonStyle,
  onUpdate,
  type,
  numberProps,
  stringProps,
  colorProps,
  forceUpdateType,
}) => {
  const { euiTheme } = useEuiTheme();

  const [color, setColor, errors] = useColorPickerState(
    isValidHex(String(value)) ? String(value) : ''
  );

  useEffect(() => {
    if (typeof value === 'string')
      setColor(value, { hex: value, isValid: true });
    // Safe to omit setState function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnUpdate = useCallback(
    debounce<(...args: any[]) => void>((hex, isValid) => {
      if (isValid) {
        onUpdate && onUpdate(hex);
      }
    }, 100),
    [onUpdate]
  );

  const handleColorChange: EuiSetColorMethod = (text, { hex, isValid }) => {
    setColor(text, { hex, isValid });
    debouncedOnUpdate(hex, isValid);
  };
  let exampleRender;
  if (
    example !== null &&
    (property === 'colors' || name.toLowerCase().includes('color'))
  ) {
    exampleRender = (
      <EuiFlexItem grow={false}>
        <EuiColorPickerSwatch color={color} disabled />
      </EuiFlexItem>
    );
  } else if (example || buttonStyle) {
    exampleRender = (
      <EuiFlexItem grow={false}>
        <span css={buttonStyle}>{example}</span>
      </EuiFlexItem>
    );
  }

  let typeRender: ReactNode;
  if (type?.custom?.origin?.type) {
    typeRender = (
      <span
        css={css`
          font-weight: ${euiTheme.font.weight.light};
          color: ${euiTheme.colors.textSubdued};
        `}
      >
        : {humanizeType(type.custom.origin.type)}
      </span>
    );
  }

  let descriptionRender;
  if (type?.description) {
    descriptionRender = <>{getDescription(type)}</>;
  }

  const valueRender = () => {
    if (!onUpdate) {
      return (
        <EuiText textAlign="right" size="s" color="subdued">
          <code>{value}</code>
        </EuiText>
      );
    }

    let updateType = forceUpdateType;
    if (
      !updateType &&
      (property === 'colors' || name.toLowerCase().includes('color'))
    ) {
      updateType = 'color';
    } else if (!updateType && typeof value === 'number') {
      updateType = 'number';
    } else if (
      !updateType &&
      property !== 'colors' &&
      !name.toLowerCase().includes('color') &&
      typeof value === 'string'
    ) {
      updateType = 'string';
    }

    if (updateType === 'color') {
      return (
        <EuiFlexItem grow={false}>
          <EuiColorPicker
            swatches={[]}
            onChange={handleColorChange}
            color={color}
            isInvalid={!!errors}
            compressed
            {...colorProps}
          />
        </EuiFlexItem>
      );
    } else if (updateType === 'number') {
      return (
        <EuiFieldNumber
          compressed
          aria-label={`Update ${name} value`}
          value={Number(value)}
          onChange={(e) => onUpdate(Number(e.target.value))}
          style={{ width: 64 }}
          {...numberProps}
        />
      );
    } else if (updateType === 'string') {
      return (
        <EuiFieldText
          compressed
          aria-label={`Update ${name} value`}
          value={String(value)}
          onChange={(e) => onUpdate(e.target.value)}
          style={{ width: 120 }}
          {...stringProps}
        />
      );
    }
  };

  name = property ? `${property}.${name}` : name;

  return (
    <EuiFlexGroup responsive={false} alignItems="flexStart" {...groupProps}>
      {exampleRender}
      <EuiFlexItem grow={true}>
        <EuiText size="s">
          <EuiToolTip content={descriptionRender}>
            <EuiCode
              css={css`
                padding: 0 !important;
              `}
              language="ts"
              transparentBackground
            >
              {name}
              {typeRender}
            </EuiCode>
          </EuiToolTip>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>{valueRender()}</EuiFlexItem>
    </EuiFlexGroup>
  );
};
