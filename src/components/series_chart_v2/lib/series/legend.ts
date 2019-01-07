import { SpecId } from '../utils/ids';
import { DataSeriesColorsValues } from './series';
import { BasicSeriesSpec } from './specs';
export interface LegendItem {
  color: string;
  label: string;
  value: DataSeriesColorsValues;
}
export function computeLegend(
  seriesColor: Map<string, DataSeriesColorsValues>,
  seriesColorMap: Map<string, string>,
  specs: Map<SpecId, BasicSeriesSpec>,
  defaultColor: string,
): LegendItem[] {
  const legendItems: LegendItem[] = [];
  seriesColor.forEach((series, key) => {
    const color = seriesColorMap.get(key) || defaultColor;
    const spec = specs.get(series.specId);
    if (!spec) {
      return;
    }
    legendItems.push({
      color,
      label: series.colorValues.join(' - '),
      value: series,
    });
  });
  return legendItems;
}
