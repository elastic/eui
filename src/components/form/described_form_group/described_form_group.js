import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiTitle, TITLE_SIZES } from '../../title/title';
import { EuiText } from '../../text/text';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';

import makeId from '../form_row/make_id';

const paddingSizeToClassNameMap = {
  xxxs: 'euiDescriptiveFormRow__fieldPadding--xxxsmall',
  xxs: 'euiDescriptiveFormRow__fieldPadding--xxsmall',
  xs: 'euiDescriptiveFormRow__fieldPadding--xsmall',
  s: 'euiDescriptiveFormRow__fieldPadding--small',
  m: 'euiDescriptiveFormRow__fieldPadding--medium',
  l: 'euiDescriptiveFormRow__fieldPadding--large',
};

export class EuiDescribedFormGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ariaId: props.idAria || makeId()
    };
  }

  render() {
    const {
      children,
      className,
      gutterSize,
      fullWidth,
      titleSize,
      title,
      description,
      idAria: userAriaId,
      ...rest
    } = this.props;

    const { ariaId } = this.state;

    const classes = classNames(
      'euiDescriptiveFormRow',
      {
        'euiDescriptiveFormRow--fullWidth': fullWidth,
      },
      className,
    );

    const fieldClasses = classNames(
      'euiDescriptiveFormRow__fields',
      paddingSizeToClassNameMap[titleSize],
    );

    const ariaProps = {
      'aria-labelledby': `${ariaId}-title`,

      // if user has defined an aria ID and there is one child, assume they have passed the ID to
      // the form row and skip describedby here
      'aria-describedby': userAriaId && React.Children.count(children) === 1 ? null : ariaId,
    };

    return (
      <div
        role="group"
        className={classes}
        {...ariaProps}
        {...rest}
      >
        <EuiFlexGroup gutterSize={gutterSize}>
          <EuiFlexItem grow={fullWidth}>
            <EuiTitle id={`${ariaId}-title`} size={titleSize} className="euiDescriptiveFormRow__title">
              {title}
            </EuiTitle>
            <EuiText id={ariaId} size="s" color="subdued" className="euiDescriptiveFormRow__description">
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

EuiDescribedFormGroup.propTypes = {
  /**
   * One or more `EuiFormRow`s
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Passed to `EuiFlexGroup`
   */
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  fullWidth: PropTypes.bool,
  titleSize: PropTypes.oneOf(TITLE_SIZES),
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  idAria: PropTypes.string,
};

EuiDescribedFormGroup.defaultProps = {
  gutterSize: 'l',
  titleSize: 'xs',
  fullWidth: false,
};
