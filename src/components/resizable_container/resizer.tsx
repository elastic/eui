import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';

export type ResizerMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ResizerKeyDownEvent = React.KeyboardEvent<HTMLButtonElement>;

export type ResizerSize = 'none' | 's' | 'm' | 'l';

interface Controls {
  onKeyDown: (eve: ResizerKeyDownEvent) => void;
  onMouseDown: (eve: ResizerMouseEvent) => void;
  isHorizontal: boolean;
}

interface Props extends CommonProps {
  /**
   * The size of the Resizer (the space between panels)
   */
  size?: ResizerSize;
}

const sizeToClassNameMap = {
  none: null,
  s: 'euiResizer--sizeSmall',
  m: 'euiResizer--sizeMedium',
  l: 'euiResizer--sizeLarge',
  xl: 'euiResizer--sizeExtraLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const Resizer: FunctionComponent<Props & Controls> = ({
  isHorizontal,
  className,
  size = 'm',
  ...rest
}) => {
  const classes = classNames(
    'euiResizer',
    size ? sizeToClassNameMap[size] : null,
    {
      'euiResizer--vertical': !isHorizontal,
      'euiResizer--horizontal': isHorizontal,
    },
    className
  );

  return (
    <EuiI18n
      tokens={[
        'euiResizer.horizontalResizerAriaLabel',
        'euiResizer.verticalResizerAriaLabel',
      ]}
      defaults={[
        'Press left/right to adjust panels size',
        'Press up/down to adjust panels size',
      ]}>
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="splitPanelResizer"
          {...rest}>
          <div className="euiResizer__handle" />
        </button>
      )}
    </EuiI18n>
  );
};

export function resizerWithControls(controls: Controls) {
  return (props: CommonProps) => <Resizer {...controls} {...props} />;
}
