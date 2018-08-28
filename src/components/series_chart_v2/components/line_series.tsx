import React from 'react';
import Animate from 'react-move/Animate';
import { LineSeriesGlyph } from '../utils/line_series_utils';
interface LineSeriesDataProps {
  animated?: boolean;
  line: LineSeriesGlyph;
}

export class LineSeries extends React.PureComponent<LineSeriesDataProps> {
  public static defaultProps: Partial<LineSeriesDataProps> = {
    animated: false,
  };
  public render() {
    const { animated, line } = this.props;
    if (line.d === null) {
      return null;
    }
    if (!animated) {
      return this.renderLine(line.d);
    }
    return this.renderAnimatedLine(line.d);
  }
  private renderAnimatedLine = (d: string) => {
    return (
      <Animate
      start={{
        key: 'transform',
        d,
      }}
      update={{
        key: 'transform',
        d: [d],
      }}
      >
      {
        (state) => {
          return (
           <g className="euiSeriesChartSeries_lineGroup">
              <path className="euiSeriesChartSeries_line" d={state.d as string}/>
            </g>
         );
        }
      }
      </Animate>
    );
  }
  private renderLine = (d: string) => {
    return (
      <g className="euiSeriesChartSeries_lineGroup">
        <path className="euiSeriesChartSeries_line" d={d}/>
      </g>
    );
  }
}
