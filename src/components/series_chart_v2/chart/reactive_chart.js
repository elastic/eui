import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
// import { LineSeries } from '../series/line_series';
// import { PointSeries } from '../series/point_series';
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
          background: 'lightblue',
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
          <g className="euiSeriesChartAxis_group">
            {
              this.renderAxes()
            }
          </g>
          <g transform={`translate(${chartDimensions.left} ${chartDimensions.top})`}>
            <rect
              x={0}
              y={0}
              width={chartDimensions.width}
              height={chartDimensions.height}
              fill="red"
              fillOpacity={0.3}
              // stroke="black"
              // strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    );
  }
}


export const ReactiveChart = inject('chartStore')(observer(Chart));
