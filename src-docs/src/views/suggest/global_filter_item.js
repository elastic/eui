import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiBadge,
  EuiPopover,
  EuiContextMenu,
} from '../../../../src/components';
import GlobalFilterForm from './global_filter_form';

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach((item) => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export const GlobalFilterItem = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const deleteFilter = (e) => {
    // Make sure it doesn't also trigger the onclick for the whole badge
    e.stopPropagation();
  };

  const {
    className,
    id,
    field,
    operator, // eslint-disable-line no-unused-vars
    value,
    isDisabled,
    isPinned,
    isExcluded,
    ...rest
  } = props;

  const classes = classNames(
    'globalFilterItem',
    {
      'globalFilterItem-isDisabled': isDisabled,
      'globalFilterItem-isPinned': isPinned,
      'globalFilterItem-isExcluded': isExcluded,
    },
    className
  );

  let prefix = null;
  if (isExcluded) {
    prefix = <span>NOT </span>;
  }

  let title = `Filter: ${field}: "${value}". Select for more filter actions.`;
  if (isPinned) {
    title = `Pinned ${title}`;
  } else if (isDisabled) {
    title = `Disabled ${title}`;
  }

  const badge = (
    <EuiBadge
      id={id}
      className={classes}
      title={title}
      iconOnClick={deleteFilter}
      iconOnClickAriaLabel={'Delete filter'}
      color="hollow"
      iconType="cross"
      iconSide="right"
      onClick={togglePopover}
      onClickAriaLabel="Filter actions"
      closeButtonProps={{
        // Removing tab focus on close button because the same option can be optained through the context menu
        // Also, we may want to add a `DEL` keyboard press functionality
        tabIndex: '-1',
      }}
      {...rest}
    >
      {prefix}
      <span>{field}: </span>
      <span>&quot;{value}&quot;</span>
    </EuiBadge>
  );

  const _createFilterContextMenu = (filter, button) => {
    const selectedObject = {
      field: [{ label: filter.field }],
      operand: [{ label: filter.operator }],
      values: [{ label: filter.value }],
    };

    const panelTree = {
      id: 0,
      items: [
        {
          name: `${filter.isPinned ? 'Unpin' : 'Pin across all apps'}`,
          icon: 'pin',
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Edit filter query',
          icon: 'pencil',
          panel: {
            id: 1,
            width: 400,
            content: (
              <div style={{ padding: 16 }}>
                <GlobalFilterForm
                  selectedObject={selectedObject}
                  onAdd={closePopover}
                  onCancel={closePopover}
                />
              </div>
            ),
          },
        },
        {
          name: `${filter.isExcluded ? 'Include results' : 'Exclude results'}`,
          icon: `${filter.isExcluded ? 'plusInCircle' : 'minusInCircle'}`,
          onClick: () => {
            closePopover();
          },
        },
        {
          name: `${filter.isDisabled ? 'Re-enable' : 'Temporarily disable'}`,
          icon: `${filter.isDisabled ? 'eye' : 'eyeClosed'}`,
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Delete',
          icon: 'trash',
          onClick: () => {
            closePopover();
          },
        },
      ],
    };

    return (
      <EuiPopover
        id={`popoverFor_${filter.id}`}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        button={button}
        anchorPosition="downCenter"
        panelPaddingSize="none"
        display="block"
      >
        <EuiContextMenu
          initialPanelId={0}
          panels={flattenPanelTree(panelTree)}
        />
      </EuiPopover>
    );
  };

  return _createFilterContextMenu(props, badge);
};

GlobalFilterItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isPinned: PropTypes.bool.isRequired,
  isExcluded: PropTypes.bool.isRequired,
};
