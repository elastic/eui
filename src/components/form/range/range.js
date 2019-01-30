import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isWithinRange } from '../../../services/number';

import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeTooltip } from './range_tooltip';
import { EuiRangeTrack, LEVEL_COLORS } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

export class EuiRange extends Component {
  handleOnChange = (e) => {
    const isValid = isWithinRange(this.props.min, this.props.max, e.target.value);
    this.props.onChange(e, isValid);
  }

  get isValid() {
    return isWithinRange(this.props.min, this.props.max, this.props.value);
  }

  render() {

    const {
      className,
      compressed,
      disabled,
      fullWidth,
      id,
      max,
      min,
      name,
      step,
      showLabels,
      showInput,
      showTicks,
      tickInterval,
      ticks, // eslint-disable-line no-unused-vars
      levels,
      showRange,
      showValue,
      valueAppend, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      value,
      style,
      tabIndex,
      ...rest
    } = this.props;

    return (
      <EuiRangeWrapper
        className="euiRange"
        fullWidth={fullWidth}
      >
        {showLabels && <EuiRangeLabel side="min" disabled={disabled}>{min}</EuiRangeLabel>}
        <EuiRangeTrack
          disabled={disabled}
          max={max}
          min={min}
          step={step}
          showTicks={showTicks}
          tickInterval={tickInterval}
          ticks={ticks}
          levels={levels}
          onChange={this.handleOnChange}
          value={value}
        >
          <EuiRangeSlider
            id={id}
            name={name}
            className={className}
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={this.handleOnChange}
            style={style}
            showTicks={showTicks}
            tabIndex={showInput ? '-1' : (tabIndex || null)}
            {...rest}
          />

          {(showValue && !!String(value).length) && (
            <EuiRangeTooltip
              value={value}
              max={max}
              min={min}
              name={name}
              showTicks={showTicks}
            />
          )}

          {(showRange && this.isValid) && (
            <EuiRangeHighlight
              showTicks={showTicks}
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(min)}
              upperValue={Number(value)}
            />
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel side="max" disabled={disabled}>{max}</EuiRangeLabel>}
        {showInput && (
          <EuiRangeInput
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleOnChange}
            name={name}
            {...rest}
          />
        )}
      </EuiRangeWrapper>
    );
  }
}

EuiRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fullWidth: PropTypes.bool,
  compressed: PropTypes.bool,
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: PropTypes.bool,
  /**
   * Displays an extra input control for direct manipulation
   */
  showInput: PropTypes.bool,
  /**
   * Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)
   */
  showTicks: PropTypes.bool,
  /**
   * Modifies the number of tick marks and at what interval
   */
  tickInterval: PropTypes.number,
  /**
   * Specified ticks at specified values
   */
  ticks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.node.isRequired,
    }),
  ),
  onChange: PropTypes.func,
  /**
   * Create colored indicators for certain intervals
   */
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    }),
  ),
  /**
   * Shows a thick line from min to value
   */
  showRange: PropTypes.bool,
  /**
   * Shows a tooltip styled value
   */
  showValue: PropTypes.bool,
  /**
   * Shows a tooltip styled value
   */
  valueAppend: PropTypes.node,
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showRange: false,
  showTicks: false,
  showValue: false,
  levels: [],
};
