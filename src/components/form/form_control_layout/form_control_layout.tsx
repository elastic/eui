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

type ReactElements = ReactElement | ReactElement[];

type EuiFormControlLayoutProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Creates an input group with element(s) coming before children
     */
    prepend?: string | ReactElements;
    /**
     * Creates an input group with element(s) coming after children
     */
    append?: string | ReactElements;
    children?: ReactNode;
    icon?: EuiFormControlLayoutIconsProps['icon'];
    clear?: EuiFormControlLayoutIconsProps['clear'];
    fullWidth?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    compressed?: boolean;
    readOnly?: boolean;
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

    const prependNodes = this.renderPrepends(prepend);
    const appendNodes = this.renderAppends(append);

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

  renderPrepends(prepend: string | ReactElements | undefined | null) {
    if (!prepend) {
      return;
    }

    if (typeof prepend === 'string') {
      prepend = <EuiFormLabel>{prepend}</EuiFormLabel>;
    }

    const prependNodes = React.Children.map(prepend, (item, index) =>
      this.createSideNode(item, 'prepend', index)
    );

    return prependNodes;
  }

  renderAppends(append: string | ReactElements | undefined | null) {
    if (!append) {
      return;
    }

    if (typeof append === 'string') {
      append = <EuiFormLabel>{append}</EuiFormLabel>;
    }

    const appendNodes = React.Children.map(append, (item, index) =>
      this.createSideNode(item, 'append', index)
    );

    return appendNodes;
  }

  createSideNode(
    node: ReactElement,
    side: 'append' | 'prepend',
    key: React.Key
  ) {
    return cloneElement(node, {
      className: `euiFormControlLayout__${side}`,
      key: key,
    });
  }
}
