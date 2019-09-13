import React, {
  cloneElement,
  Component,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import {
  EuiFormControlLayoutIcons,
  EuiFormControlLayoutIconsProps,
} from './form_control_layout_icons';
import { CommonProps } from '../../common';
import { EuiFormLabel } from '../form_label';

export { ICON_SIDES } from './form_control_layout_icons';

type StringOrReactElement = string | ReactElement;
type PrependAppendType = StringOrReactElement | StringOrReactElement[];

type EuiFormControlLayoutProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Creates an input group with element(s) coming before children
     */
    prepend?: PrependAppendType;
    /**
     * Creates an input group with element(s) coming after children
     */
    append?: PrependAppendType;
    children?: ReactNode;
    icon?: EuiFormControlLayoutIconsProps['icon'];
    clear?: EuiFormControlLayoutIconsProps['clear'];
    fullWidth?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    compressed?: boolean;
    readOnly?: boolean;
    /**
     * Connects the prepend and append labels to the input
     */
    inputId?: string;
  };

export class EuiFormControlLayout extends Component<EuiFormControlLayoutProps> {
  render() {
    const {
      children,
      icon,
      clear,
      fullWidth,
      isLoading,
      isDisabled,
      compressed,
      className,
      prepend,
      append,
      readOnly,
      inputId,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFormControlLayout',
      {
        'euiFormControlLayout--fullWidth': fullWidth,
        'euiFormControlLayout--compressed': compressed,
        'euiFormControlLayout--readOnly': readOnly,
        'euiFormControlLayout--group': prepend || append,
        'euiFormControlLayout-isDisabled': isDisabled,
      },
      className
    );

    const prependNodes = this.renderSideNode('prepend', prepend, inputId);
    const appendNodes = this.renderSideNode('append', append, inputId);

    return (
      <div className={classes} {...rest}>
        {prependNodes}
        <div className="euiFormControlLayout__childrenWrapper">
          {children}

          <EuiFormControlLayoutIcons
            icon={icon}
            clear={clear}
            isLoading={isLoading}
          />
        </div>
        {appendNodes}
      </div>
    );
  }

  renderSideNode(
    side: 'append' | 'prepend',
    nodes?: PrependAppendType,
    inputId?: string
  ) {
    if (!nodes) {
      return;
    }

    if (typeof nodes === 'string') {
      return this.createFormLabel(side, nodes, inputId);
    }

    const appendNodes = React.Children.map(nodes, (item, index) =>
      typeof item === 'string'
        ? this.createFormLabel(side, item, inputId)
        : this.createSideNode(side, item, index)
    );

    return appendNodes;
  }

  createFormLabel(
    side: 'append' | 'prepend',
    string: string,
    inputId?: string
  ) {
    return (
      <EuiFormLabel
        htmlFor={inputId}
        className={`euiFormControlLayout__${side}`}>
        {string}
      </EuiFormLabel>
    );
  }

  createSideNode(
    side: 'append' | 'prepend',
    node: ReactElement,
    key: React.Key
  ) {
    return cloneElement(node, {
      className: `euiFormControlLayout__${side}`,
      key: key,
    });
  }
}
