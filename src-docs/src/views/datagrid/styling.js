import React, { Component, Fragment } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
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
        size="s"
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

    this.showSortSelectorOptions = [
      {
        id: 'true',
        label: 'True',
      },
      {
        id: 'false',
        label: 'False',
      },
    ];

    this.showStyleSelectorOptions = [
      {
        id: 'true',
        label: 'True',
      },
      {
        id: 'false',
        label: 'False',
      },
    ];

    this.showColumnSelectorOptions = [
      {
        id: 'true',
        label: 'True',
      },
      {
        id: 'false',
        label: 'False',
      },
    ];

    this.showFullScreenSelectorOptions = [
      {
        id: 'true',
        label: 'True',
      },
      {
        id: 'false',
        label: 'False',
      },
    ];

    this.showToolbarOptions = [
      {
        id: 'true',
        label: 'True',
      },
      {
        id: 'false',
        label: 'False',
      },
    ];

    this.toolbarPropTypeIsBooleanOptions = [
      {
        id: 'true',
        label: 'Boolean',
      },
      {
        id: 'false',
        label: 'Object',
      },
    ];

    this.state = {
      borderSelected: 'none',
      fontSizeSelected: 's',
      cellPaddingSelected: 's',
      stripesSelected: true,
      rowHoverSelected: 'none',
      isPopoverOpen: false,
      isToolbarPopoverOpen: false,
      headerSelected: 'underline',
      showSortSelector: true,
      showStyleSelector: true,
      showColumnSelector: true,
      showFullScreenSelector: true,
      showToolbar: true,
      toolbarPropTypeIsBoolean: true,

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

  onShowSortSelectorChange = optionId => {
    this.setState({
      showSortSelector: optionId === 'true',
    });
  };

  onShowStyleSelectorChange = optionId => {
    this.setState({
      showStyleSelector: optionId === 'true',
    });
  };

  onShowColumnSelectorChange = optionId => {
    this.setState({
      showColumnSelector: optionId === 'true',
    });
  };

  onShowFullScreenSelectorChange = optionId => {
    this.setState({
      showFullScreenSelector: optionId === 'true',
    });
  };

  onShowToolbarChange = optionId => {
    this.setState({
      showToolbar: optionId === 'true',
    });
  };

  onToolbarPropTypeIsBooleanChange = optionId => {
    this.setState({
      toolbarPropTypeIsBoolean: optionId === 'true',
    });
  };

  onPopoverButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  onToolbarPopoverButtonClick() {
    this.setState({
      isToolbarPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  closeToolbarPopover() {
    this.setState({
      isToolbarPopoverOpen: false,
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

    const styleButton = (
      <EuiButton
        iconType="gear"
        iconSide="right"
        size="s"
        onClick={this.onPopoverButtonClick.bind(this)}>
        gridStyle options
      </EuiButton>
    );

    const toolbarButton = (
      <EuiButton
        iconType="gear"
        iconSide="right"
        size="s"
        onClick={this.onToolbarPopoverButtonClick.bind(this)}>
        toolbarVisibility options
      </EuiButton>
    );

    const toolbarVisibilityOptions = {
      showColumnSelector: this.state.showColumnSelector,
      showStyleSelector: this.state.showStyleSelector,
      showSortSelector: this.state.showSortSelector,
      showFullScreenSelector: this.state.showFullScreenSelector,
    };

    let toolbarConfig;

    if (this.state.toolbarPropTypeIsBoolean) {
      toolbarConfig = this.state.showToolbar;
    } else {
      toolbarConfig = toolbarVisibilityOptions;
    }

    return (
      <div>
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="popover"
              button={styleButton}
              isOpen={this.state.isPopoverOpen}
              anchorPosition="rightUp"
              zIndex={2}
              closePopover={this.closePopover.bind(this)}>
              <div style={{ width: 300 }}>
                <EuiFormRow label="Border" display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Border"
                    options={this.borderOptions}
                    idSelected={this.state.borderSelected}
                    onChange={this.onBorderChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Cell padding" display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Cell padding"
                    options={this.cellPaddingOptions}
                    idSelected={this.state.cellPaddingSelected}
                    onChange={this.onCellPaddingChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Font size" display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Fornt size"
                    options={this.fontSizeOptions}
                    idSelected={this.state.fontSizeSelected}
                    onChange={this.onFontSizeChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Stripes" display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Stripes"
                    options={this.stripeOptions}
                    idSelected={this.state.stripesSelected.toString()}
                    onChange={this.onStripesChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Hover row" display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Hover row"
                    options={this.rowHoverOptions}
                    idSelected={this.state.rowHoverSelected}
                    onChange={this.onRowHoverChange}
                  />
                </EuiFormRow>

                <EuiFormRow label="Header" display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Header"
                    options={this.headerOptions}
                    idSelected={this.state.headerSelected}
                    onChange={this.onHeaderChange}
                  />
                </EuiFormRow>
              </div>
            </EuiPopover>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="popover"
              button={toolbarButton}
              isOpen={this.state.isToolbarPopoverOpen}
              anchorPosition="rightUp"
              zIndex={2}
              closePopover={this.closeToolbarPopover.bind(this)}>
              <div style={{ width: 300 }}>
                <EuiFormRow
                  display="columnCompressed"
                  label="toolbarVisibility prop">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend="Border"
                    options={this.toolbarPropTypeIsBooleanOptions}
                    idSelected={this.state.toolbarPropTypeIsBoolean.toString()}
                    onChange={this.onToolbarPropTypeIsBooleanChange}
                  />
                </EuiFormRow>
                {this.state.toolbarPropTypeIsBoolean === false ? (
                  <Fragment>
                    <EuiFormRow
                      display="columnCompressed"
                      label="Show column selector">
                      <EuiButtonGroup
                        isFullWidth
                        buttonSize="compressed"
                        legend="Border"
                        options={this.showColumnSelectorOptions}
                        idSelected={this.state.showColumnSelector.toString()}
                        onChange={this.onShowColumnSelectorChange}
                      />
                    </EuiFormRow>

                    <EuiFormRow
                      display="columnCompressed"
                      label="Show style selector">
                      <EuiButtonGroup
                        isFullWidth
                        buttonSize="compressed"
                        legend="Border"
                        options={this.showStyleSelectorOptions}
                        idSelected={this.state.showStyleSelector.toString()}
                        onChange={this.onShowStyleSelectorChange}
                      />
                    </EuiFormRow>

                    <EuiFormRow
                      display="columnCompressed"
                      label="Show sort selector">
                      <EuiButtonGroup
                        isFullWidth
                        buttonSize="compressed"
                        legend="Border"
                        options={this.showSortSelectorOptions}
                        idSelected={this.state.showSortSelector.toString()}
                        onChange={this.onShowSortSelectorChange}
                      />
                    </EuiFormRow>

                    <EuiFormRow
                      display="columnCompressed"
                      label="Show full screen selector">
                      <EuiButtonGroup
                        isFullWidth
                        buttonSize="compressed"
                        legend="Border"
                        options={this.showFullScreenSelectorOptions}
                        idSelected={this.state.showFullScreenSelector.toString()}
                        onChange={this.onShowFullScreenSelectorChange}
                      />
                    </EuiFormRow>
                  </Fragment>
                ) : (
                  <EuiFormRow display="columnCompressed" label="Show toolbar">
                    <EuiButtonGroup
                      isFullWidth
                      buttonSize="compressed"
                      legend="Border"
                      options={this.showToolbarOptions}
                      idSelected={this.state.showToolbar.toString()}
                      onChange={this.onShowToolbarChange}
                    />
                  </EuiFormRow>
                )}
              </div>
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>

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
          toolbarVisibility={toolbarConfig}
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
