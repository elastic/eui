import {
  AxisId,
  GroupId,
  SpecId,
} from '../commons/ids';
import {
  AxisSpec,
  DataSeriesSpec,
  DataSeriesType,
} from '../commons/specs';

import { observable } from 'mobx';
import { computeChartDimensions, Dimensions } from '../commons/dimensions';
import { computeSeriesDomains, SeriesScales } from '../commons/domain';
import { computeDataPoints as computeAreaDataPoints } from '../utils/area_series_utils';
import { computeDataPoints as computeBarsDataPoints } from '../utils/bar_series_utils';
import { computeDataPoints as computeLineDataPoints } from '../utils/line_series_utils';
import { AxisTick, AxisTicksDimensions, computeAxisTicksDimensions, getAxisTicksPositions } from './axis_utils';
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
  public axesSpecs: Map<AxisId, AxisSpec> = new Map(); // readed from jsx
  public axesTicksDimensions: Map<AxisId, AxisTicksDimensions> = new Map(); // computed
  public axesPositions: Map<AxisId, Dimensions> = new Map(); // computed
  public axesVisibleTicks: Map<AxisId, AxisTick[]> = new Map(); // computed
  public axesTicks: Map<AxisId, AxisTick[]> = new Map(); // computed
  public seriesSpecs: Map<SpecId, DataSeriesSpec> = new Map(); // readed from jsx
  public seriesScales: Map<SpecId, SeriesScales[]> = new Map(); // computed
  public chartScales: Map<GroupId, SeriesScales[]> = new Map(); // computed
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
  public addSeriesSpecs(seriesSpec: DataSeriesSpec) {
    // store seriesSpec
    this.seriesSpecs.set(seriesSpec.id, seriesSpec);
    // computeXDomain and computeYDomain
    const seriesScales = computeSeriesDomains(seriesSpec);
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
  public addAxisSpec(axisSpec: AxisSpec) {
    this.axesSpecs.set(axisSpec.id, axisSpec);
  }

  public removeAxisSpec(axisId: AxisId) {
    this.axesSpecs.delete(axisId);
  }

  public computeChart() {
    // tslint:disable-next-line:no-console
    console.time('__chart_computation__');
    this.initialized.set(false);
    // compute only if parent dimensions are computed
    if (this.parentDimensions.width === 0 || this.parentDimensions.height === 0) {
      // tslint:disable-next-line:no-console
      console.timeEnd('__chart_computation__');
      return;
    }
    // TODO merge series domains

    // compute axis dimensions
    const bboxCalculator = new SvgTextBBoxCalculator();
    this.axesTicksDimensions.clear();
    this.axesSpecs.forEach((axisSpec) => {
      const { id, groupId } = axisSpec;
      const groupSeriesScale = this.chartScales.get(groupId);
      if (groupSeriesScale) {
        const dimensions = computeAxisTicksDimensions(axisSpec, groupSeriesScale, bboxCalculator);
        this.axesTicksDimensions.set(id, dimensions);
      }
    });
    bboxCalculator.destroy();

    // compute chart dimensions
    this.chartDimensions = computeChartDimensions(this.parentDimensions, this.axesTicksDimensions, this.axesSpecs);

    // compute visible ticks and their positions
    const axisTicksPositions = getAxisTicksPositions(this.chartDimensions, this.axesSpecs, this.axesTicksDimensions);
    this.axesPositions = axisTicksPositions.axisPositions;
    this.axesTicks = axisTicksPositions.axisTicks;
    this.axesVisibleTicks = axisTicksPositions.axisVisibleTicks;

    // compute series glyphs
    this.seriesSpecs.forEach((seriesSpec) => {
      const { id, type, data, stackAccessor } = seriesSpec;
      const seriesScales = this.seriesScales.get(id);
      if (!seriesScales) {
        return;
      }
      // compute single series glyphs
      const clamp = false;
      switch (type) {
        case DataSeriesType.Bar:
          const dataPoints = computeBarsDataPoints(data, seriesScales, this.chartDimensions, clamp, stackAccessor);
          this.seriesGlyphs.set(id, { type: DataSeriesType.Bar, bars: dataPoints });
          break;
        case DataSeriesType.Line:
          const lineDataPoints = computeLineDataPoints(data, seriesScales, this.chartDimensions, clamp, stackAccessor);
          this.seriesGlyphs.set(id, { type: DataSeriesType.Line, line: lineDataPoints });
          break;
        case DataSeriesType.Area:
          const areaDataPoints = computeAreaDataPoints(data, seriesScales, this.chartDimensions, clamp, stackAccessor);
          this.seriesGlyphs.set(id, { type: DataSeriesType.Area, area: areaDataPoints });
          break;
      }
    });
    this.initialized.set(true);
    // tslint:disable-next-line:no-console
    console.timeEnd('__chart_computation__');
  }

  private mergeChartScales(groupId: GroupId, seriesScales: SeriesScales[]) {
    // TODO
    this.chartScales.set(groupId, seriesScales);
  }
}
