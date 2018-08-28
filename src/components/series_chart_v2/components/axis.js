import React, { PureComponent } from 'react';

export class Axis extends PureComponent {
  renderLine = () => {
    const {
      tickSize,
      tickPadding,
      position,
      orientation,
      dimensions,
    } = this.props;
    const range = dimensions.scale.range();
    const props = {};
    if (orientation === 'vertical') {
      props.x1 = position === 'left' ? tickSize + tickPadding : 0;
      props.x2 = position === 'left' ? tickSize + tickPadding : 0;
      props.y1 = range[0];
      props.y2 = range[1];
    } else {
      props.x1 = range[0];
      props.x2 = range[1];
      props.y1 = position === 'top' ? dimensions.maxTickHeight + tickSize + tickPadding : 0;
      props.y2 = position === 'top' ? dimensions.maxTickHeight + tickSize + tickPadding : 0;
    }
    return (
      <line className="euiSeriesChartAxis_line" {...props} />
    );
  }
  renderTickLabel = (tick, i) => {
    const {
      position,
      orientation,
      tickSize,
      tickPadding,
    } = this.props;

    const props = {};

    if (orientation === 'vertical') {
      props.y = tick.position;
      props.textAnchor = position === 'left' ? 'end' : 'start';
      props.x = position === 'left' ? 0 : tickSize + tickPadding;
      props.dominantBaseline = 'middle';
    } else {
      props.y = position === 'top' ? 0 : tickSize + tickPadding;
      props.x = tick.position;
      props.textAnchor = 'middle';
      props.dominantBaseline = 'hanging';
    }

    return (
      <text className="euiSeriesChartAxis_tickLabel" key={`tick-${i}`}{...props} >{tick.label}</text>
    );
  }

  renderTickLine = (tick, i) => {
    const {
      position,
      orientation,
      tickSize,
      tickPadding,
      dimensions,
    } = this.props;

    const props = {};

    if (orientation === 'vertical') {
      props.x1 = position === 'left' ? tickPadding : 0;
      props.x2 = position === 'left' ? tickSize + tickPadding : tickSize;
      props.y1 = tick.position;
      props.y2 = tick.position;
    } else {
      props.x1 = tick.position;
      props.x2 = tick.position;
      props.y1 = position === 'top' ? dimensions.maxTickHeight + tickPadding : 0;
      props.y2 = position === 'top' ? dimensions.maxTickHeight + tickPadding + tickSize : tickSize;
    }

    return (
      <line className="euiSeriesChartAxis_tickLine" key={`tick-${i}`} {...props}  />
    );
  }
  renderAxis = () => {
    const {
      ticks,
      dimensions,
    } = this.props;
    const translation = `translate(${dimensions.position.left} ${dimensions.position.top})`;
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
            ticks.filter(tick => tick.label !== null)
              .map(this.renderTickLabel)
          }
        </g>
      </g>
    );
  }
  render() {
    return this.renderAxis();
  }
}
