import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';
import {
  EuiBadge,
  EuiRadioGroup,
  type EuiRadioGroupOption,
  EuiSpacer,
  EuiSwitch,
  EuiPanel,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { BarSeries, LineSeries, AreaSeries } from '@elastic/charts';
import euiPackage from '@site/package.json';

const { dependencies } = euiPackage;

export const chartsVersion =
  dependencies['@elastic/charts'].match(/\d+\.\d+\.\d+/)![0];

export const CHART_COMPONENTS = {
  BarSeries: BarSeries,
  LineSeries: LineSeries,
  AreaSeries: AreaSeries,
};
export type ChartType = keyof typeof CHART_COMPONENTS;

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

export const ChartCard: FunctionComponent<
  PropsWithChildren & {
    title: ReactNode;
    description?: ReactNode;
  }
> = ({ title, description, children }) => {
  return (
    <EuiPanel>
      <EuiTitle size="s">
        <span>{title}</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      {description && (
        <>
          <EuiText size="s">
            <p>{description}</p>
          </EuiText>
          <EuiSpacer size="s" />
        </>
      )}
      {children}
    </EuiPanel>
  );
};

type ChartTypeCardProps<Mixed> = {
  type: string;
  mixed?: 'enabled' | 'disabled';
  onChange: [Mixed] extends [{ mixed: true }]
    ? (chartType: ChartType | 'Mixed') => void
    : (chartType: ChartType) => void;
  disabled?: boolean;
};
export const ChartTypeCard = <Mixed,>(props: ChartTypeCardProps<Mixed>) => {
  const idPrefix = 'chartType';

  const toggleButtonsIcons: EuiRadioGroupOption[] = [
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

  const onChartTypeChange = (optionId: string) => {
    setToggleIdSelectd(optionId);

    const chartType = toggleButtonsIcons.find(({ id }) => id === optionId)!
      .label as ChartType;
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

export const MultiChartCard: FunctionComponent<{
  onChange: ({ multi, stacked }: { multi: boolean; stacked: boolean }) => void;
}> = ({ onChange }) => {
  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);

  return (
    <ChartCard
      title="Single vs multiple series"
      description="Legends are only necessary when there are multiple series. Stacked series indicates accumulation but can hide subtle differences. Do not stack line charts."
    >
      <EuiSwitch
        label="Show multi-series"
        checked={multi}
        onChange={(e) => {
          const isStacked = e.target.checked ? stacked : false;

          setMulti(e.target.checked);
          setStacked(isStacked);

          onChange({
            multi: e.target.checked,
            stacked,
          });
        }}
      />
      <EuiSpacer size="s" />
      <EuiSwitch
        label="Stacked"
        checked={stacked}
        onChange={(e) => {
          setStacked(e.target.checked);
          onChange({ multi: multi, stacked: e.target.checked });
        }}
        disabled={!multi}
      />
    </ChartCard>
  );
};
