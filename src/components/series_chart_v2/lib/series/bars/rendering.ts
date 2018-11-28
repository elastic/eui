import { ColorScales, getColor } from '../../themes/colors';
import { ColorConfig, ScalesConfig } from '../../themes/theme';
import { Accessor, getAccessorFn } from '../../utils/accessor';
import { Dimensions } from '../../utils/dimensions';
import { Domain, SpecDomain, SpecDomains } from '../../utils/domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../../utils/scales/scales';
import { BarSeriesSpec, Datum, Rotation } from '../specs';
import { BarScaleFnConfig } from './commons';

export interface BarSeriesState {
  geometries: BarGeom[];
  interactionAreas: BarGeom[];
}

export interface BarGeom {
  x: number;
  y1: number;
  y0: number;
  width: number;
  height: number;
  color?: string;
}

export function renderBarSeriesSpec(
  barSeriesSpec: BarSeriesSpec,
  domains: SpecDomains,
  chartDims: Dimensions,
  rotation: Rotation,
  colorScales: ColorScales,
  chartColorsConfig: ColorConfig,
  chartScalesConfig: ScalesConfig,
): BarSeriesState {
  const {
    data,
    yAccessors,
    splitSeriesAccessors = [],
    stackAccessors = [],
    colorAccessors = [],
    tooltipLevel,
  } = barSeriesSpec;
  const isYStacked = stackAccessors.length > 0;
  const isMultipleY = yAccessors.length > 1;
  let groupingXDomains = domains.xDomains;

  if (!isYStacked) {
    groupingXDomains = domains.xDomains.slice(0, -1);
  }

  const nestedXScaleConfigs = getNestedXScaleConfigs(domains.xDomains, chartDims, chartScalesConfig, rotation);
  const maxY = (rotation === 0 || rotation === 180) ? chartDims.height : chartDims.width;
  const yScaleConfig = getScale(
    yAccessors[0],
    domains.yDomain.scaleType,
    domains.yDomain.domain,
    0,
    maxY,
  );
  const specColorAccessors = colorAccessors.length > 0 ? colorAccessors : [...splitSeriesAccessors];
  const getColorFn = getColor(chartColorsConfig, colorScales, specColorAccessors);

  const stackedDataset = new Map<string, number>();
  const geometries = data.reduce((acc, value) => {
    // compute, for each y accessor, a single bar value
    let stackAccumulatorValue = maxY;
    let stackKey: string;
    if (isYStacked) {
      stackKey = groupingXDomains.map((d) => {
        return getAccessorFn(d.accessor)(value);
      }).join('---');
    }
    const bars = yAccessors.map((yAccessor, index) => {
      // compute x position
      const xAndWidth = computeXPosition(value, nestedXScaleConfigs, isYStacked, isMultipleY, yAccessor);
      if (stackedDataset.has(stackKey)) {
        stackAccumulatorValue = stackedDataset.get(stackKey) || maxY;
      } else {
        stackAccumulatorValue = maxY;
      }

      const y01 = computeYPosition(value, isYStacked, yAccessor, yScaleConfig, maxY, stackAccumulatorValue);
      if (isYStacked) {
        stackedDataset.set(stackKey, y01.y1);
      }
      const color = getColorFn(value, isMultipleY ? `${yAccessor}` : undefined);
      return {
        ...xAndWidth, ...y01, color,
      };
    });
    return [...acc, ...bars];
  }, [] as BarGeom[]);

  const interactionDataset = nestedXScaleConfigs
    .reduce((acc, xScale, index) => {
      const { domain } = domains.xDomains[index];
      const accumulated: any[] = [];
      if (acc.length === 0) {
        return domain.map((d) => [d]);
      }
      domain.forEach((d) => {
        acc.forEach((a) => {
          accumulated.push([...a, d]);
        });
      });
      return accumulated;
    }, [] as any[]);
  const interactionAreasScaleConfigs = getNestedXScaleConfigs(
    domains.xDomains.slice(0, tooltipLevel),
    chartDims,
    chartScalesConfig,
    rotation,
    true,
  );
  const interactionAreas = interactionDataset.reduce((acc: BarGeom[], value: any) => {
    // compute, for each y accessor, a single bar value
    const xAndWidth = computeXPosition(value, interactionAreasScaleConfigs, false, false);
    return [
      ...acc,
      {
        ...xAndWidth, y1: 0, height: maxY, y0: maxY, color: 'gray',
      },
    ];
  }, [] as BarGeom[]);

  return {
    geometries,
    interactionAreas,
  };
}

