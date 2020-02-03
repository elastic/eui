import React, {
  cloneElement,
  Component,
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { ExclusiveUnion, CommonProps, keysOf } from '../../common';

import { get } from '../../../services/objects';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';

import makeId from './make_id';

const displayToClassNameMap = {
  row: null,
  rowCompressed: 'euiFormRow--compressed',
  columnCompressed: 'euiFormRow--compressed euiFormRow--horizontal',
  center: null,
  centerCompressed: 'euiFormRow--compressed',
  columnCompressedSwitch:
    'euiFormRow--compressed euiFormRow--horizontal euiFormRow--hasSwitch',
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type EuiFormRowDisplayKeys = keyof typeof displayToClassNameMap;

interface EuiFormRowState {
  isFocused: boolean;
  id: string;
}

type EuiFormRowCommonProps = CommonProps & {
  /**
   * When `rowCompressed`, just tightens up the spacing;
   * Set to `columnCompressed` if compressed
   * and horizontal layout is needed.
   * Set to `center` or `centerCompressed` to align non-input
   * content better with inline rows.
   * Set to `columnCompressedSwitch` if the form control being passed
   * as the child is a switch.
   */
  display?: EuiFormRowDisplayKeys;
  hasEmptyLabelSpace?: boolean;
  fullWidth?: boolean;
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds?: string[];
  /**
   * Escape hatch to not render duplicate labels if the child also renders a label
   */
  hasChildLabel?: boolean;
  children: ReactElement;
  label?: ReactNode;
  /**
   * Adds an extra node to the right of the form label without
   * being contained inside the form label. Good for things
   * like documentation links.
   */
  labelAppend?: any;
  id?: string;
  isInvalid?: boolean;
  error?: ReactNode | ReactNode[];
  helpText?: ReactNode;
  /**
   * **DEPRECATED: use `display: rowCompressed` instead.**
   * When `true`, tightens up the spacing.
   */
  compressed?: boolean;
  /**
   * **DEPRECATED: use `display: center` instead.**
   * Vertically centers non-input style content so it aligns
   * better with input style content.
   */
  displayOnly?: boolean;
};

type LabelProps = {
  labelType?: 'label';
} & EuiFormRowCommonProps &
  HTMLAttributes<HTMLDivElement>;

type LegendProps = {
  labelType?: 'legend';
} & EuiFormRowCommonProps &
  HTMLAttributes<HTMLFieldSetElement>;

export type EuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps>;

export class EuiFormRow extends Component<EuiFormRowProps, EuiFormRowState> {
  static defaultProps = {
    display: 'row',
    hasEmptyLabelSpace: false,
    fullWidth: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
  };

  constructor(props: EuiFormRowProps) {
    super(props);

    this.state = {
      isFocused: false,
      id: props.id || makeId(),
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus(...args: any[]) {
    // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
    const onChildFocus = get(this.props, 'children.props.onFocus');
    if (onChildFocus) {
      onChildFocus(...args);
    }

    this.setState({
      isFocused: true,
    });
  }

  onBlur(...args: any[]) {
    // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
    const onChildBlur = get(this.props, 'children.props.onBlur');
    if (onChildBlur) {
      onChildBlur(...args);
    }

    this.setState({
      isFocused: false,
    });
  }

  render() {
    const {
      children,
      helpText,
      isInvalid,
      error,
      label,
      labelType,
      labelAppend,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      compressed,
      display,
      displayOnly,
      hasChildLabel,
      id: propsId,
      ...rest
    } = this.props;

    const { id } = this.state;

    /**
     * Remove when `compressed` is deprecated
     */
    let shimDisplay: EuiFormRowDisplayKeys;
    if (compressed && display === 'row') {
      shimDisplay = 'rowCompressed';
    } else {
      /**
       * Safe use of ! as prop default is 'row'
       */
      shimDisplay = display!;
    }

    /**
     * Remove when `displayOnly` is deprecated
     */
    if (compressed && displayOnly) {
      shimDisplay = 'centerCompressed';
    } else if (displayOnly && display === 'row') {
      shimDisplay = 'center';
    }

    const classes = classNames(
      'euiFormRow',
      {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth,
      },
      displayToClassNameMap[shimDisplay],
      className
    );

    let optionalHelpText;

    if (helpText) {
      optionalHelpText = (
        <EuiFormHelpText id={`${id}-help`} className="euiFormRow__text">
          {helpText}
        </EuiFormHelpText>
      );
    }

    let optionalErrors;

    if (error && isInvalid) {
      const errorTexts = Array.isArray(error) ? error : [error];
      optionalErrors = errorTexts.map((error, i) => {
        const key = typeof error === 'string' ? error : i;
        return (
          <EuiFormErrorText
            key={key}
            id={`${id}-error-${i}`}
            className="euiFormRow__text">
            {error}
          </EuiFormErrorText>
        );
      });
    }

    let optionalLabel;
    const isLegend = label && labelType === 'legend' ? true : false;

    if (label || labelAppend) {
      let labelProps = {};
      if (isLegend) {
        labelProps = {
          type: labelType,
        };
      } else {
        labelProps = {
          htmlFor: hasChildLabel ? id : undefined,
          isFocused: this.state.isFocused,
          type: labelType,
        };
      }
      optionalLabel = (
        <div className="euiFormRow__labelWrapper">
          <EuiFormLabel
            className="euiFormRow__label"
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            {...labelProps}>
            {label}
          </EuiFormLabel>
          {labelAppend && ' '}
          {labelAppend}
        </div>
      );
    }

    const optionalProps: React.AriaAttributes = {};
    /**
     * Safe use of ! as default prop is []
     */
    const describingIds = [...describedByIds!];

    if (optionalHelpText) {
      describingIds.push(optionalHelpText.props.id);
    }

    if (optionalErrors) {
      optionalErrors.forEach(error => describingIds.push(error.props.id));
    }

    if (describingIds.length > 0) {
      optionalProps['aria-describedby'] = describingIds.join(' ');
    }

    const field = cloneElement(Children.only(children), {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      ...optionalProps,
    });

    const fieldWrapperClasses = classNames('euiFormRow__fieldWrapper', {
      euiFormRow__fieldWrapperDisplayOnly:
        /**
         * Safe use of ! as default prop is 'row'
         */
        displayOnly || display!.startsWith('center'),
    });

    const sharedProps = {
      className: classes,
      id: `${id}-row`,
    };

    const contents = (
      <React.Fragment>
        {optionalLabel}
        <div className={fieldWrapperClasses}>
          {field}
          {optionalErrors}
          {optionalHelpText}
        </div>
      </React.Fragment>
    );

    return labelType === 'legend' ? (
      <fieldset
        {...sharedProps}
        {...rest as HTMLAttributes<HTMLFieldSetElement>}>
        {contents}
      </fieldset>
    ) : (
      <div {...sharedProps} {...rest as HTMLAttributes<HTMLDivElement>}>
        {contents}
      </div>
    );
  }
}
