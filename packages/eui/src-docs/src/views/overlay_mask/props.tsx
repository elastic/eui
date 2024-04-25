import React, { FunctionComponent } from 'react';
import { CommonProps } from '../../../../src/components/common';
import { EuiOverlayMaskInterface } from '../../../../src/components/overlay_mask/overlay_mask';

export const EuiOverlayMaskProps: FunctionComponent<
  EuiOverlayMaskInterface & Omit<CommonProps, 'css'>
> = () => <div />;
