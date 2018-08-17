import { computed, action, observable } from 'mobx';
import { capitalize } from 'lodash';
import { getDomain, mergeGlobalDomains, computeAxisDimensions, computeChartDimensions } from './utils';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';
import { computeLineSeriesDataPoint } from './line_series_utils';
import { computePointSeriesDataPoint } from './point_series_utils';
import { computeBarSeriesDataPoint } from './bar_series_utils';
import { computeAreaSeriesDataPoint } from './area_series_utils';

export class ChartSpecStore {
  specsInitialized = observable.box(false)
  parentInitialized = observable.box(false)
  dataInitialized = observable.box(false)
  initialized = computed(() => {
    return this.specsInitialized.get()
      && this.parentInitialized.get()
      && this.dataInitialized.get();
  })

  parentDimensions = observable({
    width: null,
    height: null,
  })
  chartDimensions = observable({
    width: null,
    height: null,
  })

  updateParentChartSize = action((width, height) => {
    this.parentDimensions.width = width;
    this.parentDimensions.height = height;
    this.parentInitialized.set(true);
    this.updateChartDimensions();
  })

  groupDomains = observable.map()
  lineSeriesSpecs = observable.map()
  pointSeriesSpecs = observable.map()
  areaSeriesSpecs = observable.map()
  barSeriesSpecs = observable.map()
  histogramSeriesSpecs = observable.map()
  dataSeriesSpecs = observable.map()

  addSeriesSpec = action(({ id, groupId, ...spec }) => {
    const xDomain = getDomain(spec.data, spec.xAccessor, spec.xScaleType);
    const yDomain = getDomain(spec.data, spec.yAccessor, spec.yScaleType);
    const config = {
      id,
      groupId,
      ...spec,
      xDomain,
      yDomain,
    };
    const seriesGroupDomain = {
      x: {
        domain: xDomain,
        scaleType: spec.xScaleType,
      },
      y: {
        domain: yDomain,
        scaleType: spec.yScaleType,
      },
    };
    // compute group domains
    if (this.groupDomains.has(groupId)) {
      const currentDomain  = this.groupDomains.get(groupId);
      // TODO merge domains, and convert different
      const mergedDomain = mergeGlobalDomains(currentDomain, seriesGroupDomain);
      this.groupDomains.set(groupId, mergedDomain);
    } else {

      this.groupDomains.set(groupId, seriesGroupDomain);
    }

    switch(spec.type) {
      case 'line':
        this.lineSeriesSpecs.set(id, config);
        break;
      case 'point':
        this.pointSeriesSpecs.set(id, config);
        break;
      case 'area':
        this.areaSeriesSpecs.set(id, config);
        break;
      case 'bar':
        this.barSeriesSpecs.set(id, config);
        break;
      case 'histogram':
        this.histogramSeriesSpecs.set(id, config);
        break;
      case 'data': // empty series spec
      default:
        this.dataSeriesSpecs.set(id, config);
        break;
    }
  })

  vRightAxisSpec = observable.map()
  vLeftAxisSpec = observable.map()
  hTopAxisSpec = observable.map()
  hBottomAxisSpec = observable.map()

  addAxisSpec = action(({ id, orientation, position, ...spec }) => {
    const observableAxisMap = `${orientation.slice(0, 1)}${capitalize(position)}AxisSpec`;
    // TODO check if map exists
    this[observableAxisMap].set(id, {
      orientation,
      position,
      ...spec
    });
  })
  updateLineSeriesDataPoints = action(() => {
    this.lineSeriesSpecs.forEach(spec => {
      const { id, groupId } = spec;
      const currentDomain = this.groupDomains.get(groupId);
      const dataPoints = computeLineSeriesDataPoint(spec, currentDomain, this.chartDimensions);
      this.lineSeriesSpecs.set(id, {
        ...spec,
        ...dataPoints,
      });
    });
  })
  updateAreaSeriesDataPoints = action(() => {
    this.areaSeriesSpecs.forEach(spec => {
      const { id, groupId } = spec;
      const currentDomain = this.groupDomains.get(groupId);
      const dataPoints = computeAreaSeriesDataPoint(spec, currentDomain, this.chartDimensions);
      this.areaSeriesSpecs.set(id, {
        ...spec,
        ...dataPoints,
      });
    });
  })
  updatePointSeriesDataPoints = action(() => {
    this.pointSeriesSpecs.forEach(spec => {
      const { id, groupId } = spec;
      const currentDomain = this.groupDomains.get(groupId);
      const dataPoints = computePointSeriesDataPoint(spec, currentDomain, this.chartDimensions);
      this.pointSeriesSpecs.set(id, {
        ...spec,
        ...dataPoints,
      });
    });
  })
  updateBarSeriesDataPoints = action(() => {
    this.barSeriesSpecs.forEach(spec => {
      const { id, groupId } = spec;
      const currentDomain = this.groupDomains.get(groupId);
      const dataPoints = computeBarSeriesDataPoint(spec, currentDomain, this.chartDimensions);
      this.barSeriesSpecs.set(id, {
        ...spec,
        ...dataPoints,
      });
    });
  })

