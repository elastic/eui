import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { EuiButtonEmpty } from '../../button';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../../context_menu';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPagination } from '../../pagination';
import { EuiPopover } from '../../popover';

export class EuiTablePagination extends Component {
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
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const {
      activePage,
      itemsPerPage,
      itemsPerPageOptions,
      onChangeItemsPerPage,
      onChangePage,
      pageCount,
    } = this.props;

    const button = (
      <EuiButtonEmpty
        size="xs"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}
      >
        {`Rows per page: ${itemsPerPage}`}
      </EuiButtonEmpty>
    );

    const items = itemsPerPageOptions.map(itemsPerPageOption => (
      <EuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => { this.closePopover(); onChangeItemsPerPage(itemsPerPageOption); }}
      >
        {`${itemsPerPageOption} rows`}
      </EuiContextMenuItem>
    ));

    return (
      <EuiFlexGroup justifyContent="spaceBetween" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="customizablePagination"
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover}
            panelPaddingSize="none"
            withTitle
            anchorPosition="upRight"
          >
            <EuiContextMenuPanel
              items={items}
            />
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPagination
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={onChangePage}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

EuiTablePagination.propTypes = {
  activePage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onChangeItemsPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
  pageCount: PropTypes.number,
};

EuiTablePagination.defaultProps = {
  itemsPerPage: 50,
  itemsPerPageOptions: [10, 20, 50, 100],
};
