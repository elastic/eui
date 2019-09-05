import React, {
  FunctionComponent,
  HTMLAttributes,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import tabbable from 'tabbable';

import { CommonProps, Omit } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiPopover, EuiPopoverProps } from './popover';
import { EuiResizeObserver } from '../observer/resize_observer';
import { cascadingMenuKeyCodes } from '../../services';

interface EuiInputPopoverProps
  extends Omit<EuiPopoverProps, 'button' | 'buttonRef'> {
  disableFocusTrap?: boolean;
  fullWidth?: boolean;
  input: EuiPopoverProps['button'];
  inputRef?: EuiPopoverProps['buttonRef'];
  onPanelResize?: (width?: number) => void;
}

type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiInputPopoverProps;

export const EuiInputPopover: FunctionComponent<Props> = ({
  children,
  className,
  disableFocusTrap = false,
  input,
  fullWidth = false,
  onPanelResize,
  ...props
}) => {
  const [inputEl, setInputEl] = useState();
  const [inputElWidth, setInputElWidth] = useState();
  const [panelEl, setPanelEl] = useState();

  const inputRef = (node: HTMLElement | null) => setInputEl(node);
  const panelRef = (node: HTMLElement | null) => setPanelEl(node);

  const setPanelWidth = (width?: number) => {
    if (panelEl && (!!inputElWidth || !!width)) {
      const newWidth = !!width ? width : inputElWidth;
      panelEl.style.width = `${newWidth}px`;
      if (onPanelResize) {
        onPanelResize(newWidth);
      }
    }
  };
  const onResize = () => {
    if (inputEl) {
      const width = inputEl.getBoundingClientRect().width;
      setInputElWidth(width);
      setPanelWidth(width);
    }
  };
  useEffect(() => {
    onResize();
  }, [inputEl]);
  useEffect(() => {
    setPanelWidth();
  }, [panelEl]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === cascadingMenuKeyCodes.TAB) {
      const tabbableItems = tabbable(panelEl).filter((el: HTMLElement) => {
        return (
          Array.from(el.attributes)
            .map(el => el.name)
            .indexOf('data-focus-guard') < 0
        );
      });
      if (
        disableFocusTrap ||
        (tabbableItems.length &&
          tabbableItems[tabbableItems.length - 1] === document.activeElement)
      ) {
        props.closePopover();
      }
    }
  };

  const classes = classnames(
    'euiInputPopover',
    {
      'euiInputPopover--fullWidth': fullWidth,
    },
    className
  );

  return (
    <EuiPopover
      ownFocus={false}
      button={
        <EuiResizeObserver onResize={onResize}>
          {resizeRef => <div ref={resizeRef}>{input}</div>}
        </EuiResizeObserver>
      }
      buttonRef={inputRef}
      panelRef={panelRef}
      className={classes}
      {...props}>
      <EuiFocusTrap clickOutsideDisables={true} disabled={disableFocusTrap}>
        <div onKeyDown={onKeyDown}>{children}</div>
      </EuiFocusTrap>
    </EuiPopover>
  );
};

EuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  panelPaddingSize: 's',
};
