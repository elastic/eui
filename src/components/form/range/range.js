import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeTooltip } from './range_tooltip';
import { EuiRangeTrack, LEVEL_COLORS } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

export const EuiRange = ({
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
  onChange,
  value,
  style,
  tabIndex,
  ...rest
}) => {

  const classes = classNames('euiRange', className);

  return (
    <EuiRangeWrapper
      compressed={compressed}
      disabled={disabled}
      fullWidth={fullWidth}
      showLabels={showLabels}
      showTicks={showTicks}
      levels={levels}
      showRange={showRange}
      showValue={showValue}
    >
      {showLabels && <EuiRangeLabel side="min">{min}</EuiRangeLabel>}
      <EuiRangeTrack
        disabled={disabled}
        max={max}
        min={min}
        step={step}
        showTicks={showTicks}
        tickInterval={tickInterval}
        ticks={ticks}
        levels={levels}
        onChange={onChange}
        value={value}
      >
        <EuiRangeSlider
          id={id}
          name={name}
          className={classes}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={onChange}
          style={style}
          tabIndex={showInput ? '-1' : (tabIndex || null)}
          {...rest}
        />

        {showValue && (
          <EuiRangeTooltip
            value={value}
            max={max}
            min={min}
            name={name}
          />
        )}

        {showRange && (
          <EuiRangeHighlight
            min={Number(min)}
            max={Number(max)}
            lowerValue={Number(min)}
            upperValue={Number(value)}
          />
        )}
      </EuiRangeTrack>
      {showLabels && <EuiRangeLabel side="max">{max}</EuiRangeLabel>}
      {showInput && (
        <EuiRangeInput
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          compressed={compressed}
          onChange={onChange}
          name={name}
        />
      )}
    </EuiRangeWrapper>
  );
};

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
  showTicks: false,
  showValue: false,
  levels: [],
};
