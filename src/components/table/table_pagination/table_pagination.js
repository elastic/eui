import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { EuiButtonEmpty } from '../../button';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../../context_menu';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPagination } from '../../pagination';
import { EuiPopover } from '../../popover';
import { EuiI18n } from '../../i18n';

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
      hidePerPageOptions,
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
        <EuiI18n token="euiTablePagination.rowsPerPage" default="Rows per page"/>: {itemsPerPage}
      </EuiButtonEmpty>
    );

    const items = itemsPerPageOptions.map(itemsPerPageOption => (
      <EuiContextMenuItem
        key={itemsPerPageOption}
        icon={itemsPerPageOption === itemsPerPage ? 'check' : 'empty'}
        onClick={() => { this.closePopover(); onChangeItemsPerPage(itemsPerPageOption); }}
      >
        <EuiI18n token="euiTablePagination.rowsPerPageOption" values={{ rowsPerPage: itemsPerPageOption }} default="{rowsPerPage} rows"/>
      </EuiContextMenuItem>
    ));

    const itemsPerPagePopover = (
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
    );

    return (
      <EuiFlexGroup justifyContent="spaceBetween" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          {hidePerPageOptions ? null : itemsPerPagePopover}
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
  hidePerPageOptions: PropTypes.bool,
  onChangeItemsPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
  pageCount: PropTypes.number,
};

EuiTablePagination.defaultProps = {
  itemsPerPage: 50,
  itemsPerPageOptions: [10, 20, 50, 100],
  hidePerPageOptions: false
};
