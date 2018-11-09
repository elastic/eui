import { none, Option, some } from 'fp-ts/lib/Option';
import { action, observable } from 'mobx';
import {
  AxisTick,
  AxisTicksDimensions,
  computeAxisTicksDimensions,
  getAxisTicksPositions,
} from '../lib/axes/axis_utils';
import { CanvasTextBBoxCalculator } from '../lib/axes/canvas_text_bbox_calculator';
import { computeDataDomain as areaSeriesComputeDataDomain } from '../lib/series/areas/domains';
import { AreaGlyph, renderAreaSeriesSpec } from '../lib/series/areas/rendering';
import { computeDataDomain as barSeriesComputeDataDomain } from '../lib/series/bars/domains';
import { BarGlyphGroup, renderBarSeriesSpec } from '../lib/series/bars/rendering';
import { computeDataDomain as lineSeriesComputeDataDomain } from '../lib/series/lines/domains';
import { LineGlyph, renderLineSeriesSpec } from '../lib/series/lines/rendering';
import {
  AreaSeriesSpec,
  AxisSpec,
  BarSeriesSpec,
  Datum,
  LineSeriesSpec,
  Rendering,
  Rotation,
} from '../lib/series/specs';
import { mergeDomains } from '../lib/series/utils/domains_merger';
import { ColorScales, computeColorScales } from '../lib/themes/colors';
import { DEFAULT_THEME, Theme } from '../lib/themes/theme';
import { computeChartDimensions, Dimensions } from '../lib/utils/dimensions';
import { SpecDomains } from '../lib/utils/domain';
import { AxisId, GroupId, SpecId } from '../lib/utils/ids';
export interface TooltipPosition {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
export interface TooltipData {
  data: Datum[];
  specId: SpecId;
  position: TooltipPosition;
}
const MAX_ANIMATABLE_GLYPHS = 500;

export class ChartStore {
  public debug = true;
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
  public chartRotation: Rotation = 0; // updated from jsx
  public chartRendering: Rendering = 'canvas'; // updated from jsx
  public chartTheme: Theme = DEFAULT_THEME; // updated from jsx
  public axesSpecs: Map<AxisId, AxisSpec> = new Map(); // readed from jsx
  public axesTicksDimensions: Map<AxisId, AxisTicksDimensions> = new Map(); // computed
  public axesPositions: Map<AxisId, Dimensions> = new Map(); // computed
  public axesVisibleTicks: Map<AxisId, AxisTick[]> = new Map(); // computed
  public axesTicks: Map<AxisId, AxisTick[]> = new Map(); // computed

  public barSeriesSpecs: Map<SpecId, BarSeriesSpec> = new Map(); // readed from jsx
  public barSeriesGlyphs: Map<SpecId, BarGlyphGroup[]> = new Map();
  public lineSeriesSpecs: Map<SpecId, LineSeriesSpec> = new Map(); // readed from jsx
  public lineSeriesGlyphs: Map<SpecId, LineGlyph[]> = new Map();
  public areaSeriesSpecs: Map<SpecId, AreaSeriesSpec> = new Map(); // readed from jsx
  public areaSeriesGlyphs: Map<SpecId, AreaGlyph[]> = new Map();

  public seriesSpecDomains: Map<SpecId, SpecDomains> = new Map(); // computed
  public globalSpecDomains: Map<GroupId, SpecDomains> = new Map(); // computed
  public globalColorScales: Map<GroupId, ColorScales> = new Map();

  public tooltipData = observable.box<Option<TooltipData>>(none);

  public animateData = false;
  /**
   * Define if the chart can be animated or not depending
   * on the global configuration and on the number of elements per series
   */
  public canDataBeAnimated = false;
  // public tooltipData = observable.box<Option<TooltipData>>(some({
  //   specId: getSpecId('renderBarChart1y0g'),
  //   data: [{x: 1, y: 2}],
  //   position: {
  //     top: 0,
  //     left: 100,
  //   },
  // }));

