import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';
import { EuiFormRow } from '../form_row';
import { EuiFormHelpText } from '../form_help_text';
import { EuiFormLabel } from '../form_label';
import classNames from 'classnames';

import makeId from '../form_row/make_id';

export class EuiDescriptiveFormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      id: props.id || makeId()
    };
  }

  onFocus = () => {
    this.setState({
      isFocused: true,
    });
  }

  onBlur = () => {
    this.setState({
      isFocused: false,
    });
  }

  render() {
    const {
      id: propId, // eslint-disable-line no-unused-vars
      className,
      isInvalid,
      helpTitle,
      helpText,
      label,
      fullWidth,
      gutterSize,
      ...rest
    } = this.props;

    const { id, isFocused } = this.state;

    const classes = classNames(
      'euiDescriptiveFormRow',
      {
        'euiDescriptiveFormRow--fullWidth': fullWidth,
      },
      className
    );

    return (
      <div className={classes}>
        <EuiFlexGroup gutterSize={gutterSize}>
          <EuiFlexItem>
            <EuiFormLabel
              className="euiDescriptiveFormRow__title"
              isFocused={isFocused}
              isInvalid={isInvalid}
              htmlFor={id}
            >
              {helpTitle || label}
            </EuiFormLabel>
            <EuiFormHelpText
              id={`${id}-help`}
              className="euiDescriptiveFormRow__text"
            >
              {helpText}
            </EuiFormHelpText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow
              id={id}
              isInvalid={isInvalid}
              focusHandler={this.onFocus}
              blurHandler={this.onBlur}
              label={label}
              fullWidth={fullWidth}
              describedByIds={[`${id}-help`]}
              {...rest}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

EuiDescriptiveFormRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
  id: PropTypes.string,
  isInvalid: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  helpTitle: PropTypes.node,
  helpText: PropTypes.node,
  hasEmptyLabelSpace: PropTypes.bool,
  fullWidth: PropTypes.bool,
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
};

EuiDescriptiveFormRow.defaultProps = {
  gutterSize: 'l',
  hasEmptyLabelSpace: false,
  fullWidth: false,
  isInvalid: false,
};
