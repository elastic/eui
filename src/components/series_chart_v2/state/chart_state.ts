import {
  AxisId,
  GroupId,
  SpecId,
} from '../commons/ids';
import {
  AxisSpec,
  DataSeriesSpec,
  DataSeriesType,
  SeriesScales,
} from '../commons/specs';

import { observable } from 'mobx';
import { computeChartDimensions, Dimensions } from '../commons/dimensions';
import { computeSeriesDomains } from '../commons/domain';
import { computeDataPoints as computeAreaDataPoints } from '../utils/area_series_utils';
import { computeDataPoints as computeBarsDataPoints } from '../utils/bar_series_utils';
import { computeDataPoints as computeLineDataPoints } from '../utils/line_series_utils';
import { AxisDimensions, AxisTick, computeAxisDimensions, getAxisTicksPositions } from './axis_utils';
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
  public axisPositions: Map<AxisId, Dimensions> = new Map(); // computed
  public axisVisibleTicks: Map<AxisId, AxisTick[]> = new Map(); // computed
  public axisTicks: Map<AxisId, AxisTick[]> = new Map(); // computed
  public seriesSpecs: Map<SpecId, DataSeriesSpec> = new Map(); // readed from jsx
  public seriesScales: Map<SpecId, SeriesScales> = new Map(); // computed
  public chartScales: Map<GroupId, SeriesScales> = new Map(); // computed
  public seriesGlyphs: Map<SpecId, any> = new Map(); // computed

  public chart: any; // computed

  public specsInitialized = observable.box(false);
  public initialized = observable.box(false);

  public updateParentDimensions(width: number, height: number, top: number, left: number) {
    let isChanged = false;
    if (width !== this.parentDimensions.width) {
      isChanged = true;
      this.parentDimensions.width = width;
    }
    if (height !== this.parentDimensions.height) {
      isChanged = true;
      this.parentDimensions.height = height;
    }
    if (top !== this.parentDimensions.top) {
      isChanged = true;
      this.parentDimensions.top = top;
    }
    if (left !== this.parentDimensions.left) {
      isChanged = true;
      this.parentDimensions.left = left;
    }
    if (isChanged) {
      this.computeChart();
    }
  }
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
    // TODO compute chart only after all series are updated
    // this.computeChart();
  }

  /**
   * Remove a series spec from the store
   * @param specId the id of the spec
   */
  public removeSeriesSpecs(specId: SpecId) {
    this.seriesSpecs.delete(specId);
  }

  /**
   * Add an axis spec to the store
   * @param axisSpec an axis spec
   */
  public addAxis(axisSpec: AxisSpec) {
    this.axisSpecs.set(axisSpec.id, axisSpec);
  }

  public removeAxis(axisId: AxisId) {
    this.axisSpecs.delete(axisId);
  }

  public computeChart() {
    this.initialized.set(false);
    // TODO merge series domains

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

    // compute series glyphs
    this.seriesSpecs.forEach((seriesSpec) => {
      const { id, type, data, scaleToExtent } = seriesSpec;
      const seriesScale = this.seriesScales.get(id);
      if (!seriesScale) {
        return;
      }
      const xScaleConfig = {
        accessor: seriesSpec.xAccessor,
        type: seriesSpec.xScaleType,
        domain: seriesScale.domains.xDomain,
      };
      const yDomain = scaleToExtent ? seriesScale.domains.yDomain : [0, seriesScale.domains.yDomain[1]];
      const yScaleConfig = {
        accessor: seriesSpec.yAccessor,
        type: seriesSpec.yScaleType,
        domain: yDomain as number[],
      };
      switch (type) {
        case DataSeriesType.Bar:
          const dataPoints = computeBarsDataPoints(data, xScaleConfig, yScaleConfig, this.chartDimensions);
          this.seriesGlyphs.set(id, { type: DataSeriesType.Bar, bars: dataPoints });
          break;
        case DataSeriesType.Line:
          const lineDataPoints = computeLineDataPoints(data, xScaleConfig, yScaleConfig, this.chartDimensions);
          this.seriesGlyphs.set(id, { type: DataSeriesType.Line, line: lineDataPoints });
          break;
        case DataSeriesType.Area:
          const areaDataPoints = computeAreaDataPoints(data, xScaleConfig, yScaleConfig, this.chartDimensions);
          this.seriesGlyphs.set(id, { type: DataSeriesType.Area, area: areaDataPoints });
          break;
      }
      // compute single series glyphs
      // save glyphs to store
    });
    this.initialized.set(true);
  }

  private mergeChartScales(groupId: GroupId, seriesScales: SeriesScales) {
    // TODO
    this.chartScales.set(groupId, seriesScales);
  }
}
