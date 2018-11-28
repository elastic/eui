import { Group, Layer, Rect, Stage } from 'konva';
import { BarGeom, BarSeriesState } from '../../lib/series/bars/rendering';
import { BarSeriesSpec, Rotation } from '../../lib/series/specs';
import { Theme } from '../../lib/themes/theme';
import { Dimensions } from '../../lib/utils/dimensions';
import { SpecId } from '../../lib/utils/ids';
import { ChartStore } from '../../state/chart_state';

export interface KonvaCanvas {
  stage: Stage;
  chartLayer: Layer;
  axisLayer: Layer;
}

export function initializeChart(div: HTMLDivElement): KonvaCanvas {
  const stage = new Stage({
    container: div,
    width: 500,
    height: 500,
  });

  const chartLayer = new Layer();
  const axisLayer = new Layer();
  const inteactionLayer = new Layer();
  stage.add(chartLayer);
  stage.add(axisLayer);
  stage.add(inteactionLayer);

  return {
    stage,
    axisLayer,
    chartLayer,
  };
}

export function renderChart(chartStore: ChartStore, canvas: KonvaCanvas) {
  const { chartLayer } = canvas;
  const { parentDimensions, chartDimensions, chartRotation, barSeriesSpecs, barSeriesGlyphs, chartTheme } = chartStore;
  // stage.clear();
  resizeLayers(canvas, parentDimensions, chartDimensions, chartRotation);
  renderAllBarsSeries(chartLayer, barSeriesSpecs, barSeriesGlyphs, chartTheme);
  // stage.draw();
}

function resizeLayers(
  canvas: KonvaCanvas,
  parentDimensions: Dimensions,
  chartDimensions: Dimensions,
  chartRotation: Rotation,
) {
  const { stage, chartLayer } = canvas;
  // configure stage
  stage.width(parentDimensions.width);
  stage.height(parentDimensions.height);

  // configure chart layer
  const chartTransform = {
    x: 0,
    y: 0,
    rotate: 0,
  };
  if (chartRotation === 90) {
    chartTransform.x = chartDimensions.width;
    chartTransform.rotate = 90;
  } else if (chartRotation === -90) {
    chartTransform.y = chartDimensions.height;
    chartTransform.rotate = -90;
  }
  chartLayer.x(chartDimensions.left + chartTransform.x);
  chartLayer.y(chartDimensions.top + chartTransform.y);
}

function renderAllBarsSeries(
  chartLayer: Layer,
  barSeriesSpecs: Map<SpecId, BarSeriesSpec>,
  barSeriesGlyphs: Map<SpecId, BarSeriesState>,
  chartTheme: Theme,
): void {

  barSeriesGlyphs.forEach((barGlyphs, specId) => {
    const spec = barSeriesSpecs.get(specId);
    if (spec) {
      const { tooltipLevel = -1 } = spec;
      renderBarSeries(chartLayer, barGlyphs.geometries, tooltipLevel, chartTheme);
    }
  });
}
function renderBarSeries(chartLayer: Layer, barGlyphs: BarGeom[], tooltipLevel: number , chartTheme: Theme) {
  function renderGlyphs(currentGroup: Group, glyphs: BarGeom[], uuidPath: string) {
    glyphs.forEach((glyph, i) => {
      const { x, y1, width, height, color } = glyph;
      const bar = new Rect({
        x,
        y: y1,
        width,
        height,
        fill: color,
        strokeWidth: 0,
        listening: false,
      });
      currentGroup.add(bar);
    });
  }
  renderGlyphs(chartLayer, barGlyphs, '');
}
