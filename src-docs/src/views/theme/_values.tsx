import React, { FunctionComponent, ReactNode } from 'react';
import { EuiButtonEmpty } from '../../../../src/components/button';
import { EuiCode } from '../../../../src/components/code';
import { EuiColorPicker } from '../../../../src/components/color_picker';
import { EuiCopy } from '../../../../src/components/copy';
import {
  EuiFlexGroup,
  EuiFlexGroupProps,
  EuiFlexItem,
} from '../../../../src/components/flex';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiText } from '../../../../src/components/text';
import { isValidHex, useColorPickerState } from '../../../../src/services';

export const LANGUAGES = ['javascript', 'html'] as const;

type ThemeValue = {
  property: string;
  name: string;
  value?: ReactNode;
  example?: ReactNode;
  groupProps?: EuiFlexGroupProps;
  buttonStyle?: any; // What is the Emotion CSS type?
  onUpdate?: (color: string) => void;
};

export const ThemeValue: FunctionComponent<ThemeValue> = ({
  property,
  name,
  value,
  example,
  groupProps,
  buttonStyle,
  onUpdate,
}) => {
  // Add dot if property exists
  property = property ? `.${property}` : '';

  const [color, setColor, errors] = useColorPickerState(
    isValidHex(String(value)) ? String(value) : ''
  );

  const handleColorChange = (text, { hex, isValid }) => {
    setColor(text, { hex, isValid });
    onUpdate && onUpdate(hex);
  };

  let exampleRender;
  if (property === '.color' && onUpdate) {
    exampleRender = (
      <EuiFlexItem grow={false}>
        <EuiColorPicker
          onChange={handleColorChange}
          color={color}
          isInvalid={!!errors}
          secondaryInputDisplay="bottom"
          button={<button css={buttonStyle}>{example}</button>}
        />
      </EuiFlexItem>
    );
  } else if (example || buttonStyle) {
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

  return (
    <EuiFlexGroup responsive={false} alignItems="center" {...groupProps}>
      {exampleRender}
      <EuiFlexItem grow={true}>
        <EuiText size="s">
          <EuiCode transparentBackground>{name}</EuiCode>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText size="s" color="subdued">
          <code>{value}</code>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
