import React, { Component } from 'react';
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
import { find, range } from 'lodash';
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
      onClickAriaLabel="Go to elastic-charts docs"
      onClick={() =>
        window.open('https://github.com/elastic/elastic-charts/tree/v13.0.0')
      }>
      External library: elastic-charts v13.0.0
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

// eslint-disable-next-line react/no-multi-comp
export class ChartTypeCard extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    mixed: PropTypes.oneOf(['enabled', 'disabled', true, false]),
    disabled: PropTypes.bool,
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
      <ChartCard
        title="Chart types"
        description={`${
          this.props.type
        } charts can be displayed as any x/y series type.`}>
        <EuiRadioGroup
          compressed
          options={this.toggleButtonsIcons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChartTypeChange}
          disabled={this.props.disabled}
        />
      </ChartCard>
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
      <ChartCard
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
      </ChartCard>
    );
  }
}

/**
 * The following function is very messy and hopefully will be replaced by something provided by elastic-charts
 */
import chroma from 'chroma-js';
export function createSpectrum(
  colors,
  numColors = 5,
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

  const even = numColors % 2 === 0;

  // const numStepsLeft = diverging
  //   ? Math.ceil(numColors / 2) + (even ? 1 : 0)
  //   : numColors;
  // const numStepsRight = diverging ? Math.ceil(numColors / 2) + (even ? 1 : 0) : 0;

  const numColorsHalf =
    Math.ceil(colors.length / 2) + (colors.length % 2 === 0 ? 1 : 0);

  const colorsLeft = diverging
    ? colors.filter(function(item, index) {
        if (index < numColorsHalf) {
          return true; // keep it
        }
      })
    : colors;
  const colorsRight = diverging
    ? colors
        .reverse()
        .filter(function(item, index) {
          if (index < numColorsHalf) {
            return true; // keep it
          }
        })
        .reverse()
    : [];

  // function createSteps(colors, steps) {
  //   return colors.length
  //     ? chroma
  //         .scale(bezier && colors.length > 1 ? chroma.bezier(colors) : colors)
  //         .correctLightness(correctLightness)
  //         .colors(steps)
  //     : [];
  // }

  // const stepsLeft = createSteps(colorsLeft, numStepsLeft);
  // const stepsRight = createSteps(colorsRight, numStepsRight);

  // const spectrum = (even && diverging
  //   ? stepsLeft.slice(0, stepsLeft.length - 1)
  //   : stepsLeft
  // ).concat(stepsRight.slice(1));

  function autoGradient(color, numColors) {
    const lab = chroma(color).lab();
    const lRange = 100 * (0.95 - 1 / numColors);
    const lStep = lRange / (numColors - 1);
    const lStart = (100 - lRange) * 0.5;
    const theRange = range(lStart, lStart + numColors * lStep, lStep);
    let offset = 0;
    if (!diverging) {
      offset = 9999;
      for (let i = 0; i < numColors; i++) {
        const diff = lab[0] - range[i];
        if (Math.abs(diff) < Math.abs(offset)) {
          offset = diff;
        }
      }
    }

    return theRange.map(l => chroma.lab([l + offset, lab[1], lab[2]]));
  }

  function autoColors(color, numColors, reverse = false) {
    if (diverging) {
      const colors = autoGradient(color, 3).concat(chroma('#dfdfdf'));
      if (reverse) colors.reverse();
      return colors;
    } else {
      return autoGradient(color, numColors);
    }
  }

  const numColorsLeft = diverging
    ? Math.ceil(numColors / 2) + (even ? 1 : 0)
    : numColors;
  const numColorsRight = diverging
    ? Math.ceil(numColors / 2) + (even ? 1 : 0)
    : 0;

  const genColors =
    colorsLeft.length !== 1
      ? colorsLeft
      : autoColors(colorsLeft[0], numColorsLeft);
  const genColors2 =
    colorsRight.length !== 1
      ? colorsRight
      : autoColors(colorsRight[0], numColorsRight, true);

  const stepsLeft = colorsLeft.length
    ? chroma
        .scale(
          bezier && colorsLeft.length > 1 ? chroma.bezier(genColors) : genColors
        )
        .correctLightness(correctLightness)
        .colors(numColorsLeft)
    : [];

  const stepsRight =
    diverging && colorsRight.length
      ? chroma
          .scale(
            bezier && colorsRight.length > 1
              ? chroma.bezier(genColors2)
              : genColors2
          )
          .correctLightness(correctLightness)
          .colors(numColorsRight)
      : [];

  return (even && diverging
    ? stepsLeft.slice(0, stepsLeft.length - 1)
    : stepsLeft
  ).concat(stepsRight.slice(1));

  // return spectrum;
}
