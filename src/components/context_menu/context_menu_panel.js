import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon, EuiPopoverTitle } from '..';

const transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'kuiContextMenuPanel-txInLeft',
    out: 'kuiContextMenuPanel-txOutLeft',
  },
  previous: {
    in: 'kuiContextMenuPanel-txInRight',
    out: 'kuiContextMenuPanel-txOutRight',
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
  ...rest,
}) => {
  let panelTitle;

  if (title) {
    if (Boolean(onClose)) {
      panelTitle = (
        <button
          className="kuiContextMenuPanelTitle"
          onClick={onClose}
        >
          <span className="kuiContextMenu__itemLayout">
            <EuiIcon
              type="arrowLeft"
              size="medium"
              className="kuiContextMenu__icon"
            />

            {title}
          </span>
        </button>
      );
    } else {
      panelTitle = (
        <EuiPopoverTitle>
          <span className="kuiContextMenu__itemLayout">
            {title}
          </span>
        </EuiPopoverTitle>
      );
    }
  }

  const hasTransition = transitionDirection && transitionType;
  const classes = classNames('kuiContextMenuPanel', className, (
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
  title: PropTypes.string,
  onClose: PropTypes.func,
  panelRef: PropTypes.func,
  transitionType: PropTypes.oneOf(['in', 'out']),
  transitionDirection: PropTypes.oneOf(['next', 'previous']),
};
