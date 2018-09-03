import React from 'react';
import Animate from 'react-move/Animate';
import { AreaSeriesGlyph, StackedAreaSeriesGlyph } from '../utils/area_series_utils';
interface AreaSeriesDataProps {
  animated?: boolean;
  area: AreaSeriesGlyph | StackedAreaSeriesGlyph;
}

export class AreaSeries extends React.PureComponent<AreaSeriesDataProps> {
  public static defaultProps: Partial<AreaSeriesDataProps> = {
    animated: false,
  };
  public render() {
    const { animated, area } = this.props;
    // if (area.d === null) {
    //   return null;
    // }
    if (!animated) {
      if (Array.isArray(area)) {
        return this.renderStackedAreas(area);
      }
      return this.renderArea(area as AreaSeriesGlyph);
    }
    return this.renderAnimatedArea((area as AreaSeriesGlyph).d as string);
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
  private renderStackedAreas = (areas: StackedAreaSeriesGlyph) => {
    return (
      <g className="euiSeriesChartSeries_areaGroup">
      {
        areas.map((area, index) => {
          return <path key={`area-${index}`} className="euiSeriesChartSeries_area" d={area.d as string}/>;
        })
      }
      </g>
    );
  }
  private renderArea = (area: AreaSeriesGlyph) => {
    return (
      <g className="euiSeriesChartSeries_areaGroup">
        <path className="euiSeriesChartSeries_area" d={area.d as string}/>
      </g>
    );
  }
}
