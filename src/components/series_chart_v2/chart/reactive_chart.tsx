// import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { DataSeriesType } from '../commons/specs';
// import { Axis } from '../series/axis';
import { BarSeries } from '../series/bar_series';
import { ChartStore } from '../state/chart_state';
import { BarSeriesGlyph } from '../utils/bar_series_utils';

interface ReactiveChartProps {
  chartStore: ChartStore;
}
interface BarSeriesDataGlyphs {
  type: DataSeriesType;
  bars: BarSeriesGlyph[];
}

class Chart extends React.Component<ReactiveChartProps> {
  public static displayName = 'ReactiveChart';

  public componentDidMount() {
    console.log('Chart mounted');
  }

  public componentWillUnmount() {
    console.log('Chart unmounted');
  }

  // public getAxesComponents(specs) {
  //   const axesComponents = [];
  //   specs.forEach((spec, id) => {
  //     const axisSpec = toJS(spec);
  //     axesComponents.push(<Axis key={id} {...axisSpec} />);
  //   });
  //   return axesComponents;
  // }
  public renderAxes = () => {
    return null;
    // const {
    //   vLeftAxisSpec,
    //   vRightAxisSpec,
    //   hBottomAxisSpec,
    //   hTopAxisSpec,
    // } = this.props.chartStore;
    // const axisComponents = [
    //   ...this.getAxesComponents(vLeftAxisSpec),
    //   ...this.getAxesComponents(vRightAxisSpec),
    //   ...this.getAxesComponents(hBottomAxisSpec),
    //   ...this.getAxesComponents(hTopAxisSpec),
    // ];
    // return axisComponents;
  }
  public renderLineSeries = () => {
    return null;
    // const {
    //   lineSeriesSpecs,
    // } = this.props.chartStore;
    // const lines = [];
    // lineSeriesSpecs.forEach((spec) => {
    //   lines.push((
    //     <LineSeries
    //       key={`line-series:${spec.id}`}
    //       d={spec.d}
    //     />
    //   ));
    // });
    // return lines;
  }
  public renderPointSeries = () => {
    return null;
    // const {
    //   pointSeriesSpecs,
    // } = this.props.chartStore;
    // const points = [];
    // pointSeriesSpecs.forEach((spec) => {
    //   points.push((
    //     <PointSeries
    //       key={`point-series:${spec.id}`}
    //       points={spec.points}
    //     />
    //   ));
    // });
    // return points;
  }
  public renderBarSeries = () => {
    const {
      seriesGlyphs,
    } = this.props.chartStore;
    const points: JSX.Element[] = [];
    seriesGlyphs.forEach((spec) => {
      if (spec.type !== DataSeriesType.Bar) {
        return;
      }
      const barGlyphs = spec as BarSeriesDataGlyphs;
      console.log('barGlyphs', barGlyphs);
      points.push((
        <BarSeries
          key="data points"
          bars={barGlyphs.bars}
        />
      ));
    });
    return points;
  }
  public renderAreaSeries = () => {
    return null;
    // const {
    //   areaSeriesSpecs,
    // } = this.props.chartStore;
    // const points = [];
    // areaSeriesSpecs.forEach((spec) => {
    //   points.push((
    //     <AreaSeries
    //       key={`point-series:${spec.id}`}
    //       d={spec.d}
    //     />
    //   ));
    // });
    // return points;
  }
  public render() {
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
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          // width: '100%',
          // height: '100%',
          // background: 'lightblue',
          // border: '10px solid blue',
          boxSizing: 'border-box',
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
            <g className="euiSeriesChartSeries_areaSeries">
              {
                this.renderAreaSeries()
              }
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export const ReactiveChart = inject('chartStore')(observer(Chart));
