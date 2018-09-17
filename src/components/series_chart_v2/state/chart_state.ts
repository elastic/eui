import { AxisId, GroupId, SpecId } from '../commons/ids';
import { AxisSpec, BarSeriesSpec } from '../commons/series/specs';

import { observable } from 'mobx';
import {
  AxisTick,
  AxisTicksDimensions,
  computeAxisTicksDimensions,
  getAxisTicksPositions,
} from '../commons/axes/axis_utils';
import { SvgTextBBoxCalculator } from '../commons/axes/svg_text_bbox_calculator';
import { SpecDomains } from '../commons/data_ops/domain';
import { computeChartDimensions, Dimensions } from '../commons/dimensions';
import { computeDataDomain } from '../commons/series/bars/domains';
import { BarGlyphGroup, renderBarSeriesSpec } from '../commons/series/bars/rendering';
import { DEFAULT_THEME, Theme } from '../commons/themes/theme';

export class ChartStore {
  public specsInitialized = observable.box(false);
  public initialized = observable.box(false);
  public parentDimensions: Dimensions = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  }; // updated from jsx
  public chartDimensions: Dimensions = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  }; // updated from jsx
  public chartTheme: Theme = DEFAULT_THEME; // updated from jsx
  public axesSpecs: Map<AxisId, AxisSpec> = new Map(); // readed from jsx
  public axesTicksDimensions: Map<AxisId, AxisTicksDimensions> = new Map(); // computed
  public axesPositions: Map<AxisId, Dimensions> = new Map(); // computed
  public axesVisibleTicks: Map<AxisId, AxisTick[]> = new Map(); // computed
  public axesTicks: Map<AxisId, AxisTick[]> = new Map(); // computed

  public barSeriesSpecs: Map<SpecId, BarSeriesSpec> = new Map(); // readed from jsx
  public barSeriesGlyphs: Map<SpecId, BarGlyphGroup[]> = new Map();
  public seriesSpecDomains: Map<SpecId, SpecDomains> = new Map(); // computed
  public globalSpecDomains: Map<GroupId, SpecDomains> = new Map(); // computed
  // public seriesSpecs: Map<SpecId, DataSeriesSpec> = new Map(); // readed from jsx
  // public seriesScales: Map<SpecId, SeriesScales[]> = new Map(); // computed
  // public chartScales: Map<GroupId, SeriesScales[]> = new Map(); // computed
  // public seriesGlyphs: Map<SpecId, any> = new Map(); // computed

  // public chart: any; // computed

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
   * Add a bar series spec to the chart
   * @param  seriesSpec the series spec to add
   */
  public addBarSeriesSpecs(seriesSpec: BarSeriesSpec) {
    // store spec into barSeriesSpecs
    this.barSeriesSpecs.set(seriesSpec.id, seriesSpec);
    // compute all x and y domains
    const dataDomain = computeDataDomain(seriesSpec);
    console.log({seriesSpec, dataDomain});
    // save data domains
    this.seriesSpecDomains.set(seriesSpec.id, dataDomain);
    // merge to global domains
    // TODO merge to existing series
    this.globalSpecDomains.set(seriesSpec.groupId, dataDomain);

    // this.mergeChartScales(seriesSpec.groupId, seriesScales);
    // TODO compute chart only after all series are updated
    // this.computeChart();
  }

  /**
   * Remove a series spec from the store
   * @param specId the id of the spec
   */
  public removeBarSeriesSpecs(specId: SpecId) {
    this.barSeriesSpecs.delete(specId);
    this.seriesSpecDomains.delete(specId);
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
      const groupSeriesScale = this.globalSpecDomains.get(groupId);
      if (groupSeriesScale) {
        const dimensions = computeAxisTicksDimensions(axisSpec, groupSeriesScale, bboxCalculator);
        this.axesTicksDimensions.set(id, dimensions);
      } else {
        throw new Error('Missing group series scale for this axis spec');
      }
    });
    bboxCalculator.destroy();

    // compute chart dimensions
    this.chartDimensions = computeChartDimensions(
      this.parentDimensions,
      this.chartTheme,
      this.axesTicksDimensions,
      this.axesSpecs,
    );

    // compute visible ticks and their positions
    const axisTicksPositions = getAxisTicksPositions(
      this.chartDimensions,
      this.chartTheme,
      this.axesSpecs,
      this.axesTicksDimensions,
    );
    this.axesPositions = axisTicksPositions.axisPositions;
    this.axesTicks = axisTicksPositions.axisTicks;
    this.axesVisibleTicks = axisTicksPositions.axisVisibleTicks;

    // compute series glyphs
    this.barSeriesSpecs.forEach((barSeriesSpec) => {
      const { id } = barSeriesSpec;
      const specDomain = this.seriesSpecDomains.get(id);
      if (!specDomain) {
        throw new Error('Missing spec domain for existing spec');
      }
      const renderedGlyphs = renderBarSeriesSpec(barSeriesSpec, specDomain, this.chartDimensions);
      console.log(renderedGlyphs);
      this.barSeriesGlyphs.set(id, renderedGlyphs);
    });

    this.initialized.set(true);
    // tslint:disable-next-line:no-console
    console.timeEnd('__chart_computation__');
  }

  // private mergeChartScales(groupId: GroupId, seriesScales: SeriesScales[]) {
  //   // TODO
  //   this.chartScales.set(groupId, seriesScales);
  // }
}
