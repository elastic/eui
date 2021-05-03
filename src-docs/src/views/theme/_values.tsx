import React, { FunctionComponent, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { EuiCode } from '../../../../src/components/code';
import { EuiColorPicker } from '../../../../src/components/color_picker';
import { EuiCopy } from '../../../../src/components/copy';
import { EuiSpacer } from '../../../../src/components/spacer';
import {
  EuiFlexGroup,
  EuiFlexGroupProps,
  EuiFlexItem,
} from '../../../../src/components/flex';
import { EuiText } from '../../../../src/components/text';
import { EuiFieldNumber } from '../../../../src/components/form';
import {
  isValidHex,
  useColorPickerState,
  EuiSetColorMethod,
  useEuiTheme,
} from '../../../../src/services';
// @ts-ignore NOT TS yet
import { humanizeType, markup } from '../../services/playground/knobs';

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
}) => {
  const { euiTheme } = useEuiTheme();

  const [color, setColor, errors] = useColorPickerState(
    isValidHex(String(value)) ? String(value) : ''
  );
  const handleColorChange: EuiSetColorMethod = (text, { hex, isValid }) => {
    setColor(text, { hex, isValid });
    onUpdate && onUpdate(hex);
  };

  let exampleRender;
  if (property === 'color' && onUpdate) {
    exampleRender = (
      <EuiFlexItem grow={false}>
        <EuiColorPicker
          swatches={[]}
          onChange={handleColorChange}
          // @ts-ignore TODO
          color={color}
          isInvalid={!!errors}
          secondaryInputDisplay="bottom"
          button={<button css={buttonStyle}>{example}</button>}
        />
      </EuiFlexItem>
    );
  } else if (example || buttonStyle) {
    // Add dot if property exists
    property = property ? `.${property}` : '';
    exampleRender = (
      <EuiFlexItem grow={false}>
        <EuiCopy
          beforeMessage={`Click to copy euiTheme${property}.${name}`}
          textToCopy={`euiTheme${property}.${name}`}>
          {(copy) => (
            <button onClick={copy} css={buttonStyle}>
              {example}
            </button>
          )}
        </EuiCopy>
      </EuiFlexItem>
    );
  }

  let typeRender;
  if (type?.custom?.origin?.type) {
    typeRender = (
      <span
        css={css`
          font-weight: ${euiTheme.font.weight.light};
          color: ${euiTheme.colors.subdued};
        `}>
        : {humanizeType(type.custom.origin.type)}
      </span>
    );
  }

  let descriptionRender;
  if (type?.description) {
    descriptionRender = (
      <>
        <EuiSpacer size="xs" />
        <EuiText
          color="subdued"
          size="xs"
          css={css`
            padding: 0 ${euiTheme.size.s};
          `}>
          <i>{markup(type.description)}</i>
        </EuiText>
      </>
    );
  }

  let valueRender;
  if (typeof value === 'number' && onUpdate) {
    valueRender = (
      <EuiFieldNumber
        compressed
        aria-label="Update base value"
        value={value}
        onChange={(e) => onUpdate(Number(e.target.value))}
      />
    );
  } else {
    valueRender = (
      <EuiText size="s" color="subdued">
        <code>{value}</code>
      </EuiText>
    );
  }

  return (
    <EuiFlexGroup responsive={false} alignItems="flexStart" {...groupProps}>
      {exampleRender}
      <EuiFlexItem grow={true}>
        <EuiText size="s">
          <EuiCode language="ts" transparentBackground>
            {name}
            {typeRender}
          </EuiCode>
        </EuiText>
        {descriptionRender}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>{valueRender}</EuiFlexItem>
    </EuiFlexGroup>
  );
};
