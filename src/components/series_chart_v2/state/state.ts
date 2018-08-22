import {
  AxisId,
  AxisSpec,
  DataSeriesSpec,
  GroupId,
  SeriesScales,
  SpecId,
} from '../commons/specs';

import { Dimensions } from '../commons/dimensions';
import { AxisDimensions, computeAxisDimensions } from './axis_utils';
import { computeSeriesDomains } from './series_utils';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';

export class ChartStore {
  public parentDimensions: Dimensions = {  // updated from jsx
    width: 0,
    height: 0,
  };
  public chartDimensions: Dimensions = {  // updated from jsx
    width: 0,
    height: 0,
  };
  public axisSpecs: Map<AxisId, AxisSpec> = new Map(); // readed from jsx
  public axisDimensions: Map<AxisId, AxisDimensions> = new Map();
  public seriesSpecs: Map<SpecId, DataSeriesSpec> = new Map(); // readed from jsx
  public seriesScales: Map<SpecId, SeriesScales> = new Map(); // computed
  public chartScales: Map<GroupId, SeriesScales> = new Map(); // computed
  public chart: any; // computed

  /**
   * Add a series spec to the chart
   * @param  seriesSpec the series spec to add
   */
  public addSeriesSpecs(seriesSpec: DataSeriesSpec): void {
    // store seriesSpec
    this.seriesSpecs.set(seriesSpec.id, seriesSpec);
    // computeXDomain and computeYDomain
    const domains = computeSeriesDomains(seriesSpec);
    const { xScaleType, yScaleType } = seriesSpec;
    const seriesScales = {
      domains,
      scaleTypes: {
        xScaleType,
        yScaleType,
      },
    };
    // save scales
    this.seriesScales.set(seriesSpec.id, seriesScales);
    // merge to global domains
    this.mergeChartScales(seriesSpec.groupId, seriesScales);

  }

  public addAxis(axisSpec: AxisSpec) {
    this.axisSpecs.set(axisSpec.id, axisSpec);
  }

  public computeChart() {
    // compute axis dimensions
    const bboxCalculator = new SvgTextBBoxCalculator();
    this.axisDimensions.clear();
    this.axisSpecs.forEach((axisSpec) => {
      const { id, groupId } = axisSpec;
      const groupSeriesScale = this.chartScales.get(groupId);
      if (groupSeriesScale) {
        const dimensions = computeAxisDimensions(axisSpec, groupSeriesScale, bboxCalculator);
        this.axisDimensions.set(id, dimensions);
      }
    });
    bboxCalculator.destroy();

    // compute chart dimensions
  }

  private mergeChartScales(groupId: GroupId, seriesScales: SeriesScales) {
    // TODO
    this.chartScales.set(groupId, seriesScales);
  }
}
