import {
  AxisId,
  AxisSpec,
  DataSeriesSpec,
  GroupId,
  SeriesScales,
  SpecId,
} from '../commons/specs';

import { computeChartDimensions, Dimensions } from '../commons/dimensions';
import { AxisDimensions, AxisTick, computeAxisDimensions, getAxisTicksPositions } from './axis_utils';
import { computeSeriesDomains } from './series_utils';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';

export class ChartStore {
  public parentDimensions: Dimensions = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  };  // updated from jsx
  public chartDimensions: Dimensions = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  };  // updated from jsx
  public axisSpecs: Map<AxisId, AxisSpec> = new Map(); // readed from jsx
  public axisDimensions: Map<AxisId, AxisDimensions> = new Map(); // computed
  public axisPositions: Map<string, Dimensions> = new Map(); // computed
  public axisVisibleTicks: Map<string, AxisTick[]> = new Map(); // computed
  public axisTicks: Map<string, AxisTick[]> = new Map(); // computed
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
    this.chartDimensions = computeChartDimensions(this.parentDimensions, this.axisDimensions, this.axisSpecs);

    // compute visible ticks and their positions
    const axisTicksPositions = getAxisTicksPositions(this.chartDimensions, this.axisSpecs, this.axisDimensions);
    this.axisPositions = axisTicksPositions.axisPositions;
    this.axisTicks = axisTicksPositions.axisTicks;
    this.axisVisibleTicks = axisTicksPositions.axisVisibleTicks;
  }

  private mergeChartScales(groupId: GroupId, seriesScales: SeriesScales) {
    // TODO
    this.chartScales.set(groupId, seriesScales);
  }
}
