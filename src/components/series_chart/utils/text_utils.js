import React, { Fragment } from 'react';

/**
 * Word wrapper that takes a long text and wrap words into lines of the same length.
 * and return a SVG component composed by tspan tags.
 * source: https://j11y.io/snippets/wordwrap-for-javascript/
 * @param {Array of Strings} texts - an array of splitted text, one per line
 * @return {Object} Return a Fragment of SVG tspan elements to be used inside axis label formatter.
 */
function labelWordWrap(text, width) {
  const pieces = wordWrap(text, width);
  return (
    <Fragment>
      {pieces.map((piece, i) => {
        return (
          <tspan x={0} dy="1em" key={`text-span-${i}`}>
            {piece}
          </tspan>
        );
      })}
    </Fragment>
  );
}

function wordWrap(text, width = 75, cut = false) {
  if (!text) {
    return text;
  }
  const regex = `.{1,${width}}(s|$)${cut ? `|.{${width}}|.+$` : '|S+?(s|$)'}`;
  return text.match(RegExp(regex, 'g'));
}
export const EuiSeriesChartTextUtils = {
  labelWordWrap,
};
