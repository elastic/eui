import React from 'react';
import { AbstractSeries } from 'react-vis';

/**
 * Check if the component is series or not.
 * @param {React.Component} child Component.
 * @returns {boolean} True if the child is series, false otherwise.
 */
export function isSeriesChild(child) {
  const { prototype } = child.type;
  return prototype instanceof AbstractSeries;
}

/**
 * Get all series from the 'children' object of the component.
 * @param {Object} children Children.
 * @returns {Array} Array of children.
 */
export function getSeriesChildren(children) {
  return React.Children.toArray(children).filter(
    child => child && isSeriesChild(child)
  );
}

export function rotateDataSeries(data) {
  return data.map(d => {
    return {
      x: d.y,
      y: d.x,
      x0: d.y0,
      y0: d.x0,
    };
  });
}
