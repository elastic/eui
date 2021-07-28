import React, { Fragment } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton href="#/navigation/button">Link to elastic.co</EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty href="#/navigation/button">
          Link to elastic.co
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          href="#/navigation/button"
          iconType="link"
          aria-label="This is a link"
        />
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton href="#/navigation/button" isDisabled>
          Disabled link
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty href="#/navigation/button" isDisabled>
          Disabled empty link
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          href="#/navigation/button"
          iconType="link"
          aria-label="This is a link"
          isDisabled
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </Fragment>
);
