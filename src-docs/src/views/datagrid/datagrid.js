import React, { Component } from 'react';

import {
  EuiDataGrid,
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiButtonIcon,
  EuiLink,
} from '../../../../src/components/';
import { iconTypes } from '../../../../src-docs/src/views/icon/icons';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'avatar_url',
  },
  {
    id: 'url',
  },
  {
    id: 'contributions',
  },
  {
    id: 'actions',
  },
];

const data = [
  {
    name: 'cjcenizal',
    avatar_url: 'https://avatars2.githubusercontent.com/u/1238659?v=4',
    url: 'https://api.github.com/users/cjcenizal',
    contributions: 392,
  },
  {
    name: 'snide',
    avatar_url: 'https://avatars3.githubusercontent.com/u/324519?v=4',
    url: 'https://api.github.com/users/snide',
    contributions: 361,
  },
  {
    name: 'chandlerprall',
    avatar_url: 'https://avatars3.githubusercontent.com/u/313125?v=4',
    url: 'https://api.github.com/users/chandlerprall',
    contributions: 274,
  },
  {
    name: 'cchaos',
    avatar_url: 'https://avatars3.githubusercontent.com/u/549577?v=4',
    url: 'https://api.github.com/users/cchaos',
    contributions: 156,
  },
  {
    name: 'bevacqua',
    avatar_url: 'https://avatars3.githubusercontent.com/u/934293?v=4',
    url: 'https://api.github.com/users/bevacqua',
    contributions: 128,
  },
  {
    name: 'thompsongl',
    avatar_url: 'https://avatars0.githubusercontent.com/u/2728212?v=4',
    url: 'https://api.github.com/users/thompsongl',
    contributions: 106,
  },
  {
    name: 'pugnascotia',
    avatar_url: 'https://avatars1.githubusercontent.com/u/8696382?v=4',
    url: 'https://api.github.com/users/pugnascotia',
    contributions: 82,
  },
  {
    name: 'nreese',
    avatar_url: 'https://avatars0.githubusercontent.com/u/373691?v=4',
    url: 'https://api.github.com/users/nreese',
    contributions: 58,
  },
  {
    name: 'dmeiss',
    avatar_url: 'https://avatars3.githubusercontent.com/u/45879454?v=4',
    url: 'https://api.github.com/users/dmeiss',
    contributions: 52,
  },
  {
    name: 'ryankeairns',
    avatar_url: 'https://avatars2.githubusercontent.com/u/446285?v=4',
    url: 'https://api.github.com/users/ryankeairns',
    contributions: 32,
  },
  {
    name: 'stacey-gammon',
    avatar_url: 'https://avatars3.githubusercontent.com/u/16563603?v=4',
    url: 'https://api.github.com/users/stacey-gammon',
    contributions: 24,
  },
  {
    name: 'theodesp',
    avatar_url: 'https://avatars0.githubusercontent.com/u/328805?v=4',
    url: 'https://api.github.com/users/theodesp',
    contributions: 22,
  },
  {
    name: 'uboness',
    avatar_url: 'https://avatars3.githubusercontent.com/u/211019?v=4',
    url: 'https://api.github.com/users/uboness',
    contributions: 17,
  },
  {
    name: 'weltenwort',
    avatar_url: 'https://avatars3.githubusercontent.com/u/973741?v=4',
    url: 'https://api.github.com/users/weltenwort',
    contributions: 16,
  },
  {
    name: 'jen-huang',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1965714?v=4',
    url: 'https://api.github.com/users/jen-huang',
    contributions: 13,
  },
  {
    name: 'PopradiArpad',
    avatar_url: 'https://avatars3.githubusercontent.com/u/4144816?v=4',
    url: 'https://api.github.com/users/PopradiArpad',
    contributions: 11,
  },
  {
    name: 'chrisronline',
    avatar_url: 'https://avatars1.githubusercontent.com/u/56682?v=4',
    url: 'https://api.github.com/users/chrisronline',
    contributions: 10,
  },
  {
    name: 'timroes',
    avatar_url: 'https://avatars0.githubusercontent.com/u/877229?v=4',
    url: 'https://api.github.com/users/timroes',
    contributions: 10,
  },
  {
    name: 'daveyholler',
    avatar_url: 'https://avatars2.githubusercontent.com/u/739960?v=4',
    url: 'https://api.github.com/users/daveyholler',
    contributions: 9,
  },
  {
    name: 'sqren',
    avatar_url: 'https://avatars3.githubusercontent.com/u/209966?v=4',
    url: 'https://api.github.com/users/sqren',
    contributions: 9,
  },
];

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
      borderSelected: 'all',
      fontSizeSelected: 'm',
      cellPaddingSelected: 'm',
      stripes: false,
      stripesSelected: 'false',
      rowHoverSelected: 'highlight',
      isPopoverOpen: false,
      headerSelected: 'shade',

      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
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
      stripesSelected: optionId,
      stripes: !this.state.stripes,
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

  dummyIcon = () => (
    <EuiButtonIcon
      aria-label="dummy icon"
      iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
    />
  );

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
                idSelected={this.state.stripesSelected}
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
          rowCount={data.length}
          gridStyle={{
            border: this.state.borderSelected,
            fontSize: this.state.fontSizeSelected,
            cellPadding: this.state.cellPaddingSelected,
            stripes: this.state.stripes,
            rowHover: this.state.rowHoverSelected,
            header: this.state.headerSelected,
          }}
          renderCellValue={({ rowIndex, columnId }) => {
            const value = data[rowIndex][columnId];

            if (columnId === 'actions') {
              return (
                <>
                  {this.dummyIcon()}
                  {this.dummyIcon()}
                </>
              );
            }

            if (columnId === 'url') {
              return <EuiLink href={value}>{value}</EuiLink>;
            }

            if (columnId === 'avatar_url') {
              return (
                <p>
                  Avatar: <EuiLink href={value}>{value}</EuiLink>
                </p>
              );
            }

            return value;
          }}
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
