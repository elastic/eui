/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Copyright (c) 2016 - 2017 Uber Technologies, Inc.

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AbstractSeries, ScaleUtils } from 'react-vis';
import { SCALE } from '../utils/chart_utils';
import moment from 'moment';

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function defaultTitleFormat(values) {
  const value = getFirstNonEmptyValue(values);
  if (value) {
    return {
      title: 'x',
      value: value.x,
    };
  }
}

/**
 * Format items by default.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function defaultItemsFormat(values) {
  return values.map((v, i) => {
    if (v) {
      return { value: v.y, title: i };
    }
  });
}

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(v => Boolean(v));
}

export class CrosshairY extends PureComponent {
  static get propTypes() {
    return {
      className: PropTypes.string,
      values: PropTypes.array,
      series: PropTypes.object,
      innerWidth: PropTypes.number,
      innerHeight: PropTypes.number,
      marginLeft: PropTypes.number,
      marginTop: PropTypes.number,
      orientation: PropTypes.oneOf(['left', 'right']),
      itemsFormat: PropTypes.func,
      titleFormat: PropTypes.func,
      style: PropTypes.shape({
        line: PropTypes.object,
        title: PropTypes.object,
        box: PropTypes.object,
      }),
    };
  }

  static get defaultProps() {
    return {
      titleFormat: defaultTitleFormat,
      itemsFormat: defaultItemsFormat,
      style: {
        line: {},
        title: {},
        box: {},
      },
    };
  }

  /**
   * Render crosshair title.
   * @returns {*} Container with the crosshair title.
   * @private
   */
  _renderCrosshairTitle() {
    const { values, titleFormat, style } = this.props;
    const titleItem = titleFormat(values);
    if (!titleItem) {
      return null;
    }
    return (
      <div className="rv-crosshair__title" key="title" style={style.title}>
        <span className="rv-crosshair__title__title">{titleItem.title}</span>
        {': '}
        <span className="rv-crosshair__title__value">{titleItem.value}</span>
      </div>
    );
  }

  /**
   * Render crosshair items (title + value for each series).
   * @returns {*} Array of React classes with the crosshair values.
   * @private
   */
  _renderCrosshairItems() {
    const { values, itemsFormat } = this.props;
    const items = itemsFormat(values);
    if (!items) {
      return null;
    }
    return items
      .filter(i => i)
      .map(function renderValue(item, i) {
        return (
          <div className="rv-crosshair__item" key={`item${i}`}>
            <span className="rv-crosshair__item__title">{item.title}</span>
            {': '}
            <span className="rv-crosshair__item__value">{item.value}</span>
          </div>
        );
      });
  }

  render() {
    const {
      children,
      className,
      values,
      marginTop,
      marginLeft,
      innerWidth,
      style,
    } = this.props;
    const value = getFirstNonEmptyValue(values);
    if (!value) {
      return null;
    }
    const y = ScaleUtils.getAttributeFunctor(this.props, 'y');
    const innerTop = y(value);

    const left = marginLeft;
    const top = marginTop + innerTop;
    const innerClassName = 'rv-crosshair__inner rv-crosshair__inner--left';
    return (
      <div
        className={`rv-crosshair ${className}`}
        style={{ left: `${left}px`, top: `${top}px` }}>
        <div
          className="rv-crosshair__line"
          style={{ width: `${innerWidth}px`, height: '1px', ...style.line }}
        />

        <div className={innerClassName}>
          {children ? (
            children
          ) : (
            <div className="rv-crosshair__inner__content" style={style.box}>
              <div>
                {this._renderCrosshairTitle()}
                {this._renderCrosshairItems()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CrosshairY.displayName = 'CrosshairY';

/**
 * The Crosshair used by the XYChart as main tooltip mechanism along Y axis (horizontal).
 */
export class EuiCrosshairY extends AbstractSeries {
  state = {
    values: [],
  };

  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return false;
  }

  static getDerivedStateFromProps(props) {
    const { crosshairValue, _allData } = props;

    if (crosshairValue !== undefined) {
      return {
        values: EuiCrosshairY._computeDataFromYValue(_allData, crosshairValue),
      };
    }
    return null;
  }

  static _computeDataFromYValue(dataSeries, crosshairValue) {
    const filteredAndFlattenDataByY = dataSeries
      .filter(series => series) // get only cleaned data series
      .map((series, seriesIndex) => {
        return series
          .filter(dataPoint => dataPoint.y === crosshairValue)
          .map(dataPoint => ({
            ...dataPoint,
            originalValues: { ...dataPoint },
            seriesIndex,
          }));
      })
      .reduce((acc, val) => acc.concat(val), []);
    return filteredAndFlattenDataByY;
  }

  onParentMouseMove(event) {
    this._handleNearestY(event);
  }

  onParentMouseLeave() {
    if (this.props.onCrosshairUpdate) {
      this.props.onCrosshairUpdate(null);
    }
    this.setState({
      values: [],
    });
  }
  _formatYValue = y => {
    const { yType, yCrosshairFormat } = this.props;
    if (yType === SCALE.TIME || yType === SCALE.TIME_UTC) {
      return yCrosshairFormat
        ? moment(y).format(yCrosshairFormat)
        : new Date(y).toISOString();
    } else {
      return y;
    }
  };

  _titleFormat = (dataPoints = []) => {
    if (dataPoints.length > 0) {
      const [firstDataPoint] = dataPoints;
      const { originalValues } = firstDataPoint;
      const value =
        typeof originalValues.y0 === 'number'
          ? `${this._formatYValue(originalValues.y0)} to ${this._formatYValue(
              originalValues.y
            )}`
          : this._formatYValue(originalValues.y);
      return {
        title: 'Y Value',
        value,
      };
    }
  };

  _itemsFormat = dataPoints => {
    const { seriesNames } = this.props;
    return dataPoints.map(d => {
      return {
        title: seriesNames[d.seriesIndex],
        value: d.x,
      };
    });
  };

  _handleNearestY(event) {
    const cleanedDataSeries = this.props._allData.filter(
      dataSeries => dataSeries
    );
    if (cleanedDataSeries.length === 0) {
      return;
    }
    const containerCoordiante = super._getXYCoordinateInContainer(event);
    this._findNearestYData(cleanedDataSeries, containerCoordiante.y);
  }

  /**
   * _findNearestYData - Find the nearest set of data in all existing series.
   *
   * @param  {type} dataSeries an array of dataseries
   * @param  {type} mouseYContainerCoords the y coordinate of the mouse on the chart container
   * @protected
   */
  _findNearestYData(dataSeries, mouseYContainerCoords) {
    const yScaleFn = super._getAttributeFunctor('y');
    // keeping a global min distance to filter only elements with the same distance
    let globalMinDistance = Number.POSITIVE_INFINITY;

    const nearestYData = dataSeries
      .map((data, seriesIndex) => {
        let minDistance = Number.POSITIVE_INFINITY;
        let value = null;
        // TODO to increase the performance, it's better to use a search algorithm like bisect
        // starting from the assumption that we will always have the same length for
        // for each series and we can assume that the scale y index can reflect more or less
        // the position of the mouse inside the array.
        data.forEach(item => {
          let itemYCoords;
          const yCoord = yScaleFn(item);
          // check the right item coordinate if we use x0 and x value (e.g. on histograms)
          if (typeof item.y0 === 'number') {
            // we need to compute the scaled y0 using the xScale attribute functor
            // we don't have access of the y0 attribute functor
            const y0Coord = yScaleFn({ y: item.y0 });
            itemYCoords = (yCoord - y0Coord) / 2 + y0Coord;
          } else {
            itemYCoords = yCoord;
          }
          const newDistance = Math.abs(mouseYContainerCoords - itemYCoords);
          if (newDistance < minDistance) {
            minDistance = newDistance;
            value = item;
          }
          globalMinDistance = Math.min(globalMinDistance, minDistance);
        });

        if (!value) {
          return;
        }

        return {
          minDistance,
          value,
          seriesIndex,
        };
      })
      .filter(d => d);

    // filter and map nearest X data per dataseries to get only the nearet onces
    const values = nearestYData
      .filter(value => value.minDistance === globalMinDistance)
      .map(value => {
        // check if we are on histograms and we need to show the right x and y values
        const d = value.value;
        const y = typeof d.y0 === 'number' ? (d.y - d.y0) / 2 + d.y0 : d.y;
        const x = typeof d.x0 === 'number' ? d.x - d.x0 : d.x;
        return { x, y, originalValues: d, seriesIndex: value.seriesIndex };
      });
    const { onCrosshairUpdate } = this.props;
    if (onCrosshairUpdate) {
      onCrosshairUpdate(values[0].y);
    }

    this.setState(() => ({
      values,
    }));
  }

  render() {
    const { values } = this.state;
    return (
      <CrosshairY
        values={values}
        style={{ line: { background: 'rgb(218, 218, 218)' } }}
        itemsFormat={this._itemsFormat}
        titleFormat={this._titleFormat}
        {...this.props}
      />
    );
  }
}

EuiCrosshairY.displayName = 'EuiCrosshairY';

EuiCrosshairY.propTypes = {
  /**
   * The crosshair value used to display this crosshair (doesn't depend on mouse position)
   */
  crosshairValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The ordered array of series names
   */
  seriesNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  yCrosshairFormat: PropTypes.string,
};
EuiCrosshairY.defaultProps = {};