function getNestedXScaleConfigs(
  domains: SpecDomain[],
  seriesDimensions: Dimensions,
  chartScalesConfig: ScalesConfig,
  rotation: Rotation,
  hasIndexAccessor = false,
): BarScaleFnConfig[] {
  const maxXWidth = (rotation === 0 || rotation === 180) ? seriesDimensions.width : seriesDimensions.height;
  return domains.reduce(
    (acc, scale, index) => {
      const { accessor, scaleType, domain } = scale;
      if (acc.length === 0) {
        const scaleConfig = getScale(
          hasIndexAccessor ? index : accessor,
          scaleType,
          domain,
          0,
          maxXWidth,
          false,
          chartScalesConfig.ordinal.padding,
        );
        return [scaleConfig];
      } else {
        const prevScale = acc[acc.length - 1];
        const scaleConfig = getScale(
          hasIndexAccessor ? index : accessor,
          scaleType,
          domain,
          0,
          prevScale.scaleFn.bandwidth,
          false,
          chartScalesConfig.ordinal.padding,
        );
        return [...acc, scaleConfig];
      }
    },
    [] as BarScaleFnConfig[],
  );
}
function computeXPosition(
  datum: Datum,
  xBarScaleConfigs: BarScaleFnConfig[],
  isYStacked: boolean,
  isMultipleY: boolean,
  yAccessor?: Accessor,
): { x: number, width: number } {
  let width = 0;

  const x = xBarScaleConfigs.reduce((acc, config, index) => {
    if (index === xBarScaleConfigs.length - 1) {
      width = config.scaleFn.bandwidth;
    }
    if (!isYStacked && isMultipleY && yAccessor && index === xBarScaleConfigs.length - 1) {
      const scaledValue = config.scaleFn.scale(yAccessor);
      return acc + scaledValue;

    } else {
      const accessor = config.accessor;

      const accessorFn = getAccessorFn(accessor);
      const value = accessorFn(datum);
      const scaledValue = config.scaleFn.scale(value);
      return acc + scaledValue;
    }

  }, 0);
  return { x, width };
}
function computeYPosition(
  datum: Datum,
  isStacked: boolean,
  yAccessor: Accessor,
  yScalesFnConfig: BarScaleFnConfig,
  maxY: number,
  prevYScaledValue?: number,
): { y1: number, y0: number, height: number} {
  const yValue = getAccessorFn(yAccessor)(datum);
  const scaledYValue = yScalesFnConfig.scaleFn.scale(yValue);
  const height = scaledYValue - yScalesFnConfig.scaleFn.scale(0);
  let y1 = maxY - scaledYValue;
  if (isStacked && prevYScaledValue !== undefined) {
    y1 = prevYScaledValue - height;
  }
  return { y1, y0: maxY, height};
}

export function getScale(
  accessor: Accessor,
  type: ScaleType,
  domain: Domain,
  min: number,
  max: number,
  clamp?: boolean,
  padding?: number,
): BarScaleFnConfig {
  if (type === ScaleType.Ordinal) {
    const scaleFn = createOrdinalScale(domain as string[], min, max, padding);
    return {
      accessor,
      scaleFn,
    };
  } else {
    const scaleFn = createContinuousScale(type, domain as [number, number], min, max, clamp);
    return {
      accessor,
      scaleFn,
    };
  }
}
