import React from 'react';
import { isBarGlyphGroupLeaf } from '../../lib/series/bars/commons';
import { BarGlyphGroup } from '../../lib/series/bars/rendering';
// import NodeGroup from 'react-move/NodeGroup';

interface BarSeriesDataProps {
  animated?: boolean;
  glyphs: BarGlyphGroup[];
}
export class BarSeries extends React.PureComponent<BarSeriesDataProps> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
  };
  public render() {
    const { animated, glyphs } = this.props;
    if (animated) {
      return this.renderAnimatedBars(glyphs);
    } else {
      return this.renderGlyphs(glyphs);
    }
  }
  private renderGlyphs = (glyphs: BarGlyphGroup[]): JSX.Element[] => {
    if (isBarGlyphGroupLeaf(glyphs)) {
      // leaf
      return this.renderBars(glyphs);
    }
    return (glyphs).map((glyph) => {
      return (
        <g
          key={`group-${glyph.level}-${glyph.levelValue}`}
          transform={`translate(${glyph.x} ${glyph.y})`}
        >
        {
          glyph.elements && this.renderGlyphs(glyph.elements)
        }
        </g>
      );
    });
  }
  private renderBars = (glyphs: BarGlyphGroup[]) => {
    return glyphs.map(({x, y, width, height, fill, opacity}, index) => {
      return (
        <rect
          key={`rect-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
        />);
    });
  }
  private renderAnimatedBars = (glyphs: BarGlyphGroup[]) => {
    return null;
  }
  // private renderAnimatedBars = (bars: BarSeriesGlyph[]) => {
  //   return (
  //     <g className="euiSeriesChartSeries_barGroup">
  //       <NodeGroup
  //         data={bars}
  //         keyAccessor={(d, i) => `${i}`}

  //         start={(d, i) => {
  //           return {
  //             opacity: 1e-6,
  //             height: d.height + d.y,
  //             width: d.width,
  //             x: d.x,
  //             y: d.height + d.y,
  //           };
  //         }}

  //         enter={(d) => ({
  //           opacity: [0.7],
  //           width: d.width,
  //           height: [d.height],
  //           x: [d.x],
  //           y: [d.y],
  //           // timing: { duration: 750, ease: easeExpInOut },
  //           timing: { delay: 500, duration: 500 },
  //         })}

  //         update={(d, i) => ({
  //           opacity: [0.7],
  //           width: [d.width],
  //           height: [d.height],
  //           x: [d.x],
  //           y: [d.y],
  //           timing: { duration: 500 },
  //           // timing: { duration: 750, delay: i * 50, ease: easeExpInOut },
  //         })}

  //         leave={(d) => ({
  //           // opacity: [1e-6],
  //           // height: [d.height + d.y],
  //           // y: [d.height + d.y],
  //           x: [1e6],
  //           // timing: { duration: 750, ease: easeExpInOut },
  //         })}
  //       >
  //         {
  //           (nodes) => {
  //             return (
  //               <g className="euiSeriesChartSeries_barGroup">
  //               {
  //                 nodes.map(({key, state}) => {
  //                   const { x, y, width, height, opacity } = state;
  //                   return this.renderBar({ key, x, y, width, height, opacity });
  //                 })
  //               }
  //               </g>
  //             );

  //           }
  //         }
  //       </NodeGroup>
  //     </g>
  //   );
  // }
  // private renderBar(bar: RenderedBarSeriesGlyph) {
  //   const { key, x, y, width, height, opacity } = bar;
  //   return (
  //     <rect
  //       key={key}
  //       className="euiSeriesChartSeries_bar"
  //       x={x}
  //       y={y}
  //       opacity={opacity}
  //       width={width}
  //       height={height}
  //     />
  //   );
  // }
  // private renderStaticBars(bars: BarSeriesGlyph[]) {
  //   return (
  //     <g className="euiSeriesChartSeries_barGroup">
  //     {
  //       bars.map((bar, index) => {
  //         return this.renderBar({
  //           key: `bar-${index}`,
  //           ...bar as BarSeriesGlyph,
  //         });
  //       })
  //     }
  //     </g>
  //   );
  // }
  // private renderStaticStackedBars(bars: StackedBarSeriesGlyph[]) {
  //   return (
  //     <g className="euiSeriesChartSeries_barGroup">
  //     {
  //       bars.map((stack: StackedBarSeriesGlyph, index) => {
  //         return(
  //           <g className="euiSeriesChartSeries_barStack">
  //             {
  //               stack.map((bar, barIndex) => {
  //                 return this.renderBar({
  //                   key: `bar-${index}-${barIndex}`,
  //                   ...bar,
  //                 });
  //               })
  //             }
  //           </g>
  //         );
  //       })
  //     }
  //     </g>
  //   );
  // }
}
