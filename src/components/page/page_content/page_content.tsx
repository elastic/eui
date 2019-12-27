import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiPanel, PanelPaddingSize, EuiPanelProps } from '../../panel/panel';

export type EuiPageContentVerticalPositions = 'center';
export type EuiPageContentHorizontalPositions = 'center';

const verticalPositionToClassNameMap: {
  [position in EuiPageContentVerticalPositions]: string | null
} = {
  center: 'euiPageContent--verticalCenter',
};

const horizontalPositionToClassNameMap: {
  [position in EuiPageContentHorizontalPositions]: string | null
} = {
  center: 'euiPageContent--horizontalCenter',
};

export type EuiPageContentProps = CommonProps &
  EuiPanelProps & {
    panelPaddingSize?: PanelPaddingSize;
    verticalPosition?: EuiPageContentVerticalPositions;
    horizontalPosition?: EuiPageContentHorizontalPositions;
  };

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  verticalPosition,
  horizontalPosition,
  panelPaddingSize = 'l',
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiPageContent',
    verticalPosition ? verticalPositionToClassNameMap[verticalPosition] : null,
    horizontalPosition
      ? horizontalPositionToClassNameMap[horizontalPosition]
      : null,
    className
  );

  return (
    <EuiPanel className={classes} paddingSize={panelPaddingSize} {...rest}>
      {children}
    </EuiPanel>
  );
};
