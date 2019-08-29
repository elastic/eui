import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { EuiDataGridStyle } from './data_grid_types';
// @ts-ignore-next-line
import { EuiPopover } from '../popover';
// @ts-ignore-next-line
import { EuiButtonEmpty, EuiButtonGroup } from '../button';

export const startingStyles: EuiDataGridStyle = {
  cellPadding: 'm',
  fontSize: 'm',
  border: 'all',
  stripes: false,
  rowHover: 'highlight',
  header: 'shade',
};

export const useStyleSelector = (): [
  FunctionComponent<any>,
  EuiDataGridStyle,
  Dispatch<SetStateAction<EuiDataGridStyle>>
] => {
  const [gridStyles, setGridStyles] = useState(startingStyles);

  console.log('in style selector', gridStyles);

  const [isOpen, setIsOpen] = useState(false);

  const densityStyles = {
    comfotable: {
      fontSize: 'l',
      cellPadding: 'l',
    },
    normal: {
      fontSize: 'm',
      cellPadding: 'm',
    },
    compact: {
      fontSize: 's',
      cellPadding: 's',
    },
  };

  const densityOptions = [
    {
      id: 'comfotable',
      label: 'Table density comfortable',
      iconType: 'tableDensityComfortable',
    },
    {
      id: 'normal',
      label: 'Table density normal',
      iconType: 'tableDensityNormal',
    },
    {
      id: 'compact',
      label: 'Table density compact',
      iconType: 'tableDensityCompact',
    },
  ];

  const [gridDensity, setGridDensity] = useState(densityOptions[1]);

  const onChangeDensity = (optionId: any) => {
    const selectedDensity = densityOptions.filter(options => {
      return options.id === optionId;
    })[0];

    setGridDensity(selectedDensity);
  };

  useEffect(() => {
    const oldStyles = gridStyles;

    /*eslint-disable */
    const mergedStyle = Object.assign(
      {},
      oldStyles,
      // @ts-ignore
      densityStyles[gridDensity.id]
    );
    /*eslint-enable */
    console.log(
      'gridDensity',
      gridDensity,
      'old',
      oldStyles,
      'new',
      // @ts-ignore
      densityStyles[gridDensity.id],
      'merged',
      mergedStyle
    );
    setGridStyles(mergedStyle);
  }, [gridDensity]);

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
        idSelected={gridDensity.id}
        isIconOnly
      />
    </EuiPopover>
  );

  return [StyleSelector, gridStyles, setGridStyles];
};