  public onTooltipOver = action((specId: SpecId, data: Datum[], position: TooltipPosition) => {
    const tooltip: TooltipData = {
      data,
      specId,
      position,
    };
    this.tooltipData.set(some(tooltip));
  });
  public onTooltipOut = action(() => {
    this.tooltipData.set(none);
  });

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
    const dataDomain = barSeriesComputeDataDomain(seriesSpec);
    // save data domains
    this.seriesSpecDomains.set(seriesSpec.id, dataDomain);
    // merge to global domains
    const globalSpecDomain = this.globalSpecDomains.get(seriesSpec.groupId) || dataDomain;
    const mergedDomain = mergeDomains(globalSpecDomain, dataDomain);
    this.globalSpecDomains.set(seriesSpec.groupId, mergedDomain);

    // TODO merge color scales....
    const colorScales = computeColorScales(dataDomain.colorDomain, this.chartTheme.colors);
    this.globalColorScales.set(seriesSpec.groupId, colorScales);
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
   * Add a line series spec to the chart
   * @param  seriesSpec the series spec to add
   */
  public addLineSeriesSpecs(seriesSpec: LineSeriesSpec) {
    // store spec into lineSeriesSpecs
    this.lineSeriesSpecs.set(seriesSpec.id, seriesSpec);
    // compute all x and y domains
    const dataDomain = lineSeriesComputeDataDomain(seriesSpec);
    // save data domains
    this.seriesSpecDomains.set(seriesSpec.id, dataDomain);
    // merge to global domains
    const globalSpecDomain = this.globalSpecDomains.get(seriesSpec.groupId) || dataDomain;
    const mergedDomain = mergeDomains(globalSpecDomain, dataDomain);
    this.globalSpecDomains.set(seriesSpec.groupId, mergedDomain);

    // TODO merge color scales....
    const colorScales = computeColorScales(dataDomain.colorDomain, this.chartTheme.colors);
    this.globalColorScales.set(seriesSpec.groupId, colorScales);
    // this.mergeChartScales(seriesSpec.groupId, seriesScales);
    // TODO compute chart only after all series are updated
    // this.computeChart();
  }
  /**
   * Add an area series spec to the chart
   * @param  seriesSpec the series spec to add
   */
  public addAreaSeriesSpecs(seriesSpec: LineSeriesSpec) {
    // store spec into areaSeriesSpecs
    this.areaSeriesSpecs.set(seriesSpec.id, seriesSpec);
    // compute all x and y domains
    const dataDomain = areaSeriesComputeDataDomain(seriesSpec);
    // save data domains
    this.seriesSpecDomains.set(seriesSpec.id, dataDomain);
    // merge to global domains
    // merge to global domains
    const globalSpecDomain = this.globalSpecDomains.get(seriesSpec.groupId) || dataDomain;
    const mergedDomain = mergeDomains(globalSpecDomain, dataDomain);
    this.globalSpecDomains.set(seriesSpec.groupId, mergedDomain);

    // TODO merge color scales....
    const colorScales = computeColorScales(dataDomain.colorDomain, this.chartTheme.colors);
    this.globalColorScales.set(seriesSpec.groupId, colorScales);
    // this.mergeChartScales(seriesSpec.groupId, seriesScales);
    // TODO compute chart only after all series are updated
    // this.computeChart();
  }

