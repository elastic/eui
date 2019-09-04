import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
  useEffect,
  ReactChild,
} from 'react';
import { EuiDataGridStyle } from './data_grid_types';
import { EuiI18n } from '../i18n';
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
    expanded: {
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

  // These are the available options. They power the gridDensity hook and also the options in the render
  const densityOptions: Array<{}> = ['expanded', 'normal', 'compact'];

  // Normal is the defaul density
  const [gridDensity, setGridDensity] = useState(densityOptions[1]);

  const onChangeDensity = (optionId: string) => {
    const selectedDensity = densityOptions.filter(options => {
      return options === optionId;
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
    // @TODO: come back to this hook lifecycle
  }, [gridDensity]); // eslint-disable-line react-hooks/exhaustive-deps

  const StyleSelector = () => (
    <EuiPopover
      data-test-subj="dataGridStyleSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downCenter"
      ownFocus
      panelPaddingSize="s"
      panelClassName="euiDataGridColumnSelectorPopover"
      button={
        <EuiButtonEmpty
          size="xs"
          iconType="tableDensityExpanded"
          className="euiDataGrid__controlBtn"
          color="text"
          onClick={() => setIsOpen(!isOpen)}>
          <EuiI18n token="euiStyleSelector.buttonText" default="Density" />
        </EuiButtonEmpty>
      }>
      <EuiI18n
        tokens={[
          'euiStyleSelector.buttonLegend',
          'euiStyleSelector.labelExpanded',
          'euiStyleSelector.labelNormal',
          'euiStyleSelector.labelCompact',
        ]}
        defaults={[
          'Select the display density for the data grid',
          'Expanded density',
          'Normal density',
          'Compact density',
        ]}>
        {([
          buttonLegend,
          labelExpanded,
          labelNormal,
          labelCompact,
        ]: ReactChild[]) => (
          <EuiButtonGroup
            legend={buttonLegend}
            name="denisty"
            className="eui-displayInlineBlock"
            options={[
              {
                id: densityOptions[0],
                label: labelExpanded,
                iconType: 'tableDensityExpanded',
              },
              {
                id: densityOptions[1],
                label: labelNormal,
                iconType: 'tableDensityNormal',
              },
              {
                id: densityOptions[2],
                label: labelCompact,
                iconType: 'tableDensityCompact',
              },
            ]}
            onChange={onChangeDensity}
            idSelected={gridDensity}
            isIconOnly
          />
        )}
      </EuiI18n>
    </EuiPopover>
  );

  return [StyleSelector, gridStyles, setGridStyles];
};
