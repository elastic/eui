import React from 'react'

/**
 * Simplified version of tspan wrapper that takes an array of Strings.
 * and return a SVG component composed by tspan tags.
 * @param {Array of Strings} texts - an array of splitted text, one per line
 * @return {Object} Returns an Object to use with dangerouslySetInnerHTML
 * with the rendered markdown HTML
 */
function tspanTextWrapper(texts) {
  return (
    <tspan>
      {
        texts.map((piece) => {
          return (
            <tspan x={0} dy="1em">{piece}</tspan>
          )
        })
      }
    </tspan>
  )
}

export const EuiXYChartTextUtils = {
  tspanTextWrapper,
}
