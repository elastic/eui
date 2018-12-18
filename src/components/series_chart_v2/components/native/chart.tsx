import { Layer, Rect, Stage } from 'konva';
import { BarGeometry } from '../../lib/series/rendering';
import { Rotation } from '../../lib/series/specs';
import { Dimensions } from '../../lib/utils/dimensions';
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
  const { parentDimensions, chartDimensions, chartRotation, geometries } = chartStore;
  // stage.clear();
  resizeLayers(canvas, parentDimensions, chartDimensions, chartRotation);
  renderAllBarsSeries(chartLayer, geometries ? geometries.bars : []);
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
  geometries: BarGeometry[],
): void {
  geometries.forEach((geometry) => {
    const { x, y, width, height, color } = geometry;
    const bar = new Rect({
      x,
      y,
      width,
      height,
      fill: color,
      strokeWidth: 0,
      listening: false,
    });
    chartLayer.add(bar);
  });

}
