import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonEmpty } from '../button/button_empty';
import { EuiPopover } from '../popover';
import { EuiContextMenuPanel } from '../context_menu';

export class EuiTableSortMobile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiTableSortMobile',
      className
    );

    const mobileSortButton = (
      <EuiButtonEmpty
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
      >
        Sorting
      </EuiButtonEmpty>
    );

    const mobileSortPopover = (
      <EuiPopover
        id="sortPopover"
        ownFocus
        button={mobileSortButton}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
        anchorPosition="downLeft"
        panelPaddingSize="none"
        style={{ minWidth: 200 }}
        {...rest}
      >
        <EuiContextMenuPanel
          items={children}
        />
      </EuiPopover>
    );

    return (
      <div className={classes}>
        {mobileSortPopover}
      </div>
    );
  }
}
