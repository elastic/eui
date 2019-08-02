import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tabbable from 'tabbable';

import { EuiFocusTrap } from '../focus_trap';
import { EuiPopover, EuiPopoverPropTypes } from './popover';
import { cascadingMenuKeyCodes } from '../../services';

export const EuiInputPopover = ({
  children,
  className,
  fullWidth,
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
  const onKeyDown = e => {
    if (e.keyCode === cascadingMenuKeyCodes.TAB) {
      const tabbableItems = tabbable(panelEl).filter(el => {
        return (
          [...el.attributes].map(el => el.name).indexOf('data-focus-guard') < 0
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

const { button, buttonRef, ...propTypes } = EuiPopoverPropTypes;
EuiInputPopover.propTypes = {
  fullWidth: PropTypes.bool,
  input: EuiPopoverPropTypes.button,
  inputRef: EuiPopoverPropTypes.buttonRef,
  ...propTypes,
};

EuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  fullWidth: false,
  panelPaddingSize: 's',
};
