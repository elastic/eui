import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';
import { htmlIdGenerator } from '../../../../services';
import { EuiButton, EuiButtonIcon } from '../../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiSpacer } from '../../../spacer';
import { EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiToolTip } from '../../../tool_tip';
import { EuiHorizontalRule } from '../../../horizontal_rule';
import { EuiI18n } from '../../../i18n';
import { timeUnits } from '../time_units';
import { EuiScreenReaderOnly } from '../../../accessibility';

const LAST = 'last';
const NEXT = 'next';

const timeTenseOptions = [
  { value: LAST, text: 'Last' },
  { value: NEXT, text: 'Next' },
];
const timeUnitsOptions = Object.keys(timeUnits).map(key => {
  return { value: key, text: `${timeUnits[key]}s` };
});

export class EuiQuickSelect extends Component {
  constructor(props) {
    super(props);

    const { timeTense, timeValue, timeUnits } = this.props.prevQuickSelect;
    this.state = {
      timeTense: timeTense ? timeTense : LAST,
      timeValue: timeValue ? timeValue : 15,
      timeUnits: timeUnits ? timeUnits : 'm',
    };
  }

  generateId = htmlIdGenerator();

  onTimeTenseChange = evt => {
    this.setState({
      timeTense: evt.target.value,
    });
  };

  onTimeValueChange = evt => {
    const sanitizedValue = parseInt(evt.target.value, 10);
    this.setState({
      timeValue: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  };

  onTimeUnitsChange = evt => {
    this.setState({
      timeUnits: evt.target.value,
    });
  };

  applyQuickSelect = () => {
    const { timeTense, timeValue, timeUnits } = this.state;

    if (timeTense === NEXT) {
      this.props.applyTime({
        start: 'now',
        end: `now+${timeValue}${timeUnits}`,
        quickSelect: { ...this.state },
      });
      return;
    }

    this.props.applyTime({
      start: `now-${timeValue}${timeUnits}`,
      end: 'now',
      quickSelect: { ...this.state },
    });
  };

  getBounds = () => {
    const startMoment = dateMath.parse(this.props.start);
    const endMoment = dateMath.parse(this.props.end, { roundUp: true });
    return {
      min:
        startMoment && startMoment.isValid()
          ? startMoment
          : moment().subtract(15, 'minute'),
      max: endMoment && endMoment.isValid() ? endMoment : moment(),
    };
  };

  stepForward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(max)
        .add(1, 'ms')
        .toISOString(),
      end: moment(max)
        .add(diff + 1, 'ms')
        .toISOString(),
      keepPopoverOpen: true,
    });
  };

  stepBackward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(min)
        .subtract(diff + 1, 'ms')
        .toISOString(),
      end: moment(min)
        .subtract(1, 'ms')
        .toISOString(),
      keepPopoverOpen: true,
    });
  };

  render() {
    const { timeTense, timeValue, timeUnits } = this.state;
    const timeSelectionId = this.generateId();
    const legendId = this.generateId();

    return (
      <fieldset>
        <EuiI18n
          token="euiQuickSelect.legendText"
          default="Quick select a time range">
          {legendText => (
            // Legend needs to be the first thing in a fieldset, but we want the visible title within the flex.
            // So we hide it, but allow screen readers to see it
            <EuiScreenReaderOnly>
              <legend id={legendId} className="euiFormLabel">
                {legendText}
              </legend>
            </EuiScreenReaderOnly>
          )}
        </EuiI18n>
        <EuiFlexGroup
          responsive={false}
          alignItems="center"
          justifyContent="spaceBetween"
          gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiI18n
              token="euiQuickSelect.quickSelectTitle"
              default="Quick select">
              {quickSelectTitle => (
                <div aria-hidden className="euiFormLabel">
                  {quickSelectTitle}
                </div>
              )}
            </EuiI18n>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiI18n
                  token="euiQuickSelect.previousLabel"
                  default="Previous time window">
                  {previousLabel => (
                    <EuiToolTip content={previousLabel}>
                      <EuiButtonIcon
                        aria-label={previousLabel}
                        iconType="arrowLeft"
                        onClick={this.stepBackward}
                      />
                    </EuiToolTip>
                  )}
                </EuiI18n>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiI18n
                  token="euiQuickSelect.nextLabel"
                  default="Next time window">
                  {nextLabel => (
                    <EuiToolTip content={nextLabel}>
                      <EuiButtonIcon
                        aria-label={nextLabel}
                        iconType="arrowRight"
                        onClick={this.stepForward}
                      />
                    </EuiToolTip>
                  )}
                </EuiI18n>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiI18n token="euiQuickSelect.tenseLabel" default="Time tense">
              {tenseLabel => (
                <EuiSelect
                  compressed
                  aria-label={tenseLabel}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  value={timeTense}
                  options={timeTenseOptions}
                  onChange={this.onTimeTenseChange}
                />
              )}
            </EuiI18n>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiI18n token="euiQuickSelect.valueLabel" default="Time value">
              {valueLabel => (
                <EuiFieldNumber
                  compressed
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  aria-label={valueLabel}
                  value={timeValue}
                  onChange={this.onTimeValueChange}
                />
              )}
            </EuiI18n>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiI18n token="euiQuickSelect.unitLabel" default="Time unit">
              {unitLabel => (
                <EuiSelect
                  compressed
                  aria-label={unitLabel}
                  aria-describedby={`${timeSelectionId} ${legendId}`}
                  value={timeUnits}
                  options={timeUnitsOptions}
                  onChange={this.onTimeUnitsChange}
                />
              )}
            </EuiI18n>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              aria-describedby={`${timeSelectionId} ${legendId}`}
              className="euiQuickSelect__applyButton"
              size="s"
              onClick={this.applyQuickSelect}
              disabled={timeValue === '' || timeValue <= 0}>
              <EuiI18n token="euiQuickSelect.applyButton" default="Apply" />
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="s" />
        <EuiScreenReaderOnly id={timeSelectionId}>
          <p>
            <EuiI18n
              token="euiQuickSelect.fullDescription"
              default="Currently set to {timeTense} {timeValue} {timeUnit}."
              values={{
                timeTense,
                timeValue,
                timeUnit: timeUnitsOptions.find(
                  option => option.value === timeUnits
                ).text,
              }}
            />
          </p>
        </EuiScreenReaderOnly>
      </fieldset>
    );
  }
}

EuiQuickSelect.propTypes = {
  applyTime: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  prevQuickSelect: PropTypes.object,
};

EuiQuickSelect.defaultProps = {
  prevQuickSelect: {},
};
