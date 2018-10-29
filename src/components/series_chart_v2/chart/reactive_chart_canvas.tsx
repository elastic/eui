import { inject, observer } from 'mobx-react';
import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { BarSeries, LineSeries } from '../components/canvas';
import { AreaSeries } from '../components/canvas/area_series';
import { Axis } from '../components/canvas/axis';
import { ChartStore } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}
class Chart extends React.Component<ReactiveChartProps> {
  public static displayName = 'ReactiveChart';
  public firstRender = true;

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

  public renderBarSeries = () => {
    const { barSeriesSpecs, barSeriesGlyphs, chartTheme, onTooltipOver, onTooltipOut } = this.props.chartStore!;
    const bars: JSX.Element[] = [];
    barSeriesGlyphs.forEach((barGlyphs, specId) => {
      const spec = barSeriesSpecs.get(specId);
      if (spec) {
        const { tooltipLevel } = spec;
        bars.push(
          <BarSeries
            key={`barSeries-${specId}`}
            specId={specId}
            glyphs={barGlyphs}
            tooltipLevel={tooltipLevel}
            chartTheme={chartTheme}
            onElementOver={onTooltipOver}
            onElementOut={onTooltipOut}
          />,
        );
      }
    });
    return bars;
  }
  public renderLineSeries = () => {
    const { lineSeriesSpecs, lineSeriesGlyphs, chartTheme } = this.props.chartStore!;
    const lines: JSX.Element[] = [];
    lineSeriesGlyphs.forEach((lineGlyphs, specId) => {
      const spec = lineSeriesSpecs.get(specId);
      if (spec) {
        lines.push(
          <LineSeries
            key={`lineSeries-${specId}`}
            specId={specId}
            glyphs={lineGlyphs}
            style={chartTheme.chart.styles.lineSeries}
          />,
        );
      }
    });
    return lines;
  }
  public renderAreaSeries = () => {
    const { areaSeriesSpecs, areaSeriesGlyphs, chartTheme } = this.props.chartStore!;
    const areas: JSX.Element[] = [];
    areaSeriesGlyphs.forEach((areaGlyphs, specId) => {
      const spec = areaSeriesSpecs.get(specId);
      if (spec) {
        areas.push(
          <AreaSeries
            key={`areaSeries-${specId}`}
            specId={specId}
            glyphs={areaGlyphs}
            style={chartTheme.chart.styles.areaSeries}
          />,
        );
      }
    });
    return areas;
  }
  public render() {
    const { initialized, debug } = this.props.chartStore!;
    if (!initialized.get()) {
      return null;
    }

    const { parentDimensions, chartDimensions, chartRotation } = this.props.chartStore!;

    const chartTransform = {
      x: 0,
      y: 0,
      rotate: 0,
    };
    if (chartRotation === 90) {
      chartTransform.x = chartDimensions.width;
      chartTransform.rotate = 90;
    } else if (chartRotation === -90) {
      chartTransform.y = chartDimensions.height;
      chartTransform.rotate = -90;
    } else if (chartRotation === 180) {
      chartTransform.x = chartDimensions.width;
      chartTransform.y = chartDimensions.height;
      chartTransform.rotate = 180;
    }
    // disable clippings when debugging
    const clippings = debug ? {} : {
      clipX: 0,
      clipY: 0,
      clipWidth: [90, -90].includes(chartRotation) ? chartDimensions.height : chartDimensions.width,
      clipHeight: [90, -90].includes(chartRotation) ? chartDimensions.width : chartDimensions.height,
    };

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          boxSizing: 'border-box',
        }}
      >
        <Stage
          width={parentDimensions.width}
          height={parentDimensions.height}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Layer
            x={chartDimensions.left + chartTransform.x}
            y={chartDimensions.top + chartTransform.y}
            rotation={chartRotation}
            {...clippings}
          >
            {this.renderAreaSeries()}
            {this.renderBarSeries()}
            {this.renderLineSeries()}
            {this.renderDebugChartBorders()}
          </Layer>
          <Layer hitGraphEnabled={false}>{this.renderAxes()}</Layer>
        </Stage>
      </div>
    );
  }

   private renderDebugChartBorders = () => {
    const { debug } = this.props.chartStore!;
    if (!debug) {
      return null;
    }
    const { chartDimensions, chartRotation } = this.props.chartStore!;

    return <Rect
      x={0}
      y={0}
      width={[90, -90].includes(chartRotation) ? chartDimensions.height : chartDimensions.width}
      height={[90, -90].includes(chartRotation) ? chartDimensions.width : chartDimensions.height}
      stroke="red"
      strokeWidth={0.5}
      dash={[2, 2]} />;
  }
}

export const ReactiveChart = inject('chartStore')(observer(Chart));
