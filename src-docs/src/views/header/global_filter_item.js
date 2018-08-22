import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiBadge, EuiPopover, EuiContextMenu } from '../../../../src/components';
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

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

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

    let icon;
    let badgeColor = 'hollow';

    if (isDisabled) {
      icon = 'eyeClosed';
      badgeColor = 'default';
    } else if (isExcluded) {
      icon = 'minusInCircle';
    }

    const badge = (
      <EuiBadge
        id={id}
        className={classes}
        iconType={icon}
        color={badgeColor}
        onClick={this.togglePopover}
        onClickAriaLabel="Filter options"
        {...rest}
      >
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
          name: `${filter.isDisabled ? 'Enable' : 'Disable'}`,
          icon: `${filter.isDisabled ? 'eye' : 'eyeClosed'}`,
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: `${filter.isPinned ? 'Unpin' : 'Pin'}`,
          icon: 'pin',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: `${filter.isExcluded ? 'Include' : 'Exclude'}`,
          icon: `${filter.isExcluded ? 'plusInCircle' : 'minusInCircle'}`,
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Remove',
          icon: 'trash',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Edit',
          icon: 'pencil',
          panel: {
            id: 1,
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
      >
        <EuiContextMenu initialPanelId={0} panels={flattenPanelTree(panelTree)} />
      </EuiPopover>
    );
  };
}
