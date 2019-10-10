import React, { Component } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiAvatar,
} from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
  },
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 5; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        imageUrl={fake('{{internet.avatar}}')}
        name={fake('{{name.lastName}}, {{name.firstName}}')}
      />
    ),
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: fake('{{address.city}}'),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

export default class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.borderOptions = [
      {
        id: 'all',
        label: 'All',
      },
      {
        id: 'horizontal',
        label: 'Horizontal only',
      },
      {
        id: 'none',
        label: 'None',
      },
    ];

    this.fontSizeOptions = [
      {
        id: 's',
        label: 'Small',
      },
      {
        id: 'm',
        label: 'Medium',
      },
      {
        id: 'l',
        label: 'Large',
      },
    ];

    this.cellPaddingOptions = [
      {
        id: 's',
        label: 'Small',
      },
      {
        id: 'm',
        label: 'Medium',
      },
      {
        id: 'l',
        label: 'Large',
      },
    ];

    this.stripeOptions = [
      {
        id: 'true',
        label: 'Stripes on',
      },
      {
        id: 'false',
        label: 'Stripes off',
      },
    ];

    this.rowHoverOptions = [
      {
        id: 'none',
        label: 'None',
      },
      {
        id: 'highlight',
        label: 'Highlight',
      },
    ];

    this.headerOptions = [
      {
        id: 'shade',
        label: 'Shade',
      },
      {
        id: 'underline',
        label: 'Underline',
      },
    ];

    this.state = {
      borderSelected: 'none',
      fontSizeSelected: 's',
      cellPaddingSelected: 's',
      stripesSelected: true,
      rowHoverSelected: 'highlight',
      isPopoverOpen: false,
      headerSelected: 'shade',

      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },

      visibleColumns: columns.map(({ id }) => id),
    };
  }

  onBorderChange = optionId => {
    this.setState({
      borderSelected: optionId,
    });
  };

  onFontSizeChange = optionId => {
    this.setState({
      fontSizeSelected: optionId,
    });
  };

  onCellPaddingChange = optionId => {
    this.setState({
      cellPaddingSelected: optionId,
    });
  };

  onStripesChange = optionId => {
    this.setState({
      stripesSelected: optionId === 'true',
    });
  };

  onRowHoverChange = optionId => {
    this.setState({
      rowHoverSelected: optionId,
    });
  };

  onHeaderChange = optionId => {
    this.setState({
      headerSelected: optionId,
    });
  };

  onPopoverButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  setPageIndex = pageIndex =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageIndex },
    }));

  setPageSize = pageSize =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageSize },
    }));

  setVisibleColumns = visibleColumns => this.setState({ visibleColumns });

  render() {
    const { pagination } = this.state;

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onPopoverButtonClick.bind(this)}>
        Table styling
      </EuiButton>
    );

    return (
      <div>
        <EuiPopover
          id="popover"
          button={button}
          isOpen={this.state.isPopoverOpen}
          anchorPosition="rightUp"
          zIndex={2}
          closePopover={this.closePopover.bind(this)}>
          <div>
            <EuiFormRow label="Border">
              <EuiButtonGroup
                legend="Border"
                options={this.borderOptions}
                idSelected={this.state.borderSelected}
                onChange={this.onBorderChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Cell padding">
              <EuiButtonGroup
                legend="Cell padding"
                options={this.cellPaddingOptions}
                idSelected={this.state.cellPaddingSelected}
                onChange={this.onCellPaddingChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Font size">
              <EuiButtonGroup
                legend="Fornt size"
                options={this.fontSizeOptions}
                idSelected={this.state.fontSizeSelected}
                onChange={this.onFontSizeChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Stripes">
              <EuiButtonGroup
                legend="Stripes"
                options={this.stripeOptions}
                idSelected={this.state.stripesSelected.toString()}
                onChange={this.onStripesChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Hover row">
              <EuiButtonGroup
                legend="Hover row"
                options={this.rowHoverOptions}
                idSelected={this.state.rowHoverSelected}
                onChange={this.onRowHoverChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Header">
              <EuiButtonGroup
                legend="Header"
                options={this.headerOptions}
                idSelected={this.state.headerSelected}
                onChange={this.onHeaderChange}
              />
            </EuiFormRow>
          </div>
        </EuiPopover>

        <EuiSpacer />

        <EuiDataGrid
          aria-label="Top EUI contributors"
          columns={columns}
          columnVisibility={{
            visibleColumns: this.state.visibleColumns,
            setVisibleColumns: this.setVisibleColumns,
          }}
          rowCount={data.length}
          gridStyle={{
            border: this.state.borderSelected,
            fontSize: this.state.fontSizeSelected,
            cellPadding: this.state.cellPaddingSelected,
            stripes: this.state.stripesSelected,
            rowHover: this.state.rowHoverSelected,
            header: this.state.headerSelected,
          }}
          renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
          pagination={{
            ...pagination,
            pageSizeOptions: [5, 10, 25],
            onChangeItemsPerPage: this.setPageSize,
            onChangePage: this.setPageIndex,
          }}
        />
      </div>
    );
  }
}
