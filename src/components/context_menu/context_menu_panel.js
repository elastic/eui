import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon, EuiPopoverTitle } from '..';

const transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'euiContextMenuPanel-txInLeft',
    out: 'euiContextMenuPanel-txOutLeft',
  },
  previous: {
    in: 'euiContextMenuPanel-txInRight',
    out: 'euiContextMenuPanel-txOutRight',
  },
};

export const EuiContextMenuPanel = ({
  children,
  className,
  onClose,
  title,
  panelRef,
  transitionType,
  transitionDirection,
  ...rest
}) => {
  let panelTitle;

  if (title) {
    if (Boolean(onClose)) {
      panelTitle = (
        <button
          className="euiContextMenuPanelTitle"
          type="button"
          onClick={onClose}
        >
          <span className="euiContextMenu__itemLayout">
            <EuiIcon
              type="arrowLeft"
              size="medium"
              className="euiContextMenu__icon"
            />

            {title}
          </span>
        </button>
      );
    } else {
      panelTitle = (
        <EuiPopoverTitle>
          <span className="euiContextMenu__itemLayout">
            {title}
          </span>
        </EuiPopoverTitle>
      );
    }
  }

  const hasTransition = transitionDirection && transitionType;
  const classes = classNames('euiContextMenuPanel', className, (
    hasTransition ? transitionDirectionAndTypeToClassNameMap[transitionDirection][transitionType] : ''
  ));

  return (
    <div
      ref={panelRef}
      className={classes}
      {...rest}
    >
      {panelTitle}
      {children}
    </div>
  );
};

EuiContextMenuPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  onClose: PropTypes.func,
  panelRef: PropTypes.func,
  transitionType: PropTypes.oneOf(['in', 'out']),
  transitionDirection: PropTypes.oneOf(['next', 'previous']),
};
