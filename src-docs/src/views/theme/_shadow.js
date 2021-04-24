import React from 'react';
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
import { shadow } from '../../../../src/global_styling/variables/_shadows';
import { EuiIcon } from '../../../../src/components/icon';

const Values = ({ name, value, example, groupProps }) => {
  return (
    <EuiFlexItem key={name} grow={false}>
      <EuiFlexGroup responsive={false} alignItems="center" {...groupProps}>
        {example && (
          <EuiFlexItem grow={false}>
            <EuiCopy
              beforeMessage="Click to copy full theme variable"
              textToCopy={`euiTheme.size.${name}`}>
              {(copy) => <button onClick={copy}>{example}</button>}
            </EuiCopy>
          </EuiFlexItem>
        )}
        <EuiFlexItem grow={true}>
          <EuiText size="s">
            <EuiCode transparentBackground>{name}</EuiCode>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s" color="subdued">
            <p>
              <code>{value}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
};

const shadowKeys = Object.keys(shadow);

export default () => {
  const { euiTheme } = useEuiTheme();
  const shadow = euiTheme.shadow;

  return (
    <div>
      <EuiTitle>
        <h2>Shadow</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false}>
            <p>
              Currently, this key only holds the shadow color values. They will
              be transparentized in their application.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {shadowKeys.map((key) => (
              <Values
                key={key}
                name={key}
                value={shadow[key]}
                example={
                  <EuiIcon size="l" type="stopFilled" color={shadow[key]} />
                }
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
