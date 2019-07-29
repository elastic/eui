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

export { ICON_SIDES } from './form_control_layout_icons';

type ReactElements = ReactElement | ReactElement[];

// if `prepend` and/or `append` is specified then `children` must be undefined or a single ReactElement
interface AppendWithChildren {
  append: ReactElements;
  children?: ReactElement;
}
interface PrependWithChildren {
  prepend: ReactElements;
  children?: ReactElement;
}
type SiblingsWithChildren = AppendWithChildren | PrependWithChildren;

type ChildrenOptions =
  | SiblingsWithChildren
  | {
      append?: undefined | null;
      prepend?: undefined | null;
      children?: ReactNode;
    };

type EuiFormControlLayoutProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  ChildrenOptions & {
    /**
     * Creates an input group with element(s) coming before children
     */
    prepend?: ReactElements;
    /**
     * Creates an input group with element(s) coming after children
     */
    append?: ReactElements;
    icon?: EuiFormControlLayoutIconsProps['icon'];
    clear?: EuiFormControlLayoutIconsProps['clear'];
    fullWidth?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    compressed?: boolean;
    readOnly?: boolean;
  };

function isChildrenIsReactElement(
  append: EuiFormControlLayoutProps['append'],
  prepend: EuiFormControlLayoutProps['prepend'],
  children: EuiFormControlLayoutProps['children']
): children is ReactElement {
  return (!!append || !!prepend) && children != null;
}

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

    const prependNodes = this.renderPrepends();
    const appendNodes = this.renderAppends();

    let clonedChildren;
    if (isChildrenIsReactElement(append, prepend, children)) {
      clonedChildren = cloneElement(children, {
        className: `${
          children.props.className
        } euiFormControlLayout__child--noStyle`,
      });
    }

    return (
      <div className={classes} {...rest}>
        {prependNodes}
        <div className="euiFormControlLayout__childrenWrapper">
          {clonedChildren || children}

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

  renderPrepends() {
    const { prepend } = this.props;

    if (!prepend) {
      return;
    }

    const prependNodes = React.Children.map(prepend, (item, index) =>
      this.createSideNode(item, 'prepend', index)
    );

    return prependNodes;
  }

  renderAppends() {
    const { append } = this.props;

    if (!append) {
      return;
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
