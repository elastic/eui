import React from 'react';
import NodeGroup from 'react-move/NodeGroup';
import { BarSeriesGlyph } from '../utils/bar_series_utils';

type RenderedBarSeriesGlyph = BarSeriesGlyph & { key: string, opacity?: number };
interface BarSeriesDataProps {
  animated?: boolean;
  bars: BarSeriesGlyph[];
}
export class BarSeries extends React.PureComponent<BarSeriesDataProps> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
  };
  // public componentDidMount() {
  //   console.log('component did mount');
  // }
  // public componentWillUnmount() {
  //   console.log('componentWillUnmount');
  // }

  public render() {
    const { animated, bars } = this.props;
    if (animated) {
      return this.renderAnimatedBars(bars);
    } else {
      return this.renderBars(bars);
    }

  }
  private renderAnimatedBars = (bars: BarSeriesGlyph[]) => {
    return (
      <g className="euiSeriesChartSeries_barGroup">
        <NodeGroup
          data={bars}
          keyAccessor={(d, i) => `${i}`}

          start={(d, i) => {
            return {
              opacity: 1e-6,
              height: d.height + d.y,
              width: d.width,
              x: d.x,
              y: d.height + d.y,
            };
          }}

          enter={(d) => ({
            opacity: [0.7],
            width: d.width,
            height: [d.height],
            x: [d.x],
            y: [d.y],
            // timing: { duration: 750, ease: easeExpInOut },
            timing: { delay: 500, duration: 500 },
          })}

          update={(d, i) => ({
            opacity: [0.7],
            width: [d.width],
            height: [d.height],
            x: [d.x],
            y: [d.y],
            timing: { duration: 500 },
            // timing: { duration: 750, delay: i * 50, ease: easeExpInOut },
          })}

          leave={(d) => ({
            // opacity: [1e-6],
            // height: [d.height + d.y],
            // y: [d.height + d.y],
            x: [1e6],
            // timing: { duration: 750, ease: easeExpInOut },
          })}
        >
          {
            (nodes) => {
              return (
                <g className="euiSeriesChartSeries_barGroup">
                {
                  nodes.map(({key, state}) => {
                    const { x, y, width, height, opacity } = state;
                    return this.renderBar({ key, x, y, width, height, opacity });
                  })
                }
                </g>
              );

            }
          }
        </NodeGroup>
      </g>
    );
  }
  private renderBar(bar: RenderedBarSeriesGlyph) {
    const { key, x, y, width, height, opacity } = bar;
    return (
      <rect
        key={key}
        className="euiSeriesChartSeries_bar"
        x={x}
        y={y}
        opacity={opacity}
        width={width}
        height={height}
      />
    );
  }
  private renderBars(bars: BarSeriesGlyph[]) {
    return (
      <g className="euiSeriesChartSeries_barGroup">
      {
        bars.map((bar, index) => {
          return this.renderBar({
            key: `bar-${index}`,
            ...bar,
          });
        })
      }
      </g>
    );
  }
}
