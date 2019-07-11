import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isWithinRange } from '../../../services/number';
import { EuiPopover } from '../../popover';

import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeTooltip } from './range_tooltip';
import { EuiRangeTrack, LEVEL_COLORS } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

export class EuiRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
    };
  }

  handleOnChange = e => {
    const isValid = isWithinRange(
      this.props.min,
      this.props.max,
      e.target.value
    );
    this.props.onChange(e, isValid);
  };

  get isValid() {
    return isWithinRange(this.props.min, this.props.max, this.props.value);
  }

  onInputClick = () => {
    this.setState({
      isPopoverOpen: true,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

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
      ticks,
      levels,
      showRange,
      showValue,
      valueAppend,
      valuePrepend,
      onChange,
      value,
      style,
      tabIndex,
      ...rest
    } = this.props;

    const digitTolerance = Math.max(String(min).length, String(max).length);
    const showInputOnly = showInput === 'only';
    const classes = classNames('euiRange', className);

    const theInput = !!showInput ? (
      <EuiRangeInput
        min={min}
        max={max}
        digitTolerance={digitTolerance}
        step={step}
        value={value}
        disabled={disabled}
        compressed={compressed}
        onChange={this.handleOnChange}
        name={name}
        onClick={this.onInputClick}
        fullWidth={showInputOnly && fullWidth}
        {...rest}
      />
    ) : (
      undefined
    );

    const theRange = (
      <EuiRangeWrapper
        className={classes}
        fullWidth={fullWidth}
        compressed={compressed}>
        {showLabels && (
          <EuiRangeLabel side="min" disabled={disabled}>
            {min}
          </EuiRangeLabel>
        )}
        <EuiRangeTrack
          disabled={disabled}
          compressed={compressed}
          max={max}
          min={min}
          step={step}
          showTicks={showTicks}
          tickInterval={tickInterval}
          ticks={ticks}
          levels={levels}
          onChange={this.handleOnChange}
          value={value}>
          {showRange && this.isValid && (
            <EuiRangeHighlight
              compressed={compressed}
              showTicks={showTicks}
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(min)}
              upperValue={Number(value)}
            />
          )}

          <EuiRangeSlider
            id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleOnChange}
            style={style}
            showTicks={showTicks}
            showRange={showRange}
            tabIndex={showInput === true ? -1 : tabIndex || null}
            {...rest}
          />

          {showValue && !!String(value).length && (
            <EuiRangeTooltip
              compressed={compressed}
              value={value}
              max={max}
              min={min}
              name={name}
              showTicks={showTicks}
              valuePrepend={valuePrepend}
              valueAppend={valueAppend}
            />
          )}
        </EuiRangeTrack>
        {showLabels && (
          <EuiRangeLabel side="max" disabled={disabled}>
            {max}
          </EuiRangeLabel>
        )}
        {!showInputOnly && showInput && theInput}
      </EuiRangeWrapper>
    );

    const thePopover = showInputOnly ? (
      <EuiPopover
        // ownFocus={popoverShouldOwnFocus}
        button={theInput}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        // zIndex={popoverZIndex}
        className={classNames('euiRange__popover', {
          'euiRange__popover--fullWidth': fullWidth,
        })}
        anchorClassName="euiRange__popoverAnchor"
        display="block"
        // panelClassName={panelClasses}
        // attachToAnchor={button ? false : true}
        anchorPosition="downLeft"
        panelPaddingSize="s">
        {theRange}
      </EuiPopover>
    ) : (
      undefined
    );

    return thePopover ? thePopover : theRange;
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
  disabled: PropTypes.bool,
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: PropTypes.bool,
  /**
   * Pass `true` to displays an extra input control for direct manipulation.
   * Pass `'only'` to only show the input but show the range in a dropdown.
   */
  showInput: PropTypes.oneOf([true, false, 'only']),
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
    })
  ),
  /**
   * Function signature: `(event, isValid)`
   */
  onChange: PropTypes.func,
  /**
   * Create colored indicators for certain intervals
   */
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    })
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
   * Appends to the tooltip
   */
  valueAppend: PropTypes.node,
  /**
   * Prepends to the tooltip
   */
  valuePrepend: PropTypes.node,
};

EuiRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showRange: false,
  showTicks: false,
  showValue: false,
  levels: [],
};
