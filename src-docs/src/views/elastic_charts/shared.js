import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  EuiBadge,
  EuiRadioGroup,
  EuiSpacer,
  EuiSwitch,
  EuiPanel,
  EuiText,
  EuiTitle,
} from '../../../../src/components';
import { BarSeries, LineSeries, AreaSeries } from '@elastic/charts';
import { devDependencies } from '../../../../package';

export const chartsVersion = devDependencies['@elastic/charts'].match(
  /\d+\.\d+\.\d+/
)[0];

export const CHART_COMPONENTS = {
  BarSeries: BarSeries,
  LineSeries: LineSeries,
  AreaSeries: AreaSeries,
};

export const ExternalBadge = () => {
  return (
    <EuiBadge
      iconType="popout"
      iconSide="right"
      onClickAriaLabel="Go to @elastic/charts docs"
      onClick={() =>
        window.open(
          `https://github.com/elastic/elastic-charts/tree/v${chartsVersion}`
        )
      }
    >
      External library: @elastic/charts v{chartsVersion}
    </EuiBadge>
  );
};

export const ChartCard = ({ title, description, children }) => {
  return (
    <EuiPanel>
      <EuiTitle size="s">
        <span>{title}</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s">
        <p>{description}</p>
      </EuiText>
      <EuiSpacer size="s" />
      {children}
    </EuiPanel>
  );
};

export const ChartTypeCard = (props) => {
  const idPrefix = 'chartType';

  const toggleButtonsIcons = [
    {
      id: `${idPrefix}0`,
      label: 'BarSeries',
    },
    {
      id: `${idPrefix}1`,
      label: 'LineSeries',
    },
    {
      id: `${idPrefix}2`,
      label: 'AreaSeries',
    },
  ];

  const [toggleIdSelected, setToggleIdSelectd] = useState(`${idPrefix}0`);

  const onChartTypeChange = (optionId) => {
    setToggleIdSelectd(optionId);

    const chartType = toggleButtonsIcons.find(({ id }) => id === optionId)
      .label;
    props.onChange(chartType);
  };

  if (props.mixed) {
    toggleButtonsIcons[3] = {
      id: `${idPrefix}3`,
      label: 'Mixed',
      disabled: props.mixed === 'disabled',
    };
  }

  return (
    <ChartCard
      title="Chart types"
      description={`${props.type} charts can be displayed as any x/y series type.`}
    >
      <EuiRadioGroup
        compressed
        options={toggleButtonsIcons}
        idSelected={toggleIdSelected}
        onChange={onChartTypeChange}
        disabled={props.disabled}
      />
    </ChartCard>
  );
};

ChartTypeCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  mixed: PropTypes.oneOf(['enabled', 'disabled', true, false]),
  disabled: PropTypes.bool,
};

export const MultiChartCard = (props) => {
  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);

  const onMultiChange = (e) => {
    const isStacked = e.target.checked ? stacked : false;

    setMulti(e.target.checked);
    setStacked(isStacked);

    props.onChange({
      multi: e.target.checked,
      stacked,
    });
  };

  const onStackedChange = (e) => {
    setStacked(e.target.checked);

    props.onChange({ multi: multi, stacked: e.target.checked });
  };
  return (
    <ChartCard
      textAlign="left"
      title="Single vs multiple series"
      description="Legends are only necessary when there are multiple series. Stacked series indicates accumulation but can hide subtle differences. Do not stack line charts."
    >
      <EuiSwitch
        label="Show multi-series"
        checked={multi}
        onChange={onMultiChange}
      />
      <EuiSpacer size="s" />
      <EuiSwitch
        label="Stacked"
        checked={stacked}
        onChange={onStackedChange}
        disabled={!multi}
      />
    </ChartCard>
  );
};

MultiChartCard.propTypes = {
  /**
   * Returns (multi:boolean, stacked:boolean)
   */
  onChange: PropTypes.func.isRequired,
};
