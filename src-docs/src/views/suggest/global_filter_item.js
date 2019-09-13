import React, { Component } from 'react';
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
    tree.items.forEach(item => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export class GlobalFilterItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isPinned: PropTypes.bool.isRequired,
    isExcluded: PropTypes.bool.isRequired,
  };

  state = {
    isPopoverOpen: false,
  };

  togglePopover = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  deleteFilter = e => {
    window.alert('Filter would have been deleted.');
    // Make sure it doesn't also trigger the onclick for the whole badge
    e.stopPropagation();
  };

  render() {
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
    } = this.props;

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
        iconOnClick={this.deleteFilter}
        iconOnClickAriaLabel={'Delete filter'}
        iconType="cross"
        iconSide="right"
        onClick={this.togglePopover}
        onClickAriaLabel="Filter actions"
        closeButtonProps={{
          // Removing tab focus on close button because the same option can be optained through the context menu
          // Also, we may want to add a `DEL` keyboard press functionality
          tabIndex: '-1',
        }}
        {...rest}>
        {prefix}
        <span>{field}: </span>
        <span>&quot;{value}&quot;</span>
      </EuiBadge>
    );

    return this._createFilterContextMenu(this.props, badge);
  }

  _createFilterContextMenu = (filter, button) => {
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
            this.closePopover();
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
                  onAdd={this.closePopover}
                  onCancel={this.closePopover}
                />
              </div>
            ),
          },
        },
        {
          name: `${filter.isExcluded ? 'Include results' : 'Exclude results'}`,
          icon: `${filter.isExcluded ? 'plusInCircle' : 'minusInCircle'}`,
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: `${filter.isDisabled ? 'Re-enable' : 'Temporarily disable'}`,
          icon: `${filter.isDisabled ? 'eye' : 'eyeClosed'}`,
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Delete',
          icon: 'trash',
          onClick: () => {
            this.closePopover();
          },
        },
      ],
    };

    return (
      <EuiPopover
        id={`popoverFor_${filter.id}`}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        button={button}
        anchorPosition="downCenter"
        panelPaddingSize="none"
        display="block">
        <EuiContextMenu
          initialPanelId={0}
          panels={flattenPanelTree(panelTree)}
        />
      </EuiPopover>
    );
  };
}
