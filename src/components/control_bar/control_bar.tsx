/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  Component,
  HTMLAttributes,
  MouseEventHandler,
  Ref,
  ReactNode,
} from 'react';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiBreadcrumbs, EuiBreadcrumbsProps } from '../breadcrumbs';
import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiButtonProps,
} from '../button';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';
import { EuiI18n } from '../i18n';
import { EuiIcon } from '../icon';
import { EuiIconProps } from '../icon/icon';
import { EuiPortal } from '../portal';

/**
 * Extends EuiButton excluding `size`. Requires `label` as the `children`.
 */
export interface ButtonControl extends Omit<EuiButtonProps, 'size'> {
  id: string;
  label: ReactNode;
}

type ButtonPropsForAnchor = PropsForAnchor<
  ButtonControl,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type ButtonPropsForButton = PropsForButton<
  ButtonControl,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

type ButtonControlProps = ExclusiveUnion<
  ButtonPropsForAnchor,
  ButtonPropsForButton
> & {
  controlType: 'button';
};

/**
 * Creates a `button` visually styles as a tab.
 * Requires `label` as the `children`.
 * `onClick` must be provided to handle the content swapping.
 */
export interface TabControl
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'onClick'> {
  controlType: 'tab';
  id: string;
  label: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Extends EuiBreadcrumbs
 */
export interface BreadcrumbControl extends EuiBreadcrumbsProps {
  controlType: 'breadcrumbs';
  id: string;
}

/**
 * Simple div controlling color and size text output.
 * Requires `label` as the `children`.
 */
export interface TextControl
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  controlType: 'text';
  id: string;
  text: ReactNode;
}

export interface SpacerControl {
  controlType: 'spacer';
}

export interface DividerControl {
  controlType: 'divider';
}

/**
 * Custom props specific to the icon control type
 */
export interface IconControlProps {
  controlType: 'icon';
  id: string;
  iconType: string;
  onClick?: MouseEventHandler;
}

/**
 * Icon can extend EuiIcon
 * Had to omit `onClick` as it's a valid prop of SVGElement
 * Also omits `type` and `id` as these are also specific to icon control
 */
export interface IconControlType
  extends Omit<EuiIconProps, 'type' | 'id' | 'onClick'>,
    IconControlProps {}

/**
 * Icon can extend EuiButtonIcon
 * Also omits `iconType` and `id` as these are also specific to icon control
 */
export interface IconButtonControlType
  extends Omit<EuiButtonIconProps, 'iconType' | 'id'>,
    IconControlProps {}

export type IconControl = ExclusiveUnion<
  IconControlType,
  Omit<IconButtonControlType, 'size' | 'display'>
>;

export type Control = ExclusiveUnion<
  ExclusiveUnion<
    ExclusiveUnion<
      ExclusiveUnion<
        ExclusiveUnion<
          ButtonControlProps,
          ExclusiveUnion<BreadcrumbControl, TabControl>
        >,
        TextControl
      >,
      IconControl
    >,
    DividerControl
  >,
  SpacerControl
>;

export type EuiControlBarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Show or hide the content area containing the `children`
     */
    showContent?: boolean;

    /**
     * An array of controls, actions, and layout spacers to display.
     * Accepts `'button' | 'tab' | 'breadcrumbs' | 'text' | 'icon' | 'spacer' | 'divider'`
     */
    controls: Control[];

    /**
     * The default height of the content area.
     */
    size?: 's' | 'm' | 'l';

    /**
     * Customize the max height.
     * Best when used with `size=l` as this will ensure the actual height equals the max height set.
     */
    maxHeight?: number | string;

    /**
     * Set the offset from the left side of the screen.
     */
    leftOffset?: number | string;

    /**
     * Set the offset from the left side of the screen.
     */
    rightOffset?: number | string;

    /**
     * The control bar is hidden on mobile by default. Use the `showOnMobile` prop to force it's display on mobile screens.
     * You'll need to ensure that the content you place into the bar renders as expected on mobile.
     */
    showOnMobile?: boolean;

    /**
     * By default EuiControlBar will live in a portal, fixed position to the browser window.
     * Change the position of the bar to live inside a container and be positioned against its parent.
     */
    position?: 'fixed' | 'relative' | 'absolute';

    /**
     * Optional class applied to the body used when `position = fixed`
     */
    bodyClassName?: string;

    /**
     * Customize the screen reader heading that helps users find this control. Default is "Page level controls".
     */
    landmarkHeading?: string;
  };

interface EuiControlBarState {
  selectedTab: string;
}

export class EuiControlBar extends Component<
  EuiControlBarProps,
  EuiControlBarState
