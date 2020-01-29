import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiTitle, TITLE_SIZES } from '../../title/title';
import { EuiText } from '../../text/text';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';

import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiInnerText } from '../../inner_text';

const paddingSizeToClassNameMap = {
  xxxs: 'euiDescribedFormGroup__fieldPadding--xxxsmall',
  xxs: 'euiDescribedFormGroup__fieldPadding--xxsmall',
  xs: 'euiDescribedFormGroup__fieldPadding--xsmall',
  s: 'euiDescribedFormGroup__fieldPadding--small',
  m: 'euiDescribedFormGroup__fieldPadding--medium',
  l: 'euiDescribedFormGroup__fieldPadding--large',
};

export class EuiDescribedFormGroup extends PureComponent {
  render() {
    const {
      children,
      className,
      gutterSize,
      fullWidth,
      titleSize,
      title,
      description,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDescribedFormGroup',
      {
        'euiDescribedFormGroup--fullWidth': fullWidth,
      },
      className
    );

    const fieldClasses = classNames(
      'euiDescribedFormGroup__fields',
      paddingSizeToClassNameMap[titleSize]
    );

    let renderedDescription;

    if (description) {
      renderedDescription = (
        <EuiText
          size="s"
          color="subdued"
          className="euiDescribedFormGroup__description">
          {description}
        </EuiText>
      );
    }

    return (
      <EuiInnerText>
        {(ref, innerText) => (
          <fieldset className={classes} {...rest}>
            <EuiScreenReaderOnly>
              <legend>{innerText}</legend>
            </EuiScreenReaderOnly>

            <EuiFlexGroup gutterSize={gutterSize}>
              <EuiFlexItem>
                <span ref={ref} title={innerText}>
                  <EuiTitle
                    size={titleSize}
                    aria-hidden="true"
                    className="euiDescribedFormGroup__title">
                    {title}
                  </EuiTitle>
                </span>

                {renderedDescription}
              </EuiFlexItem>

              <EuiFlexItem className={fieldClasses}>{children}</EuiFlexItem>
            </EuiFlexGroup>
          </fieldset>
        )}
      </EuiInnerText>
    );
  }
}

EuiDescribedFormGroup.propTypes = {
  /**
   * One or more `EuiFormRow`s
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Passed to `EuiFlexGroup`
   */
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  fullWidth: PropTypes.bool,
  titleSize: PropTypes.oneOf(TITLE_SIZES),
  /**
   * For better accessibility, it's recommended the use of HTML headings
   */
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
};

EuiDescribedFormGroup.defaultProps = {
  gutterSize: 'l',
  titleSize: 'xs',
  fullWidth: false,
};
