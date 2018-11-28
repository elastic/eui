import React from 'react';
import { BarGeom } from '../../lib/series/bars/rendering';

interface BarSeriesDataProps {
  animated?: boolean;
  geoms: BarGeom[];
}
export class BarSeries extends React.PureComponent<BarSeriesDataProps> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
  };
  public render() {
    const { animated, geoms } = this.props;
    if (animated) {
      return this.renderAnimatedBars(geoms);
    } else {
      return this.renderBars(geoms);
    }
  }
  private renderBars = (geoms: BarGeom[]) => {
    return geoms.map(({x, y1, width, height, color}, index) => {
      return (
        <rect
          key={`rect-${index}`}
          x={x}
          y={y1}
          width={width}
          height={height}
          fill={color}
        />);
    });
  }
  private renderAnimatedBars = (geoms: BarGeom[]) => {
    return null;
  }
}
