import React, { useState, useEffect } from 'react';

import { EuiFocusTrap } from '../focus_trap';
import { EuiPopover, EuiPopoverPropTypes } from './popover';

export const EuiInputPopover = ({
  children,
  input,
  popoverZIndex,
  ...props
}) => {
  const [inputEl, setInputEl] = useState();
  const [inputElWidth, setInputElWidth] = useState();
  const [panelEl, setPanelEl] = useState();
  const inputRef = node => setInputEl(node);
  const panelRef = node => setPanelEl(node);
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
  return (
    <EuiPopover
      ownFocus={false}
      button={input}
      buttonRef={inputRef}
      panelRef={panelRef}
      {...props}>
      <EuiFocusTrap clickOutsideDisables={true}>{children}</EuiFocusTrap>
    </EuiPopover>
  );
};

const { button, buttonRef, ...propTypes } = EuiPopoverPropTypes;
EuiInputPopover.propTypes = {
  input: EuiPopoverPropTypes.button,
  inputRef: EuiPopoverPropTypes.buttonRef,
  ...propTypes,
};

EuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  panelPaddingSize: 's',
};
