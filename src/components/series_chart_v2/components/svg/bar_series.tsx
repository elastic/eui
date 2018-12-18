import React from 'react';
import { BarGeometry } from '../../lib/series/rendering';

interface BarSeriesDataProps {
  animated?: boolean;
  bars: BarGeometry[];
}
export class BarSeries extends React.PureComponent<BarSeriesDataProps> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
  };
  public render() {
    const { animated, bars } = this.props;
    if (animated) {
      return this.renderAnimatedBars(bars);
    } else {
      return this.renderBars(bars);
    }
  }
  private renderBars = (bars: BarGeometry[]) => {
    return bars.map(({x, y, width, height, color}, index) => {
      return (
        <rect
          key={`rect-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
        />);
    });
  }
  private renderAnimatedBars = (geoms: BarGeometry[]) => {
    // tslint:disable-next-line:no-console
    console.warn('[EUISeriesChart] Missing bar animation on SVG renderer');
    return this.renderBars(geoms);
  }
}
