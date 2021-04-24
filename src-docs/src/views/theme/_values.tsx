import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode } from '../../../../src/components/code';
import { EuiCopy } from '../../../../src/components/copy';
import {
  EuiFlexGroup,
  EuiFlexGroupProps,
  EuiFlexItem,
} from '../../../../src/components/flex';
import { EuiText } from '../../../../src/components/text';

export const LANGUAGES = ['javascript', 'html'] as const;

type ThemeValue = {
  property: string;
  name: string;
  value?: ReactNode;
  example?: ReactNode;
  groupProps?: EuiFlexGroupProps;
  buttonStyle?: any; // WHat is the EMtion CSS type?
};

export const ThemeValue: FunctionComponent<ThemeValue> = ({
  property,
  name,
  value,
  example,
  groupProps,
  buttonStyle,
}) => {
  // Add dot if property exists
  property = property ? `.${property}` : '';

  return (
    <EuiFlexGroup responsive={false} alignItems="center" {...groupProps}>
      {example || buttonStyle ? (
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
      ) : undefined}
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
