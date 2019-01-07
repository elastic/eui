import React, { SVGProps } from 'react';
import { AxisTick, AxisTicksDimensions, isHorizontal, isVertical } from '../../lib/axes/axis_utils';
import { AxisSpec, Position } from '../../lib/series/specs';
import { Theme } from '../../lib/themes/theme';
import { Dimensions } from '../../lib/utils/dimensions';

interface AxisProps {
  chartTheme: Theme;
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
        position,
      },
    } = this.props;

    const textProps: SVGProps<SVGTextElement> = {};

    if (isVertical(position)) {
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
    // const transform = `translate(${textProps.x}, ${textProps.y})`;
    return (
      <text
        className="euiSeriesChartAxis_tickLabel"
        key={`tick-${i}`}
        {...textProps}
        // textAnchor={textProps.textAnchor}
        // dominantBaseline={textProps.dominantBaseline}
        // transform={transform}
      >{tick.label}
      </text>
    );
  }

  private renderTickLine = (tick: AxisTick, i: number) => {
    const {
      axisSpec: {
        tickSize,
        tickPadding,
        position,
      },
      axisTicksDimensions: {
        maxTickHeight,
      },
    } = this.props;

    const lineProps: SVGProps<SVGLineElement>  = {};

    if (isVertical(position)) {
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
      <line className="euiSeriesChartAxis_tickLine" key={`tick-${i}`} {...lineProps} />
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
        {
          this.renderAxisTitle()
        }
      </g>
    );
  }
  private renderLine = () => {
    const {
      axisSpec: {
        tickSize,
        tickPadding,
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
  private renderAxisTitle() {
    const {
      axisSpec: {
        title,
        position,
      },
    } = this.props;
    if (!title) {
      return null;
    }
    if (isHorizontal(position)) {
      return this.renderHoriziontalAxisTitle();
    }
    return this.renderVerticalAxisTitle();
  }
  private renderVerticalAxisTitle() {
    const {
      axisPosition: {
        height,
      },
      axisSpec: {
        title,
        position,
        tickSize,
        tickPadding,
      },
      axisTicksDimensions: {
        maxTickWidth,
      },
      chartTheme: {
        chart: {
          margins,
        },
      },
    } = this.props;

    const top = height / 2;
    const left = position === Position.Left
      ? - (maxTickWidth  + margins.left / 2)
      : tickSize + tickPadding + maxTickWidth + + margins.right / 2;
    const translate = `translate(${left} ${top}) rotate(-90)`;
    return (
      <g className="euiSeriesChartAxis_axisTitle">
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          transform={translate}
        >{title}</text>
      </g>
    );
  }
  private renderHoriziontalAxisTitle() {
    const {
      axisPosition: {
        width,
      },
      axisSpec: {
        title,
        position,
        tickSize,
        tickPadding,
      },
      axisTicksDimensions: {
        maxTickHeight,
      },
      chartTheme: {
        chart: {
          margins,
        },
      },
    } = this.props;

    const top = position === Position.Top
    ? - margins.top / 2
    : maxTickHeight + tickPadding + tickSize + margins.bottom / 2;
    const left = width / 2;
    const translate = `translate(${left} ${top} )`;
    return (
      <g className="euiSeriesChartAxis_axisTitle">
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          transform={translate}
        >{title}</text>
      </g>
    );
  }
}
