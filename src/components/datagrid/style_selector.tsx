import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react';
import { EuiDataGridStyle } from './data_grid_types';
// @ts-ignore-next-line
import { EuiPopover } from '../popover';
// @ts-ignore-next-line
import { EuiButtonEmpty, EuiButtonGroup } from '../button';

export const useStyleSelector = (
  initialStyles: EuiDataGridStyle = {
    cellPadding: 'm',
    fontSize: 'm',
    border: 'all',
    stripes: false,
    rowHover: 'highlight',
    header: 'shade',
  }
): [
  FunctionComponent<any>,
  EuiDataGridStyle,
  Dispatch<SetStateAction<EuiDataGridStyle>>
] => {
  const [gridStyles, setGridStyles] = useState(initialStyles);

  const [isOpen, setIsOpen] = useState(false);

  const [gridDensity, setGridDensity] = useState('normal');

  const comfortable: EuiDataGridStyle = {
    cellPadding: 'l',
    fontSize: 'l',
    border: 'all',
    stripes: false,
    rowHover: 'highlight',
    header: 'shade',
  };

  const normal: EuiDataGridStyle = {
    cellPadding: 'm',
    fontSize: 'm',
    border: 'all',
    stripes: false,
    rowHover: 'highlight',
    header: 'shade',
  };

  const compact: EuiDataGridStyle = {
    cellPadding: 's',
    fontSize: 's',
    border: 'all',
    stripes: false,
    rowHover: 'highlight',
    header: 'shade',
  };

  const densityOptions = [
    {
      id: 'tableDensityComfortable',
      label: 'Table density comfortable',
      iconType: 'tableDensityComfortable',
      density: comfortable,
    },
    {
      id: 'tableDensityNormal',
      label: 'Table density normal',
      iconType: 'tableDensityNormal',
      density: normal,
    },
    {
      id: 'tableDensityCompact',
      label: 'Table density compact',
      iconType: 'tableDensityCompact',
      density: compact,
    },
  ];

  const onChangeDensity = (optionId: any) => {
    setGridDensity(optionId);

    const selectedDensity = densityOptions.filter(options => {
      return options.id === optionId;
    })[0];
    setGridStyles(selectedDensity.density);
  };

  const StyleSelector = () => (
    <EuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downCenter"
      panelPaddingSize="s"
      ownFocus
      panelClassName="euiDataGridColumnSelectorPopover"
      button={
        <EuiButtonEmpty
          size="xs"
          iconType="tableDensityComfortable"
          color="text"
          onClick={() => setIsOpen(!isOpen)}>
          Density
        </EuiButtonEmpty>
      }>
      <EuiButtonGroup
        legend="Text align"
        name="textAlign"
        className="eui-displayInlineBlock"
        options={densityOptions}
        onChange={onChangeDensity}
        idSelected={gridDensity}
        isIconOnly
      />
    </EuiPopover>
  );

  return [StyleSelector, gridStyles, setGridStyles];
};
