import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { LineSeries } from '../series/line_series';
import { PointSeries } from '../series/point_series';
import { BarSeries } from '../series/bar_series';
import { Axis } from '../series/axis';


class Chart extends React.Component {
  static displayName = 'ReactiveChart'

  getAxesComponents(specs) {
    const axesComponents = [];
    specs.forEach((spec, id) => {
      const axisSpec = toJS(spec);
      axesComponents.push(<Axis key={id} {...axisSpec} />);
    });
    return axesComponents;
  }
  renderAxes = () => {
    const {
      vLeftAxisSpec,
      vRightAxisSpec,
      hBottomAxisSpec,
      hTopAxisSpec,
    } = this.props.chartStore;
    const axisComponents = [
      ...this.getAxesComponents(vLeftAxisSpec),
      ...this.getAxesComponents(vRightAxisSpec),
      ...this.getAxesComponents(hBottomAxisSpec),
      ...this.getAxesComponents(hTopAxisSpec),
    ];
    return axisComponents;
  }
  renderLineSeries = () => {
    const {
      lineSeriesSpecs,
    } = this.props.chartStore;
    const lines = [];
    lineSeriesSpecs.forEach(spec => {
      lines.push((
        <LineSeries
          key={`line-series:${spec.id}`}
          d={spec.d}
        />
      ));
    });
    return lines;
  }
  renderPointSeries = () => {
    const {
      pointSeriesSpecs,
    } = this.props.chartStore;
    const points = [];
    pointSeriesSpecs.forEach(spec => {
      points.push((
        <PointSeries
          key={`point-series:${spec.id}`}
          points={spec.points}
        />
      ));
    });
    return points;
  }
  renderBarSeries = () => {
    const {
      barSeriesSpecs,
    } = this.props.chartStore;
    const points = [];
    barSeriesSpecs.forEach(spec => {
      points.push((
        <BarSeries
          key={`point-series:${spec.id}`}
          bars={spec.bars}
        />
      ));
    });
    return points;
  }
  render() {
    const { initialized } = this.props.chartStore;
    if (!initialized.get()) {
      return null;
    }

    const { parentDimensions, chartDimensions } = this.props.chartStore;
    // console.log({ lineSeriesSpecs: toJS(lineSeriesSpecs)})
    // console.log({ groupDomains: toJS(groupDomains)})
    // console.log({ vLeftAxisSpec: toJS(vLeftAxisSpec)})
    // console.log({ hBottomAxisSpec: toJS(hBottomAxisSpec)})
    // console.log({ chartDimensions: toJS(chartDimensions)})

    return (
      <div
        style={{
          width: `100%`,
          height: `100%`,
          // background: 'lightblue',
          // border: '10px solid blue',
          // boxSizing: 'border-box',
        }}
      >
        <svg
          width={parentDimensions.width}
          height={parentDimensions.height}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <clipPath id="chart-bbox">
            <rect x="0" y="0" width={chartDimensions.width} height={chartDimensions.height} />
          </clipPath>
          <g className="euiSeriesChartAxis_group">
            {
              this.renderAxes()
            }
          </g>
          <g
            className="euiSeriesChartChart_group"
            transform={`translate(${chartDimensions.left} ${chartDimensions.top})`}
            clipPath={'url(#chart-bbox)'}
          >
            {/* <rect
              x={0}
              y={0}
              width={chartDimensions.width}
              height={chartDimensions.height}
              fill="red"
              fillOpacity={0.3}
            /> */}
            <g className="euiSeriesChartSeries_lineSeries">
              {
                this.renderLineSeries()
              }
            </g>
            <g className="euiSeriesChartSeries_pointSeries">
              {
                this.renderPointSeries()
              }
            </g>
            <g className="euiSeriesChartSeries_barSeries">
              {
                this.renderBarSeries()
              }
            </g>
          </g>
        </svg>
      </div>
    );
  }
}


export const ReactiveChart = inject('chartStore')(observer(Chart));
