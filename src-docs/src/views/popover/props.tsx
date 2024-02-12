import React, { FunctionComponent } from 'react';

import { EuiPopoverProps } from '../../../../src/components/popover';

// For popover `panelProps` documentation, we shouldn't use `EuiPopoverPanelProps` directly
// as EuiPopover opinionatedly overrides some props that `EuiPopoverPanel` itself allows
export const EuiPopoverPanelProps: FunctionComponent<
  EuiPopoverProps['panelProps']
> = () => <div />;
