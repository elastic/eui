import React, { SVGProps } from 'react';
import { Dimensions } from '../commons/dimensions';
import { AxisSpec } from '../commons/specs';
import { AxisTick, AxisTicksDimensions } from '../state/axis_utils';

interface AxisProps {
  axisSpec: AxisSpec;
  axisTicksDimensions: AxisTicksDimensions;
  axisPosition: Dimensions;
  ticks: AxisTick[];
}

export class Axis extends React.PureComponent<AxisProps> {
  public render() {
    return this.renderAxis();
  }
  public renderTickLabel = (tick: AxisTick, i: number) => {
    const {
      axisSpec: {
        tickSize,
        tickPadding,
        orientation,
        position,
      },
    } = this.props;

    const textProps: SVGProps<SVGTextElement> = {};

    if (orientation === 'vertical') {
      textProps.y = tick.position;
      textProps.textAnchor = position === 'left' ? 'end' : 'start';
      textProps.x = position === 'left' ? 0 : tickSize + tickPadding;
      textProps.dominantBaseline = 'middle';
    } else {
      textProps.y = position === 'top' ? 0 : tickSize + tickPadding;
      textProps.x = tick.position;
      textProps.textAnchor = 'middle';
      textProps.dominantBaseline = 'hanging';
    }

    return (
      <text className="euiSeriesChartAxis_tickLabel"  key={`tick-${i}`}{...textProps} >{tick.label}</text>
    );
  }

  private renderTickLine = (tick: AxisTick, i: number) => {
    const {
      axisSpec: {
        tickSize,
        tickPadding,
        orientation,
        position,
      },
      axisTicksDimensions: {
        maxTickHeight,
      },
    } = this.props;

    const lineProps: SVGProps<SVGLineElement>  = {};

    if (orientation === 'vertical') {
      lineProps.x1 = position === 'left' ? tickPadding : 0;
      lineProps.x2 = position === 'left' ? tickSize + tickPadding : tickSize;
      lineProps.y1 = tick.position;
      lineProps.y2 = tick.position;
    } else {
      lineProps.x1 = tick.position;
      lineProps.x2 = tick.position;
      lineProps.y1 = position === 'top' ? maxTickHeight + tickPadding : 0;
      lineProps.y2 = position === 'top' ? maxTickHeight + tickPadding + tickSize : tickSize;
    }

    return (
      <line className="euiSeriesChartAxis_tickLine" key={`tick-${i}`} {...lineProps}  />
    );
  }
  private renderAxis = () => {
    const {
      ticks,
      axisPosition,
    } = this.props;
    const translation = `translate(${axisPosition.left} ${axisPosition.top})`;
    return (
      <g className="euiSeriesChartAxis" transform={translation}>
        <g className="euiSeriesChartAxis_lineGroup">
          {
            this.renderLine()
          }
        </g>
        <g className="euiSeriesChartAxis_ticksGroup">
          {
            ticks.map(this.renderTickLine)
          }
        </g>
        <g className="euiSeriesChartAxis_tickLabelsGroup">
          {
            ticks.filter((tick) => tick.label !== null)
              .map(this.renderTickLabel)
          }
        </g>
      </g>
    );
  }
  private renderLine = () => {
    const {
      axisSpec: {
        tickSize,
        tickPadding,
        orientation,
        position,
      },
      axisPosition,
      axisTicksDimensions,
    } = this.props;
    const lineProps: SVGProps<SVGLineElement>  = {};
    if (orientation === 'vertical') {
      lineProps.x1 = position === 'left' ? tickSize + tickPadding : 0;
      lineProps.x2 = position === 'left' ? tickSize + tickPadding : 0;
      lineProps.y1 = 0;
      lineProps.y2 = axisPosition.height;
    } else {
      lineProps.x1 = 0;
      lineProps.x2 = axisPosition.width;
      lineProps.y1 = position === 'top' ? axisTicksDimensions.maxTickHeight + tickSize + tickPadding : 0;
      lineProps.y2 = position === 'top' ? axisTicksDimensions.maxTickHeight + tickSize + tickPadding : 0;
    }
    return (
      <line className="euiSeriesChartAxis_line" {...lineProps} />
    );
  }
}
