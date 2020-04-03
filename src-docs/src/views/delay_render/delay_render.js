import React, { useState, Fragment } from 'react';
import {
  EuiDelayRender,
  EuiFlexItem,
  EuiCheckbox,
  EuiFormRow,
  EuiFieldNumber,
  EuiLoadingSpinner,
} from '../../../../src/components';

export default () => {
  const [minimumDelay, setDelay] = useState(3000);
  const [render, setRender] = useState(false);

  const onChangeMinimumDelay = event => {
    setDelay(parseInt(event.target.value, 10));
  };

  const onChangeHide = event => {
    setRender(event.target.checked);
  };

  const status = render ? 'showing' : 'hidden';
  const label = `Child (${status})`;
  return (
    <Fragment>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiCheckbox
            id="dummy-id"
            checked={render}
            onChange={onChangeHide}
            label="Show child"
          />
        </EuiFormRow>
        <EuiFormRow label="Minimum delay">
          <EuiFieldNumber
            value={minimumDelay}
            onChange={onChangeMinimumDelay}
          />
        </EuiFormRow>

        <EuiFormRow label={label}>
          {render ? (
            <EuiDelayRender delay={minimumDelay}>
              <EuiLoadingSpinner size="m" />
            </EuiDelayRender>
          ) : (
            <Fragment />
          )}
        </EuiFormRow>
      </EuiFlexItem>
    </Fragment>
  );
};