  /**
   * Remove a series spec from the store
   * @param specId the id of the spec
   */
  public removeLineSeriesSpecs(specId: SpecId) {
    this.lineSeriesSpecs.delete(specId);
    this.seriesSpecDomains.delete(specId);
  }
  /**
   * Remove a series spec from the store
   * @param specId the id of the spec
   */
  public removeAreaSeriesSpecs(specId: SpecId) {
    this.areaSeriesSpecs.delete(specId);
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
    this.initialized.set(false);
    // compute only if parent dimensions are computed
    if (this.parentDimensions.width === 0 || this.parentDimensions.height === 0) {
      return;
    }
    // TODO merge series domains

    // compute axis dimensions
    const bboxCalculator = new CanvasTextBBoxCalculator();
    this.axesTicksDimensions.clear();
    this.axesSpecs.forEach((axisSpec) => {
      const { id, groupId } = axisSpec;
      const groupSeriesScale = this.globalSpecDomains.get(groupId);
      if (groupSeriesScale) {
        const dimensions = computeAxisTicksDimensions(
          axisSpec,
          groupSeriesScale,
          bboxCalculator,
          this.chartTheme.scales,
          this.chartRotation,
        ).toNullable();

        if (dimensions) {
          this.axesTicksDimensions.set(id, dimensions);
        }
      } else {
        throw new Error('Missing group series scale for this axis spec');
      }
    });
    bboxCalculator.destroy();

    // compute chart dimensions
    this.chartDimensions = computeChartDimensions(
      this.parentDimensions,
      this.chartTheme.chart.margins,
      this.chartTheme.chart.paddings,
      this.axesTicksDimensions,
      this.axesSpecs,
    );

    // compute visible ticks and their positions
    const axisTicksPositions = getAxisTicksPositions(
      this.chartDimensions,
      this.chartTheme.chart,
      this.chartRotation,
      this.chartTheme.scales,
      this.axesSpecs,
      this.axesTicksDimensions,
    );
    this.axesPositions = axisTicksPositions.axisPositions;
    this.axesTicks = axisTicksPositions.axisTicks;
    this.axesVisibleTicks = axisTicksPositions.axisVisibleTicks;
    let glyphsCount = 0;
    // compute bar series glyphs
    this.barSeriesSpecs.forEach((barSeriesSpec) => {
      const { id, groupId } = barSeriesSpec;
      const specDomain = this.seriesSpecDomains.get(id);
      const globalSpecDomain = this.globalSpecDomains.get(groupId);
      if (!specDomain) {
        throw new Error('Missing spec domain for existing spec');
      }
      const colorScales = this.globalColorScales.get(groupId);
      const renderedGlyphs = renderBarSeriesSpec(
        barSeriesSpec,
        globalSpecDomain!,
        this.chartDimensions,
        this.chartRotation,
        colorScales!,
        this.chartTheme.colors,
        this.chartTheme.scales,
      );
      this.barSeriesGlyphs.set(id, renderedGlyphs);
      glyphsCount += renderedGlyphs.length;
    });

    // compute line series glyphs
    this.lineSeriesSpecs.forEach((lineSeriesGlyphs) => {
      const { id, groupId } = lineSeriesGlyphs;
      const specDomain = this.seriesSpecDomains.get(id);
      const globalSpecDomain = this.globalSpecDomains.get(groupId);
      if (!specDomain) {
        throw new Error('Missing spec domain for existing spec');
      }
      const colorScales = this.globalColorScales.get(groupId);
      const renderedGlyphs = renderLineSeriesSpec(
        lineSeriesGlyphs,
        globalSpecDomain!,
        this.chartDimensions,
        this.chartRotation,
        colorScales!,
        this.chartTheme.colors,
        this.chartTheme.scales,
      );
      this.lineSeriesGlyphs.set(id, renderedGlyphs);
      glyphsCount += renderedGlyphs.reduce((count, glyphs) => {
        // since paths are less expensive to renders than bars
        // we are just counting half of their points as animate constraint
        return count + glyphs.data.length / 2;
      }, 0);
    });

    // compute area series glyphs
    this.areaSeriesSpecs.forEach((areaSeriesGlyphs) => {
      const { id, groupId } = areaSeriesGlyphs;
      const specDomain = this.seriesSpecDomains.get(id);
      const globalSpecDomain = this.globalSpecDomains.get(groupId);
      if (!specDomain) {
        throw new Error('Missing spec domain for existing spec');
      }
      const colorScales = this.globalColorScales.get(groupId);
      const renderedGlyphs = renderAreaSeriesSpec(
        areaSeriesGlyphs,
        globalSpecDomain!, // just to test
        this.chartDimensions,
        this.chartRotation,
        colorScales!,
        this.chartTheme.colors,
        this.chartTheme.scales,
      );
      this.areaSeriesGlyphs.set(id, renderedGlyphs);
      glyphsCount += renderedGlyphs.reduce((count, glyphs) => {
        // since paths are less expensive to renders than bars
        // we are just counting half of their points as animate constraint
        return count + glyphs.data.length / 2;
      }, 0);
    });
    if (glyphsCount > MAX_ANIMATABLE_GLYPHS) {
      this.canDataBeAnimated = false;
    } else {
      this.canDataBeAnimated = this.animateData;
    }
    this.initialized.set(true);
  }

  // private mergeChartScales(groupId: GroupId, seriesScales: SeriesScales[]) {
  //   // TODO
  //   this.chartScales.set(groupId, seriesScales);
  // }
  public getSpecById(specId: SpecId): BarSeriesSpec  | undefined {
    return this.barSeriesSpecs.get(specId);
  }
}
