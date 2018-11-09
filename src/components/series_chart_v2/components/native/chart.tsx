import { Group, Layer, Rect, Stage } from 'konva';
import { isBarGlyphGroupLeaf } from '../../commons/series/bars/commons';
import { BarGlyphGroup } from '../../commons/series/bars/rendering';
import { BarSeriesSpec, Rotation } from '../../commons/series/specs';
import { Theme } from '../../commons/themes/theme';
import { Dimensions } from '../../commons/utils/dimensions';
import { SpecId } from '../../commons/utils/ids';
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
  barSeriesGlyphs: Map<SpecId, BarGlyphGroup[]>,
  chartTheme: Theme,
): void {

  barSeriesGlyphs.forEach((barGlyphs, specId) => {
    const spec = barSeriesSpecs.get(specId);
    if (spec) {
      const { tooltipLevel = -1 } = spec;
      renderBarSeries(chartLayer, barGlyphs, tooltipLevel, chartTheme);
    }
  });
}
function renderBarSeries(chartLayer: Layer, barGlyphs: BarGlyphGroup[], tooltipLevel: number , chartTheme: Theme) {
  function renderGlyphs(currentGroup: Group, glyphs: BarGlyphGroup[], uuidPath: string) {
    if (isBarGlyphGroupLeaf(glyphs)) {
      return renderBars(currentGroup, glyphs, uuidPath, tooltipLevel, chartTheme);
    }
    glyphs.forEach((glyph, i) => {
      // let onMouseOverFn;
      const groupKey = [uuidPath, glyph.level, glyph.accessor, glyph.levelValue].join('-');
      // if (tooltipLevel === glyph.level && glyph.elements) {
      //   onMouseOverFn = this.onMouseOver(groupKey);
      // }
      const group = new Group({
        x: glyph.x,
        y: glyph.y,
      });
      if (glyph.elements) {
        renderGlyphs(group, glyph.elements, groupKey);
      }
    });
  }
  renderGlyphs(chartLayer, barGlyphs, '');
}

function renderBars(group: Group, glyphs: BarGlyphGroup[], uuidPath: string, tooltipLevel: number, chartTheme: Theme) {
  return glyphs.map((glyph) => {
    const { x, y, width, height, fill, level } = glyph;
    const hasTooltip = tooltipLevel === level;
    // const groupKey = [uuidPath, glyph.level, glyph.accessor, glyph.levelValue].join('-');
    const bar = new Rect({
      x,
      y,
      width,
      height,
      fill,
      strokeWidth: 0,
      listening: hasTooltip,
    });
    group.add(bar);
    // return (
    //   <Rect
    //     key={groupKey}
    //     x={x}
    //     y={y}
    //     width={width}
    //     height={height}
    //     fill={fill}
    //     strokeWidth={0}
    //     listening={hasTooltip}
    //     opacity={this.state.uuid === undefined || groupKey.indexOf(this.state.uuid) === 0 ? 1 : hideOpacity}
    //     perfectDrawEnabled={false}
    //     onMouseOver={hasTooltip ? this.onMouseOver(groupKey) : undefined}
    //     onMouseOut={hasTooltip ? this.onMouseOut : undefined}
    //   />
    // );
  });
}
