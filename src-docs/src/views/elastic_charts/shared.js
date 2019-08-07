import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EuiBadge,
  EuiCard,
  EuiRadioGroup,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';
import { find } from 'lodash';
import { BarSeries, LineSeries, AreaSeries } from '@elastic/charts';

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
      onClick={() =>
        window.open('https://github.com/elastic/elastic-charts/tree/v8.1.5')
      }>
      External library: elastic-charts v9.0.0
    </EuiBadge>
  );
};

export class ChartTypeCard extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    mixed: PropTypes.oneOf(['enabled', 'disabled', true, false]),
  };

  constructor(props) {
    super(props);

    this.idPrefix = 'chartType';

    this.toggleButtonsIcons = [
      {
        id: `${this.idPrefix}0`,
        label: 'BarSeries',
      },
      {
        id: `${this.idPrefix}1`,
        label: 'LineSeries',
      },
      {
        id: `${this.idPrefix}2`,
        label: 'AreaSeries',
      },
    ];

    this.state = {
      toggleIdSelected: `${this.idPrefix}0`,
    };
  }

  onChartTypeChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });

    const chartType = find(this.toggleButtonsIcons, { id: optionId }).label;
    this.props.onChange(chartType);
  };

  render() {
    if (this.props.mixed) {
      this.toggleButtonsIcons[3] = {
        id: `${this.idPrefix}3`,
        label: 'Mixed',
        disabled: this.props.mixed === 'disabled',
      };
    }

    return (
      <EuiCard
        textAlign="left"
        title="Chart types"
        description="Time series charts can be displayed as any x/y series type.">
        <EuiRadioGroup
          compressed
          options={this.toggleButtonsIcons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChartTypeChange}
        />
      </EuiCard>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export class MultiChartCard extends Component {
  static propTypes = {
    /**
     * Returns (multi:boolean, stacked:boolean)
     */
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      multi: false,
      stacked: false,
    };
  }

  onMultiChange = e => {
    const stacked = e.target.checked ? this.state.stacked : false;

    this.setState({
      multi: e.target.checked,
      stacked,
    });

    this.props.onChange({
      multi: e.target.checked,
      stacked,
    });
  };

  onStackedChange = e => {
    this.setState({
      stacked: e.target.checked,
    });

    this.props.onChange({ multi: this.state.multi, stacked: e.target.checked });
  };

  render() {
    return (
      <EuiCard
        textAlign="left"
        title="Single vs multiple series"
        description="Legends are only necessary when there are multiple series. Stacked series indicates accumulation but can hide subtle differences. Do not stack line charts.">
        <EuiSwitch
          label="Show multi-series"
          checked={this.state.multi}
          onChange={this.onMultiChange}
        />
        <EuiSpacer size="s" />
        <EuiSwitch
          label="Stacked"
          checked={this.state.stacked}
          onChange={this.onStackedChange}
          disabled={!this.state.multi}
        />
      </EuiCard>
    );
  }
}

import chroma from 'chroma-js';
export function createSpectrum(
  colors,
  steps = 5,
  diverging = false,
  correctLightness = true,
  bezier = true
) {
  if (colors.length < 2) {
    console.warn(
      'createSpectrum expects the colors array to have at least 2 colors'
    );
    return;
  }

  diverging = diverging || colors.length > 2;

  const even = steps % 2 === 0;
  const numStepsLeft = diverging
    ? Math.ceil(steps / 2) + (even ? 1 : 0)
    : steps;
  const numStepsRight = diverging ? Math.ceil(steps / 2) + (even ? 1 : 0) : 0;

  const numColorsHalf =
    Math.ceil(colors.length / 2) + (colors.length % 2 === 0 ? 1 : 0);

  const colorsLeft = colors.filter(function(item, index) {
    if (index < numColorsHalf) {
      return true; // keep it
    }
  });
  const colorsRight =
    diverging &&
    colors
      .reverse()
      .filter(function(item, index) {
        if (index < numColorsHalf) {
          return true; // keep it
        }
      })
      .reverse();

  function createSteps(colors, steps) {
    return colors.length
      ? chroma
          .scale(bezier && colors.length > 1 ? chroma.bezier(colors) : colors)
          .correctLightness(correctLightness)
          .colors(steps)
      : [];
  }

  const stepsLeft = createSteps(colorsLeft, numStepsLeft);
  const stepsRight = createSteps(colorsRight, numStepsRight);

  const spectrum = (even && diverging
    ? stepsLeft.slice(0, stepsLeft.length - 1)
    : stepsLeft
  ).concat(stepsRight.slice(1));

  return spectrum;
}
