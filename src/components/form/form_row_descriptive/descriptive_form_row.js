import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../../text/text';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';

import makeId from '../form_row/make_id';

const paddingSizeToClassNameMap = {
  s: 'euiDescriptiveFormRow__fields--paddingSmall',
  m: 'euiDescriptiveFormRow__fields--paddingMedium',
  l: 'euiDescriptiveFormRow__fields--paddingLarge',
};

export class EuiDescriptiveFormRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || makeId()
    };
  }

  render() {
    const {
      children,
      className,
      gutterSize,
      paddingSize,
      fullWidth,
      title,
      description,
      ...rest
    } = this.props;

    const { id } = this.state;

    const classes = classNames(
      'euiDescriptiveFormRow',
      {
        'euiDescriptiveFormRow--fullWidth': fullWidth,
      },
      className,
    );

    const fieldClasses = classNames(
      'euiDescriptiveFormRow__fields',
      paddingSizeToClassNameMap[paddingSize],
    );

    return (
      <div
        id={id}
        aria-labelledby={`${id}-legend`}
        role="group"
        className={classes}
        {...rest}
      >
        <EuiFlexGroup gutterSize={gutterSize}>
          <EuiFlexItem id={`${id}-legend`} grow={false}>
            <EuiText size="xs" id={`${id}-title`} className="euiDescriptiveFormRow__title">
              {title}
            </EuiText>
            <EuiText size="s" color="subdued" id={`${id}-description`} className="euiDescriptiveFormRow__description">
              {description}
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem className={fieldClasses}>
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

EuiDescriptiveFormRow.propTypes = {
  id: PropTypes.string,
  /**
   * One or more `EuiFormRow`s
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Passed to `EuiFlexGroup`
   */
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  /**
   * Padding to help align the first field to description
   */
  paddingSize: PropTypes.oneOf(['s', 'm', 'l']),
  fullWidth: PropTypes.bool,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

EuiDescriptiveFormRow.defaultProps = {
  gutterSize: 'l',
  paddingSize: 'm',
  fullWidth: false,
};
