import React from 'react';
import Animate from 'react-move/Animate';
import { AreaSeriesGlyph } from '../utils/area_series_utils';
interface AreaSeriesDataProps {
  animated?: boolean;
  area: AreaSeriesGlyph;
}

export class AreaSeries extends React.PureComponent<AreaSeriesDataProps> {
  public static defaultProps: Partial<AreaSeriesDataProps> = {
    animated: true,
  };
  public render() {
    const { animated, area } = this.props;
    if (area.d === null) {
      return null;
    }
    if (!animated) {
      return this.renderArea(area.d);
    }
    return this.renderAnimatedArea(area.d);
  }
  private renderAnimatedArea = (d: string) => {
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
           <g className="euiSeriesChartSeries_areaGroup">
              <path className="euiSeriesChartSeries_area" d={state.d as string}/>
            </g>
         );
        }
      }
      </Animate>
    );
  }
  private renderArea = (d: string) => {
    return (
      <g className="euiSeriesChartSeries_areaGroup">
        <path className="euiSeriesChartSeries_area" d={d}/>
      </g>
    );
  }
}
