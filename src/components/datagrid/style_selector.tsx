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
  FunctionComponent<{}>,
  EuiDataGridStyle,
  Dispatch<SetStateAction<EuiDataGridStyle>>
] => {
  const [gridStyles, setGridStyles] = useState(startingStyles);

  const [isOpen, setIsOpen] = useState(false);

  const densityStyles = {
    comfortable: {
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
      id: 'comfortable',
      label: 'Comfortable table density',
      iconType: 'tableDensityComfortable',
    },
    {
      id: 'normal',
      label: 'Normal table density',
      iconType: 'tableDensityNormal',
    },
    {
      id: 'compact',
      label: 'Compact table density',
      iconType: 'tableDensityCompact',
    },
  ];

  const [gridDensity, setGridDensity] = useState(densityOptions[1]);

  const onChangeDensity = (optionId: string) => {
    const selectedDensity = densityOptions.filter(options => {
      return options.id === optionId;
    })[0];

    setGridDensity(selectedDensity);
  };

  useEffect(() => {
    const oldStyles = gridStyles;

    // eslint doesn't like the way the object.assign here is set up.
    /*eslint-disable */
    const mergedStyle = Object.assign(
      {},
      oldStyles,
      // @ts-ignore
      densityStyles[gridDensity.id]
    );
    /*eslint-enable */
    setGridStyles(mergedStyle);
  }, [gridDensity]);

  const StyleSelector = () => (
    <EuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downCenter"
      ownFocus
      panelPaddingSize="s"
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
