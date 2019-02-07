import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import find from 'lodash/find';

export const EuiRangeTicks = ({ disabled, onChange, ticks, tickObject, value, max }) => {
  // Align with item labels across the range by adding
  // left and right negative margins that is half of the tick marks
  const ticksStyle = !!ticks ? undefined : { margin: `0 ${tickObject.percentageWidth / -2}%`, left: 0, right: 0 };

  return (
    <div className="euiRangeTicks" style={ticksStyle}>
      {tickObject.sequence.map((tickValue) => {
        const tickStyle = {};
        let customTick;
        if (ticks) {
          customTick = find(ticks, o => o.value === tickValue);

          if (customTick == null) {
            return;
          } else {
            tickStyle.left = `${(customTick.value / max) * 100}%`;
          }
        } else {
          tickStyle.width = `${tickObject.percentageWidth}%`;
        }

        const tickClasses = classNames(
          'euiRangeTick',
          {
            'euiRangeTick--selected': value === tickValue,
            'euiRangeTick--isCustom': customTick,
          }
        );

        return (
          <button
            type="button"
            className={tickClasses}
            key={tickValue}
            value={tickValue}
            disabled={disabled}
            onClick={onChange}
            style={tickStyle}

            tabIndex="-1"
          >
            {customTick ? customTick.label : tickValue}
          </button>
        );
      })}
    </div>
  );
};

EuiRangeTicks.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  ticks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.node.isRequired,
    }),
  ),
  tickObject: PropTypes.shape({
    decimalWidth: PropTypes.number,
    percentageWidth: PropTypes.number,
    sequence: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]),
  max: PropTypes.number.isRequired
};
