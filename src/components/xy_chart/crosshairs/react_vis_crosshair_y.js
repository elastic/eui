// TODO this is a more or less a copy and paste of crosshair y
// we need to specify the license (if we need to use the uber one)
// we need to find a better name

import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ScaleUtils } from 'react-vis';

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
      value: value.x
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
        box: PropTypes.object
      })
    };
  }

  static get defaultProps() {
    return {
      titleFormat: defaultTitleFormat,
      itemsFormat: defaultItemsFormat,
      style: {
        line: {},
        title: {},
        box: {}
      }
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
    return items.filter(i => i).map(function renderValue(item, i) {
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
      style } = this.props;
    const value = getFirstNonEmptyValue(values);
    if (!value) {
      return null;
    }
    const y = ScaleUtils.getAttributeFunctor(this.props, 'y');
    const innerTop = y(value);

    const left = marginLeft;
    const top = marginTop + innerTop;
    const innerClassName = `rv-crosshair__inner rv-crosshair__inner--left`;
    return (
      <div
        className={`rv-crosshair ${className}`}
        style={{ left: `${left}px`, top: `${top}px` }}
      >

        <div
          className="rv-crosshair__line"
          style={{ width: `${innerWidth}px`, height: '1px', ...style.line }}
        />

        <div className={innerClassName}>
          {children ?
          children :
          <div className="rv-crosshair__inner__content" style={style.box}>
            <div>
              {this._renderCrosshairTitle()}
              {this._renderCrosshairItems()}
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

CrosshairY.displayName = 'CrosshairY';
