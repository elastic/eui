import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EuiBadge, EuiCard, EuiRadioGroup } from '../../../../src/components';
import { find } from 'lodash';
import { BarSeries, LineSeries, AreaSeries } from '@elastic/charts';

export const ExternalBadge = () => {
  return (
    <EuiBadge
      iconType="popout"
      iconSide="right"
      onClick={() =>
        window.open('https://github.com/elastic/elastic-charts/tree/v8.1.0')
      }>
      External library: elastic-charts v.8.1.0
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

    let chartType = find(this.toggleButtonsIcons, { id: optionId }).label;
    switch (chartType) {
      case 'BarSeries':
        chartType = BarSeries;
        break;
      case 'LineSeries':
        chartType = LineSeries;
        break;
      case 'AreaSeries':
        chartType = AreaSeries;
        break;
    }

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
