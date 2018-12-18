import { Layer as KonvaLayer } from 'konva';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { ChartStore } from '../../state/chart_state';
import { AreaGeometries } from './area_geometries';
import { Axis } from './axis';
import { BarGeometries } from './bar_geometries';
import { LineGeometries } from './line_geometries';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}
class Chart extends React.Component<ReactiveChartProps> {
  public static displayName = 'ReactiveChart';
  public firstRender = true;
  private renderingLayerRef: React.RefObject<KonvaLayer> = React.createRef();

  public componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Chart mounted');
  }

  public componentWillUnmount() {
    // tslint:disable-next-line:no-console
    console.log('Chart unmounted');
  }

  public renderBarSeries = () => {
    console.log('rendred bars');
    const { geometries, canDataBeAnimated, onOverElement, onOutElement } = this.props.chartStore!;
    if (!geometries) {
      return;
    }
    return (
      <BarGeometries
        animated={canDataBeAnimated}
        bars={geometries.bars}
        onElementOver={onOverElement}
        onElementOut={onOutElement}
      />
    );
  }
  public renderLineSeries = () => {
    const {
      geometries,
      canDataBeAnimated,
      chartTheme,
      onOverElement,
      onOutElement,
    } = this.props.chartStore!;
    if (!geometries) {
      return;
    }
    return (
      <LineGeometries
        animated={canDataBeAnimated}
        lines={geometries.lines}
        style={chartTheme.chart.styles.lineSeries}
        onElementOver={onOverElement}
        onElementOut={onOutElement}
      />
    );
  }
  public renderAreaSeries = () => {
    const {
      geometries,
      canDataBeAnimated,
      chartTheme,
      onOverElement,
      onOutElement,
    } = this.props.chartStore!;
    if (!geometries) {
      return;
    }
    return (
      <AreaGeometries
        animated={canDataBeAnimated}
        areas={geometries.areas}
        style={chartTheme.chart.styles.areaSeries}
        onElementOver={onOverElement}
        onElementOut={onOutElement}
      />
    );
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

  public render() {
    const { initialized, debug } = this.props.chartStore!;
    if (!initialized.get()) {
      return null;
    }

    const {
      parentDimensions,
      chartDimensions,
      chartRotation,
      tooltipData,
      setTooltipPosition,
    } = this.props.chartStore!;

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
    const clippings = debug
      ? {}
      : {
          clipX: 0,
          clipY: 0,
          clipWidth: [90, -90].includes(chartRotation)
            ? chartDimensions.height
            : chartDimensions.width,
          clipHeight: [90, -90].includes(chartRotation)
            ? chartDimensions.width
            : chartDimensions.height,
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
            ref={this.renderingLayerRef}
            x={chartDimensions.left + chartTransform.x}
            y={chartDimensions.top + chartTransform.y}
            rotation={chartRotation}
            {...clippings}
            onMouseMove={({ evt }) => {
              if (tooltipData != null) {
                setTooltipPosition(evt.layerX, evt.layerY);
              }
            }}
          >
            {this.renderBarSeries()}
            {this.renderAreaSeries()}
            {this.renderLineSeries()}

            {debug && this.renderDebugChartBorders()}
          </Layer>
          <Layer hitGraphEnabled={false}>{this.renderAxes()}</Layer>
        </Stage>
      </div>
    );
  }

  private renderDebugChartBorders = () => {
    const { chartDimensions, chartRotation } = this.props.chartStore!;
    return (
      <Rect
        x={0}
        y={0}
        width={[90, -90].includes(chartRotation) ? chartDimensions.height : chartDimensions.width}
        height={[90, -90].includes(chartRotation) ? chartDimensions.width : chartDimensions.height}
        stroke="red"
        strokeWidth={0.5}
        listening={false}
        dash={[2, 2]}
      />
    );
  }
}

export const ReactiveChart = inject('chartStore')(observer(Chart));