  updateAxisDimension = (axisSpecs, bboxCalculator) => {
    axisSpecs.forEach((spec) => {
      const domain = this.groupDomains.get(spec.groupId);
      const dimensions = computeAxisDimensions(spec, domain, bboxCalculator);
      spec.dimensions = dimensions;
    });
  }
  updateAxisTicksPositions = (axisSpecs) => {
    const { width, height, top, left } = this.chartDimensions;
    let sumVertical = 0;
    let sumHorizontal = 0;
    axisSpecs.forEach((spec) => {
      const { scale } = spec.dimensions;
      let firstTickPosition;
      if (spec.orientation === 'vertical') {
        scale.range([height, 0]);
        firstTickPosition = scale(scale.domain()[scale.domain().length - 1]);
      } else {
        scale.range([0, width]);
        firstTickPosition = scale(scale.domain()[0]);
      }
      // remove ticks thats overlap
      let previousOccupiedSpace = firstTickPosition;
      spec.ticks = [];
      for(let i = 0; i < spec.dimensions.tickValues.length; i++) {
        const tickValue = spec.dimensions.tickValues[i];
        const tickPosition = scale(tickValue);
        const requiredSpace = spec.orientation === 'vertical'
          ? spec.dimensions.maxTickHeight / 2
          : spec.dimensions.maxTickWidth / 2;
        const relativeTickPosition =  spec.orientation === 'vertical' ? height - tickPosition : tickPosition;
        if (i === 0) {
          spec.ticks.push({
            position: tickPosition,
            label: spec.tickFormat(tickValue),
          });
          previousOccupiedSpace = firstTickPosition + requiredSpace;
        } else if ((relativeTickPosition - requiredSpace) >= previousOccupiedSpace) {
          spec.ticks.push({
            position: tickPosition,
            label: spec.tickFormat(tickValue),
          });
          previousOccupiedSpace = relativeTickPosition + requiredSpace;
        } else {
          // still add the tick but without a label
          if (spec.showOverlappingTicks || spec.showOverlappingLabels) {
            spec.ticks.push({
              position: tickPosition,
              label: spec.showOverlappingLabels ? spec.tickFormat(tickValue) : null,
            });
          }
        }
      }

      spec.dimensions.position = {};
      if (spec.orientation === 'vertical') {
        const specLeft = spec.position === 'left'
          ? spec.dimensions.maxTickWidth + sumHorizontal
          : left + width + sumHorizontal;
        sumHorizontal += (spec.dimensions.maxTickWidth + spec.tickSize + spec.tickPadding);
        spec.dimensions.position = {
          top: top,
          left: specLeft,
        };
      } else {
        const specTop = spec.position === 'top'
          ? sumVertical
          : top + height + sumVertical;
        sumVertical += (spec.dimensions.maxTickHeight + spec.tickSize + spec.tickPadding);
        spec.dimensions.position = {
          top: specTop,
          left: left,
        };
      }
    });
  }

  updateChartDimensions = action(() => {
    if (!this.parentInitialized.get()) {
      console.info('Parent not already initialized, skip');
    }
    const bboxCalculator = new SvgTextBBoxCalculator();

    this.updateAxisDimension(this.vRightAxisSpec, bboxCalculator);
    this.updateAxisDimension(this.vLeftAxisSpec, bboxCalculator);
    this.updateAxisDimension(this.hTopAxisSpec, bboxCalculator);
    this.updateAxisDimension(this.hBottomAxisSpec, bboxCalculator);

    bboxCalculator.destroy();

    const chartDimensions = computeChartDimensions(this.parentDimensions, {
      vRightAxisSpec: this.vRightAxisSpec,
      vLeftAxisSpec: this.vLeftAxisSpec,
      hTopAxisSpec: this.hTopAxisSpec,
      hBottomAxisSpec: this.hBottomAxisSpec,
    });

    this.chartDimensions = {
      ...chartDimensions,
    };

    this.updateAxisTicksPositions(this.vRightAxisSpec);
    this.updateAxisTicksPositions(this.vLeftAxisSpec);
    this.updateAxisTicksPositions(this.hTopAxisSpec);
    this.updateAxisTicksPositions(this.hBottomAxisSpec);

    this.updateLineSeriesDataPoints();
    this.updatePointSeriesDataPoints();
    this.updateBarSeriesDataPoints();
    this.updateAreaSeriesDataPoints();

    this.dataInitialized.set(true);
  })
}