> {
  static defaultProps = {
    leftOffset: 0,
    rightOffset: 0,
    position: 'fixed',
    size: 'l',
    showContent: false,
    showOnMobile: false,
  };
  private bar: HTMLElement | null = null;

  componentDidMount() {
    if (this.props.position === 'fixed') {
      const height = this.bar ? this.bar.clientHeight : -1;
      document.body.style.paddingBottom = `${height}px`;
      if (this.props.bodyClassName) {
        document.body.classList.add(this.props.bodyClassName);
      }
    }
  }

  componentWillUnmount() {
    document.body.style.paddingBottom = '';
    if (this.props.bodyClassName) {
      document.body.classList.remove(this.props.bodyClassName);
    }
  }

  state = {
    selectedTab: '',
  };

  render() {
    const {
      children,
      className,
      showContent,
      controls,
      size,
      leftOffset,
      rightOffset,
      maxHeight,
      showOnMobile,
      style,
      position,
      bodyClassName,
      landmarkHeading,
      ...rest
    } = this.props;

    const styles = {
      ...style,
      left: leftOffset,
      right: rightOffset,
      maxHeight: maxHeight,
    };

    const classes = classNames('euiControlBar', className, {
      'euiControlBar-isOpen': showContent,
      'euiControlBar--large': size === 'l',
      'euiControlBar--medium': size === 'm',
      'euiControlBar--small': size === 's',
      'euiControlBar--fixed': position === 'fixed',
      'euiControlBar--absolute': position === 'absolute',
      'euiControlBar--relative': position === 'relative',
      'euiControlBar--showOnMobile': showOnMobile,
    });

    const handleTabClick = (
      control: TabControl,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      this.setState(
        {
          selectedTab: control.id,
        },
        () => {
          control.onClick(e);
        }
      );
    };

    const controlItem = (control: Control, index: number) => {
      switch (control.controlType) {
        case 'button': {
          const {
            controlType,
            id,
            color = 'ghost',
            label,
            className,
            ...rest
          } = control;
          return (
            <EuiButton
              key={id + index}
              className={classNames('euiControlBar__button', className)}
              color={color}
              {...rest}
              size="s">
              {label}
            </EuiButton>
          );
        }
        case 'icon': {
          const {
            controlType,
            id,
            iconType,
            className,
            color = 'ghost',
            onClick,
            href,
            ...rest
          } = control;
          return onClick || href ? (
            <EuiButtonIcon
              key={id + index}
              className={classNames('euiControlBar__buttonIcon', className)}
              onClick={onClick}
              href={href}
              color={color as EuiButtonIconProps['color']}
              {...(rest as IconButtonControlType)}
              iconType={iconType}
            />
          ) : (
            <EuiIcon
              key={id + index}
              className={classNames('euiControlBar__icon', className)}
              type={iconType}
              color={color}
              {...rest}
            />
          );
        }
        case 'divider':
          return (
            <div
              key={control.controlType + index}
              className="euiControlBar__divider"
            />
          );
        case 'spacer':
          return (
            <div
              key={control.controlType + index}
              className="euiControlBar__spacer"
            />
          );
        case 'text': {
          const { controlType, id, text, className, ...rest } = control;
          return (
            <div
              key={id}
              className={classNames('euiControlBar__text', className)}
              {...rest}>
              {text}
            </div>
          );
        }
        case 'tab': {
          const {
            controlType,
            id,
            label,
            onClick,
            className,
            ...rest
          } = control;

          const tabClasses = classNames(
            'euiControlBar__tab',
            {
              'euiControlBar__tab--active':
                showContent && id === this.state.selectedTab,
            },
            className
          );

          return (
            <button
              key={id + index}
              className={tabClasses}
              onClick={(event) => handleTabClick(control, event)}
              {...rest}>
              {label}
            </button>
          );
        }
        case 'breadcrumbs': {
          const { controlType, id, ...rest } = control;
          return (
            <EuiBreadcrumbs
              className="euiControlBar__breadcrumbs"
              key={control.id}
              {...rest}
            />
          );
        }
      }
    };

    const controlBar = (
      <EuiI18n
        token="euiControlBar.screenReaderHeading"
        default="Page level controls">
        {(screenReaderHeading: string) => (
          // Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
          // A bug in voiceover won't list some landmarks in the rotor without an aria-label
          <section
            className={classes}
            aria-label={landmarkHeading ? landmarkHeading : screenReaderHeading}
            {...rest}
            style={styles}>
            <EuiScreenReaderOnly>
              <h2>{landmarkHeading ? landmarkHeading : screenReaderHeading}</h2>
            </EuiScreenReaderOnly>
            <div
              className="euiControlBar__controls"
              ref={(node) => {
                this.bar = node;
              }}>
              {controls.map((control, index) => controlItem(control, index))}
            </div>
            {this.props.showContent ? (
              <div className="euiControlBar__content">{children}</div>
            ) : null}
          </section>
        )}
      </EuiI18n>
    );

    return position === 'fixed' ? (
      <EuiPortal>
        {controlBar}
        <EuiScreenReaderOnly>
          <p aria-live="assertive">
            {landmarkHeading ? (
              <EuiI18n
                token="euiControlBar.customScreenReaderAnnouncement"
                default="There is a new region landmark called {landmarkHeading} with page level controls at the end of the document."
                values={{ landmarkHeading }}
              />
            ) : (
              <EuiI18n
                token="euiControlBar.screenReaderAnnouncement"
                default="There is a new region landmark with page level controls at the end of the document."
              />
            )}
          </p>
        </EuiScreenReaderOnly>
      </EuiPortal>
    ) : (
      controlBar
    );
  }
}
