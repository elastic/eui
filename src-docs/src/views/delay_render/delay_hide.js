import React, { useState, Fragment } from 'react';
import {
  EuiDelayHide,
  EuiFlexItem,
  EuiCheckbox,
  EuiFormRow,
  EuiFieldNumber,
  EuiLoadingSpinner,
} from '../../../../src/components';

export default () => {
  const [minimumDuration, setDuration] = useState(3000);
  const [hide, setHide] = useState(false);

  const onChangeMinimumDuration = event => {
    setDuration(parseInt(event.target.value, 10));
  };

  const onChangeHide = event => {
    setHide(event.target.checked);
  };

  return (
    <Fragment>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiCheckbox
            id="dummy-id"
            checked={hide}
            onChange={onChangeHide}
            label="Hide child"
          />
        </EuiFormRow>
        <EuiFormRow label="Minimum duration">
          <EuiFieldNumber
            value={minimumDuration}
            onChange={onChangeMinimumDuration}
          />
        </EuiFormRow>

        <EuiFormRow label="Child to render">
          <EuiDelayHide
            hide={hide}
            minimumDuration={minimumDuration}
            render={() => <EuiLoadingSpinner size="m" />}
          />
        </EuiFormRow>
      </EuiFlexItem>
    </Fragment>
  );
};
