// import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
// import { LineSeries } from '../components/line_series';
import { ChartStore } from '../../state/chart_state';
// import { DataSeriesType } from '../commons/series/specs';
// import { AreaSeries } from '../components/area_series';
import { Axis } from './axis';
import { BarSeries } from './bar_series';
// import { AreaSeriesGlyph } from '../utils/area_series_utils';
// import { BarSeriesGlyph } from '../utils/bar_series_utils';
// import { LineSeriesGlyph } from '../utils/line_series_utils';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}
// interface BarSeriesDataGlyphs {
//   type: DataSeriesType;
//   bars: BarSeriesGlyph[];
// }
// interface LineSeriesDataGlyphs {
//   type: DataSeriesType;
//   line: LineSeriesGlyph;
// }
// interface AreaSeriesDataGlyphs {
//   type: DataSeriesType;
//   area: AreaSeriesGlyph;
// }

class Chart extends React.Component<ReactiveChartProps> {
  public static displayName = 'ReactiveChart';

  public componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Chart mounted');
  }

  public componentWillUnmount() {
    // tslint:disable-next-line:no-console
    console.log('Chart unmounted');
  }

  public renderAxes = () => {
    const {
      axesVisibleTicks,
      axesSpecs,
      axesTicksDimensions,
      axesPositions,
      chartTheme,
    } = this.props.chartStore!;
    const axesComponents: JSX.Element[] = [];
    axesVisibleTicks.forEach((axisTicks, axisId) => {
      const axisSpec = axesSpecs.get(axisId);
      const axisTicksDimensions = axesTicksDimensions.get(axisId);
      const axisPosition = axesPositions.get(axisId);
      const ticks = axesVisibleTicks.get(axisId);
      if (!ticks || !axisSpec || !axisTicksDimensions || !axisPosition) {
        return;
      }
      axesComponents.push(
        <Axis
          key={`axis-${axisId}`}
          axisSpec={axisSpec}
          axisTicksDimensions={axisTicksDimensions}
          axisPosition={axisPosition}
          ticks={ticks}
          chartTheme={chartTheme}
        />,
      );
    });
    return axesComponents;
  }
  // public renderLineSeries = () => {
  //   const { seriesGlyphs } = this.props.chartStore!;
  //   const points: JSX.Element[] = [];
  //   seriesGlyphs.forEach((spec, specId) => {
  //     if (spec.type !== DataSeriesType.Line) {
  //       return;
  //     }
  //     const lineGlyph = spec as LineSeriesDataGlyphs;
  //     points.push(<LineSeries key={`line-series-${specId}`} line={lineGlyph.line} />);
  //   });
  //   return points;
  // }
  // public renderPointSeries = () => {
  //   return null;
  // }
  public renderBarSeries = () => {
    const { geometries, canDataBeAnimated } = this.props.chartStore!;
    if (!geometries) {
      return;
    }
    return <BarSeries
      key="data bars"
      animated={canDataBeAnimated}
      bars={geometries.bars}
    />;
  }
  // public renderAreaSeries = () => {
  //   const { seriesGlyphs } = this.props.chartStore!;
  //   const points: JSX.Element[] = [];
  //   seriesGlyphs.forEach((spec, specId) => {
  //     if (spec.type !== DataSeriesType.Area) {
  //       return;
  //     }
  //     const areaGlyph = spec as AreaSeriesDataGlyphs;
  //     // tslint:disable-next-line:no-console
  //     console.log('areaGlyph', areaGlyph);
  //     points.push(<AreaSeries key={`area-series-${specId}`} area={areaGlyph.area} />);
  //   });
  //   return points;
  // }
  public render() {
    const { initialized } = this.props.chartStore!;
    if (!initialized.get()) {
      return null;
    }

    const { parentDimensions, chartDimensions, chartRotation } = this.props.chartStore!;
    // console.log({ lineSeriesSpecs: toJS(lineSeriesSpecs)})
    // console.log({ groupDomains: toJS(groupDomains)})
    // console.log({ vLeftAxisSpec: toJS(vLeftAxisSpec)})
    // console.log({ hBottomAxisSpec: toJS(hBottomAxisSpec)})
    // console.log({ chartDimensions});
    let chartTransform = '';
    if (chartRotation === 90) {
      chartTransform = `translate(${chartDimensions.width} 0) rotate(90)`;
    } else if (chartRotation === -90) {
      chartTransform = `translate(0 ${chartDimensions.height}) rotate(-90)`;
    }
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
          {/* <defs>
            <clipPath id="chart-bbox" clipPathUnits="objectBoundingBox">
              <rect
                x={chartDimensions.left}
                y={chartDimensions.top}
                width={chartDimensions.width + chartDimensions.left}
                height={chartDimensions.height}
              />
            </clipPath>
          </defs> */}
          <g
            className="euiSeriesChartChart_group"
            transform={`translate(${chartDimensions.left} ${chartDimensions.top})`}

          >
            {/* <rect
              x={0}
              y={0}
              width={chartDimensions.width}
              height={chartDimensions.height}
              fill="red"
              fillOpacity={0.3}
            /> */}
            {/* <g className="euiSeriesChartSeries_lineSeries">{this.renderLineSeries()}</g>
            <g className="euiSeriesChartSeries_pointSeries">{this.renderPointSeries()}</g> */}
            <g
              className="euiSeriesChartSeries_barSeries"
              transform={chartTransform}
            >{this.renderBarSeries()}</g>
            {/* <g className="euiSeriesChartSeries_areaSeries">{this.renderAreaSeries()}</g> */}
          </g>
          <g className="euiSeriesChartAxis_group">{this.renderAxes()}</g>
        </svg>
      </div>
    );
  }
}

export const ReactiveChart = inject('chartStore')(observer(Chart));
