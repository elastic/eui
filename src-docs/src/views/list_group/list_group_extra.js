import React, { Fragment } from 'react';

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiListGroup>
      <EuiListGroupItem label="We use defaults" />

      <EuiListGroupItem
        label={
          <span>
            A very, very long item that <strong>will surely</strong> force
            truncation
          </span>
        }
      />
    </EuiListGroup>

    <EuiSpacer />

    <EuiListGroup>
      <EuiListGroupItem wrapText label="We wrap lines" />

      <EuiListGroupItem
        wrapText
        label={
          <span>
            A very, very long item that <strong>will surely</strong> force
            wrapping
          </span>
        }
      />
    </EuiListGroup>

    <EuiSpacer />

    <EuiListGroup showToolTips>
      <EuiListGroupItem label="We use tooltips" />

      <EuiListGroupItem
        label={
          <span>
            A very, very long item that <strong>will surely</strong> force
            truncation
          </span>
        }
      />
    </EuiListGroup>
  </Fragment>
);
