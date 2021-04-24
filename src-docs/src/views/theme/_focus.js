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

export default () => {
  const { euiTheme } = useEuiTheme();
  const focus = euiTheme.focus;

  return (
    <div>
      <EuiTitle>
        <h2>Focus</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false}>
            <p>
              These are general properties that apply to the focus state of
              interactable components. Some components have their own specific
              implementation, but most use these variables.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {Object.keys(focus).map((key) => (
              <Values key={key} name={key} value={focus[key]} />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
