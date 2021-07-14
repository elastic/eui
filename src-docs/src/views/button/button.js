import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => {}}>Primary</EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton fill onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton size="s" onClick={() => {}}>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <EuiFlexItem grow={false}>
        <EuiButton color="success" onClick={() => {}}>
          Success
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="success" fill onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="success" size="s" onClick={() => {}}>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="success" size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <EuiFlexItem grow={false}>
        <EuiButton color="warning" onClick={() => {}}>
          Warning
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="warning" fill onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="warning" size="s" onClick={() => {}}>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="warning" size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <EuiFlexItem grow={false}>
        <EuiButton color="danger" onClick={() => {}}>
          Danger
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="danger" fill onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="danger" size="s" onClick={() => {}}>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="danger" size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <EuiFlexItem grow={false}>
        <EuiButton color="text" onClick={() => {}}>
          Text
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="text" fill onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="text" size="s" onClick={() => {}}>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="text" size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <EuiFlexItem grow={false}>
        <EuiButton isDisabled onClick={() => {}}>
          Disabled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton isDisabled fill onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton isDisabled size="s" onClick={() => {}}>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton isDisabled size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
