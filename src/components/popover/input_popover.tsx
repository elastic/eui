import React, {
  FunctionComponent,
  HTMLAttributes,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import tabbable from 'tabbable';

import { CommonProps } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiPopover, EuiPopoverProps } from './popover';
import { cascadingMenuKeyCodes } from '../../services';

interface EuiInputPopoverProps extends EuiPopoverProps {
  fullWidth?: boolean;
  input: EuiPopoverProps['button'];
  inputRef: EuiPopoverProps['buttonRef'];
}

type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiInputPopoverProps;

export const EuiInputPopover: FunctionComponent<Props> = ({
  children,
  className,
  fullWidth,
  input,
  ...props
}) => {
  const [inputEl, setInputEl] = useState();
  const [inputElWidth, setInputElWidth] = useState();
  const [panelEl, setPanelEl] = useState();

  const inputRef = (node: HTMLElement | null) => setInputEl(node);
  const panelRef = (node: HTMLElement | null) => setPanelEl(node);

  const setPanelWidth = () => {
    if (panelEl && inputElWidth) {
      panelEl.style.width = `${inputElWidth}px`;
    }
  };
  useEffect(() => {
    if (inputEl) {
      const width = inputEl.getBoundingClientRect().width;
      setInputElWidth(width);
      setPanelWidth();
    }
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
        tabbableItems.length &&
        tabbableItems[tabbableItems.length - 1] === document.activeElement
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
      button={input}
      buttonRef={inputRef}
      panelRef={panelRef}
      className={classes}
      {...props}>
      <EuiFocusTrap clickOutsideDisables={true}>
        <div onKeyDown={onKeyDown}>{children}</div>
      </EuiFocusTrap>
    </EuiPopover>
  );
};

EuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  fullWidth: false,
  panelPaddingSize: 's',
};
