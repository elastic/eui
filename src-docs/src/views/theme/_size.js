import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCopy,
  EuiCode,
} from '../../../../src/components';

const SizeSquare = ({ name, size }) => {
  const { euiTheme } = useEuiTheme();
  const iconSize = typeof size === 'number' ? `${size}px` : size;

  const style = css`
    width: ${iconSize};
    height: ${iconSize};
    border-radius: min(25%, ${euiTheme.border.radiusSmall});
    background: ${euiTheme.colors.mediumShade};
  `;

  return (
    <EuiFlexItem key={name} grow={false}>
      <EuiFlexGroup responsive={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiCopy
            beforeMessage="Click to copy full theme variable"
            textToCopy={`euiTheme.size.${name}`}>
            {(copy) => <button onClick={copy} css={style} />}
          </EuiCopy>
        </EuiFlexItem>
        <EuiFlexItem grow={true}>
          <EuiText size="s">
            <EuiCode transparentBackground>{name}</EuiCode>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s" color="subdued">
            <p>
              <code>{size}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
};

export default () => {
  const { euiTheme } = useEuiTheme();
  const sizes = euiTheme.size;

  return (
    <div>
      <EuiTitle>
        <h2>Size</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText>
            <p>
              All sizing keys are calculated from a single{' '}
              <EuiCode>base</EuiCode> integer and evaluate to pixel values.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              <SizeSquare name="base" size={euiTheme.base} />
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {Object.keys(sizes).map((size) => (
                <SizeSquare name={size} size={sizes[size]} />
              ))}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
