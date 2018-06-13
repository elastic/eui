import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

export default class DefaultAxis extends PureComponent {

  _getTickLabels(ticks) {
    if (!ticks) return;

    return ticks.map(v => {
      return v[1];
    });
  }

  _getTicks(ticks) {
    if (!ticks) return;

    {
      return ticks.map(v => {
        return v[0];
      });
    }
  }

  render() {
    const {
      yTicks,
      xTicks,
      xAxisLocation,
      yAxisLocation,
      showGridLines,
      isHorizontal,
      yOn0,
      xOn0,
      ...rest } = this.props;
    return (
      <Fragment>
        {
          showGridLines && !isHorizontal &&
          <HorizontalGridLines
            key="lines"
            tickValues={this._getTicks(yTicks)}
            style={{
              strokeDasharray: '5 5',
              strokeOpacity: 0.3,
            }}
            {...rest}
          />
        }
        {
          showGridLines && isHorizontal &&
          <VerticalGridLines
            key="lines"
            tickValues={this._getTicks(yTicks)}
            style={{
              strokeDasharray: '5 5',
              strokeOpacity: 0.3,
            }}
            {...rest}
          />
        }

        <XAxis
          key="x"
          orientation={xAxisLocation === 'top' ? 'top' : 'bottom'}
          tickSize={1}
          on0={xOn0}
          {...rest}
          tickValues={this._getTicks(xTicks)}
          tickFormat={xTicks ? v => this._getTickLabels(xTicks)[v] || v : undefined}
        />
        <YAxis
          key="Y"
          on0={yOn0}
          tickSize={1}
          orientation={yAxisLocation === 'right' ? 'right' : 'left'}
          {...rest}
          tickValues={this._getTicks(yTicks)}
          tickFormat={yTicks ? v => this._getTickLabels(yTicks)[v] || v : undefined}
        />
      </Fragment>
    )
  }
}

DefaultAxis.propTypes = {
  xTicks: PropTypes.array,
  yTicks: PropTypes.array, // [[0, "zero"], [1.2, "one mark"], [2.4, "two marks"]]
  xAxisLocation: PropTypes.string,
  yAxisLocation: PropTypes.string,
  isHorizontal: PropTypes.bool,
  showGridLines: PropTypes.bool,
  yOn0: PropTypes.bool,
  xOn0: PropTypes.bool,
};

DefaultAxis.defaultProps = {
  isHorizontal: false,
  showGridLines: true,
}

DefaultAxis.requiresSVG = true;
