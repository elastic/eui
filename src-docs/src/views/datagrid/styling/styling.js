import React, { useState } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiCallOut,
} from '../../../../../src/components';

import DataGridStyle from './styling_grid';

const borderOptions = [
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

const fontSizeOptions = [
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

const cellPaddingOptions = [
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

const stripeOptions = [
  {
    id: 'true',
    label: 'Stripes on',
  },
  {
    id: 'false',
    label: 'Stripes off',
  },
];

const rowHoverOptions = [
  {
    id: 'none',
    label: 'None',
  },
  {
    id: 'highlight',
    label: 'Highlight',
  },
];

const headerOptions = [
  {
    id: 'shade',
    label: 'Shade',
  },
  {
    id: 'underline',
    label: 'Underline',
  },
];

const footerOptions = [
  {
    id: 'shade',
    label: 'Shade',
  },
  {
    id: 'overline',
    label: 'Overline',
  },
  {
    id: 'striped',
    label: 'Striped',
  },
];

const DataGrid = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [borderSelected, setBorderSelected] = useState('none');
  const [fontSizeSelected, setFontSizeSelected] = useState('m');
  const [cellPaddingSelected, setCellPaddingSelected] = useState('m');
  const [stripesSelected, setStripesSelected] = useState(true);
  const [rowHoverSelected, setRowHoverSelected] = useState('highlight');
  const [headerSelected, setHeaderSelected] = useState('underline');
  const [footerSelected, setFooterSelected] = useState('overline');

  const onBorderChange = (optionId) => {
    setBorderSelected(optionId);
  };

  const onFontSizeChange = (optionId) => {
    setFontSizeSelected(optionId);
  };

  const onCellPaddingChange = (optionId) => {
    setCellPaddingSelected(optionId);
  };

  const onStripesChange = (optionId) => {
    setStripesSelected(optionId === 'true');
  };

  const onRowHoverChange = (optionId) => {
    setRowHoverSelected(optionId);
  };

  const onHeaderChange = (optionId) => {
    setHeaderSelected(optionId);
  };

  const onFooterChange = (optionId) => {
    setFooterSelected(optionId);
  };

  const onPopoverButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const styleButton = (
    <EuiButton
      iconType="gear"
      iconSide="right"
      size="s"
      onClick={onPopoverButtonClick}
    >
      Style options
    </EuiButton>
  );

  return (
    <div>
      <EuiPopover
        id="styleButton"
        button={styleButton}
        isOpen={isPopoverOpen}
        anchorPosition="rightUp"
        closePopover={closePopover}
      >
        <div style={{ width: 380 }}>
          <EuiFormRow label="Border" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Border"
              options={borderOptions}
              idSelected={borderSelected}
              onChange={onBorderChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Cell padding" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Cell padding"
              options={cellPaddingOptions}
              idSelected={cellPaddingSelected}
              onChange={onCellPaddingChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Font size" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Font size"
              options={fontSizeOptions}
              idSelected={fontSizeSelected}
              onChange={onFontSizeChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Stripes" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Stripes"
              options={stripeOptions}
              idSelected={stripesSelected.toString()}
              onChange={onStripesChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Hover row" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Hover row"
              options={rowHoverOptions}
              idSelected={rowHoverSelected}
              onChange={onRowHoverChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Header" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Header"
              options={headerOptions}
              idSelected={headerSelected}
              onChange={onHeaderChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Footer" display="columnCompressed">
            <EuiButtonGroup
              isFullWidth
              buttonSize="compressed"
              legend="Footer"
              options={footerOptions}
              idSelected={footerSelected}
              onChange={onFooterChange}
            />
          </EuiFormRow>
        </div>
      </EuiPopover>

      {footerSelected === 'striped' ? (
        <>
          <EuiSpacer />

          <EuiCallOut
            size="s"
            title="A striped footer will be shaded depending on whether it is an even or an odd row considering the rest of the rows in the datagrid. Needs to be used with stripes={true}."
          />
        </>
      ) : null}

      <EuiSpacer />

      <DataGridStyle
        border={borderSelected}
        fontSize={fontSizeSelected}
        cellPadding={cellPaddingSelected}
        stripes={stripesSelected}
        rowHover={rowHoverSelected}
        header={headerSelected}
        footer={footerSelected}
      />
    </div>
  );
};
export default DataGrid;
