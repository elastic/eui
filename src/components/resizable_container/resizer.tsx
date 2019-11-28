import React from 'react';
import { EuiIcon } from '../icon';
import { EuiI18n } from '../i18n';

export type ResizerMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ResizerKeyDownEvent = React.KeyboardEvent<HTMLButtonElement>;

export interface ResizerProps {
  className?: string;
  isHorizontal?: boolean;
}

function Resizer(props: ResizerProps) {
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
            props.isHorizontal
              ? horizontalResizerAriaLabel
              : verticalResizerAriaLabel
          }
          className="euiResizer"
          data-test-subj="splitPanelResizer"
          {...props}>
          <EuiIcon type="grabHorizontal" />
        </button>
      )}
    </EuiI18n>
  );
}

export function resizerWithControls(controls: {
  onKeyDown: (eve: ResizerKeyDownEvent) => void;
  onMouseDown: (eve: ResizerMouseEvent) => void;
}) {
  return (props: ResizerProps) => <Resizer {...controls} {...props} />;
}
