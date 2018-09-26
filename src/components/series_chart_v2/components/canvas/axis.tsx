import React from 'react';
import { Group, Line, Text } from 'react-konva';
import { AxisTick, AxisTicksDimensions } from '../../commons/axes/axis_utils';
import { Dimensions } from '../../commons/dimensions';
import { AxisOrientation, AxisPosition, AxisSpec } from '../../commons/series/specs';
import { Theme } from '../../commons/themes/theme';

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
        orientation,
        position,
      },
      axisTicksDimensions: {
        maxTickHeight,
        maxTickWidth,
      },
    } = this.props;

    const textProps = {
      x: 0,
      y: 0,
      align: 'center',
      width: 0,
      height: 0,
    };
    if (orientation === AxisOrientation.Vertical) {
      textProps.y = tick.position - maxTickHeight / 2;
      textProps.align = position === 'left' ? 'right' : 'left';
      textProps.x = position === 'left' ?  - (maxTickWidth) : tickSize + tickPadding;
      textProps.height = maxTickHeight;
      textProps.width = maxTickWidth;
      // textProps.dominantBaseline = 'middle';
    } else {
      textProps.y = position === 'top' ? 0 : tickSize + tickPadding;
      textProps.x = tick.position - maxTickWidth / 2;
      textProps.align = 'center';
      textProps.width = maxTickWidth;
      // textProps.dominantBaseline = 'hanging';
    }
    // const transform = `translate(${textProps.x}, ${textProps.y})`;

    return (
      <Text
        key={`tick-${i}`}
        {...textProps}
        // textAnchor={textProps.textAnchor}
        // dominantBaseline={textProps.dominantBaseline}
        // transform={transform}
        fill="gray"
        text={tick.label}
      />
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

    const lineProps = [];

    if (orientation === 'vertical') {
      lineProps[0] = position === 'left' ? tickPadding : 0;
      lineProps[1] = tick.position;
      lineProps[2] = position === 'left' ? tickSize + tickPadding : tickSize;
      lineProps[3] = tick.position;
    } else {
      lineProps[0] = tick.position;
      lineProps[1] = position === 'top' ? maxTickHeight + tickPadding : 0;
      lineProps[2] = tick.position;
      lineProps[3] = position === 'top' ? maxTickHeight + tickPadding + tickSize : tickSize;
    }

    return (
      <Line key={`tick-${i}`}  points={lineProps} stroke={'gray'} strokeWidth={1}/>
    );
  }
  private renderAxis = () => {
    const {
      ticks,
      axisPosition,
    } = this.props;
    return (
      <Group x={axisPosition.left} y={axisPosition.top}>
        <Group>
          {
            this.renderLine()
          }
        </Group>
        <Group>
          {
            ticks.map(this.renderTickLine)
          }
        </Group>
        <Group>
          {
            ticks.filter((tick) => tick.label !== null)
              .map(this.renderTickLabel)
          }
        </Group>
        {
          this.renderAxisTitle()
        }
      </Group>
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
    const lineProps: number[] = [];
    if (orientation === 'vertical') {
      lineProps[0] = position === 'left' ? tickSize + tickPadding : 0;
      lineProps[2] = position === 'left' ? tickSize + tickPadding : 0;
      lineProps[1] = 0;
      lineProps[3] = axisPosition.height;
    } else {
      lineProps[0] = 0;
      lineProps[2] = axisPosition.width;
      lineProps[1] = position === 'top' ? axisTicksDimensions.maxTickHeight + tickSize + tickPadding : 0;
      lineProps[3] = position === 'top' ? axisTicksDimensions.maxTickHeight + tickSize + tickPadding : 0;
    }
    return (
      <Line points={lineProps} stroke={'gray'} strokeWidth={1}/>
    );
  }
  private renderAxisTitle() {
    const {
      axisSpec: {
        title,
        orientation,
      },
    } = this.props;
    if (!title) {
      return null;
    }
    if (orientation === AxisOrientation.Horizontal) {
      return this.renderOriziontalAxisTitle();
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
        maxTickHeight,
      },
      chartTheme: {
        chartMargins,
        axisTitle: {
          fontSize,
        },
      },
    } = this.props;
    if (!title) {
      return null;
    }
    const top = height;
    const left = position === AxisPosition.Left
      ? - (maxTickWidth  + chartMargins.left / 2)
      : tickSize + tickPadding + maxTickWidth + + chartMargins.right / 2;
    return (
      <Group>
        <Text
          align="center"
          x={left}
          y={top}
          offsetY={maxTickHeight / 2}
          text={title}
          fill="gray"
          width={height}
          rotation={-90}
          fontStyle="bold"
          fontSize={fontSize}
        />
      </Group>
    );
  }
  private renderOriziontalAxisTitle() {
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
        chartMargins,
        axisTitle: {
          fontSize,
        },
      },
    } = this.props;

    if (!title) {
      return;
    }

    const top = position === AxisPosition.Top
    ? - chartMargins.top / 2
    : maxTickHeight + tickPadding + tickSize + chartMargins.bottom / 2;
    const left = width / 2;
    return (
      <Group>
        <Text
          align="center"
          x={left}
          y={top}
          width={width}
          offsetX={width / 2}
          offsetY={maxTickHeight / 2}
          text={title}
          fill="gray"
          fontStyle="bold"
          fontSize={fontSize}

        ></Text>
      </Group>
    );
  }
}
