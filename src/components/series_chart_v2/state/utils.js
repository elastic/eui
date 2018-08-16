import { scaleLinear, scaleBand, scaleLog, scaleSqrt } from 'd3-scale';
import { capitalize, sortedUniq, uniq } from 'lodash';
import { line } from 'd3-shape';
import { max, extent } from 'd3-array';

const SCALES = {
  linear: scaleLinear,
  log: scaleLog,
  sqrt: scaleSqrt,
  ordinal: scaleBand,
};

function createOrdinalScale() {
  return function () {
    const _scale = scaleBand();
    function scale(value) {
      return _scale(value) + (_scale.bandwidth() / 2);
    }
    scale.domain = (domain) => {
      if (domain) {
        _scale.domain(domain);
        return scale;
      }
      return _scale.domain();
    };
    scale.range = (range) => {
      if (range) {
        _scale.range(range);
        return scale;
      }
      return _scale.range();
    };
    scale.ticks = () => {
      return _scale.domain();
    };
    scale.bandwidth = () => {
      return _scale.bandwidth();
    };
    return scale;
  };
}

export function getScaleFromType(scaleType) {
  if (scaleType === 'ordinal') {
    const scale = createOrdinalScale()();
    return scale;
  }
  return SCALES[scaleType]();
}

export function plotPointSeriesData(data, xScale, yScale, xAccessor, yAccessor) {
  return data.map(d => {
    return {
      x: xScale(xAccessor(d)),
      y: yScale(yAccessor(d)),
    };
  });
}

export function plotLineSeriesData(data, xScale, yScale, xAccessor, yAccessor) {
  const lineGenerator = line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));
  return lineGenerator(data);
}

export function getScaleTicks(scaleType, domain) {
  // TODO find the best way to configure axis for categories/quantitative data
  const scale = getScaleFromType(scaleType)
    .domain(domain)
    .range([1, 0]);
  const tickValues = scale.ticks();
  return {
    scale,
    tickValues,
  };
}


export function computeAxisDimensions(axisSpec, domain, bboxCalculator) {
  const axisDomain = axisSpec.orientation === 'horizontal' ? domain.x : domain.y;
  const { scale, tickValues } = getScaleTicks(axisDomain.scaleType, axisDomain.domain);
  const tickLabels = tickValues.map(axisSpec.tickFormat);

  // compute the boundingbox for each formatted label
  const ticksDimensions = tickLabels.map((tickLabel) => {
    const bbox = bboxCalculator.compute(tickLabel);
    return {
      width: bbox.width,
      height: bbox.height,
    };
  });

  const maxTickWidth = max(ticksDimensions, bbox => bbox.width);
  const maxTickHeight = max(ticksDimensions, bbox => bbox.height);

  // remove ticks if overlapping


  return {
    scale,
    ticksDimensions,
    tickValues,
    tickLabels,
    maxTickWidth,
    maxTickHeight,
  };
}

function maxTickDimension(axisSpec, dimensionName) {
  let max = 0;
  let total = 0;
  axisSpec.forEach(spec => {
    const maxTickDimension = spec.dimensions[`maxTick${capitalize(dimensionName)}`];
    max = Math.max(max, maxTickDimension);
    total += maxTickDimension + spec.tickSize + spec.tickPadding;
  });
  return {
    max,
    total
  };
}

export function computeChartDimensions(parentDimensions, axisSpecs) {

  const { vLeftAxisSpec, vRightAxisSpec, hTopAxisSpec, hBottomAxisSpec } = axisSpecs;

  const vLeftAxisSpecWidth = maxTickDimension(vLeftAxisSpec, 'width');
  const vRightAxisSpecWidth = maxTickDimension(vRightAxisSpec, 'width');
  const hTopAxisSpecHeight = maxTickDimension(hTopAxisSpec, 'height');
  const hBottomAxisSpecHeight = maxTickDimension(hBottomAxisSpec, 'height');

  const chartWidth = parentDimensions.width - vLeftAxisSpecWidth.total - vRightAxisSpecWidth.total;

  const chartHeight = parentDimensions.height - hTopAxisSpecHeight.total - hBottomAxisSpecHeight.total;
  return {
    top: hTopAxisSpecHeight.total,
    left: vLeftAxisSpecWidth.total,
    width: chartWidth,
    height: chartHeight,
  };
}

export function getDomain(data, accessor, scaleType, sorted) {
  if (scaleType === 'ordinal') {
    const domain = data.map(accessor);
    return sorted ? sortedUniq(domain) : uniq(domain);
  }
  return extent(data, accessor);
}

export function mergeDomains(prevScaleType, currentDomain, newScaleType, newDomain, sorted) {
  const mergedDomain = {
    scaleType: prevScaleType,
    domain: currentDomain,
  };
  if (prevScaleType === newScaleType) {
    if (prevScaleType !== 'ordinal') {
      // merge directly
      const min = Math.min(currentDomain[0], newDomain[0]);
      const max = Math.max(currentDomain[1], newDomain[1]);
      mergedDomain.domain = [min, max];
    } else {
      // merge and find unique
      const concatDomain = [...currentDomain, ...newDomain];
      mergedDomain.domain = sorted ? sortedUniq(concatDomain) : uniq(concatDomain);
    }
  }
  // TODO merge different scale types ???
  return mergedDomain;
}

export function mergeGlobalDomains(currentDomain, newDomain, sorted) {
  // merge linear x domains
  const xDomain = mergeDomains(
    currentDomain.x.scaleType,
    currentDomain.x.domain,
    newDomain.x.scaleType,
    newDomain.x.domain,
    sorted,
  );
  const yDomain = mergeDomains(
    currentDomain.y.scaleType,
    currentDomain.y.domain,
    newDomain.y.scaleType,
    newDomain.y.domain,
    sorted,
  );

  return {
    x: xDomain,
    y: yDomain,
  };
}
