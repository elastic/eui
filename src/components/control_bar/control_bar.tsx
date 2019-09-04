import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, PropsOf, ExclusiveUnion } from '../common';
// @ts-ignore-next-line
import { EuiBreadcrumbs } from '../breadcrumbs';
// @ts-ignore-next-line
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiPortal } from '../portal';
import { EuiText } from '../text';

interface ButtonControl {
  controlType: 'button';
  id: string;
  color?: PropsOf<typeof EuiButton>['color'];
  label: string;
  classNames?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface TabControl {
  controlType: 'tab';
  id: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface Breadcrumb {
  text: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  truncate?: boolean;
}

interface BreadcrumbControl {
  controlType: 'breadcrumbs';
  id: string;
  responsive?: boolean;
  truncate?: boolean;
  max?: number;
  breadcrumbs: Breadcrumb[];
}

interface TextControl {
  controlType: 'text';
  id: string;
  label: string;
  color?: PropsOf<typeof EuiText>['color'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface SpacerControl {
  controlType: 'spacer';
}

interface DivideControl {
  controlType: 'divider';
}

interface IconControl {
  controlType: 'icon';
  id: string;
  iconType: string;
  label: string;
  classNames?: string;
  color?: PropsOf<typeof EuiButtonIcon>['color'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type Control = ExclusiveUnion<
  ExclusiveUnion<
    ExclusiveUnion<
      ExclusiveUnion<
        ExclusiveUnion<
          ButtonControl,
          ExclusiveUnion<BreadcrumbControl, TabControl>
        >,
        TextControl
      >,
      IconControl
    >,
    DivideControl
  >,
  SpacerControl
>;

export type EuiControlBarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Show or hide the content well with your custom content inside
     */
    showContent?: boolean;

    /**
     * An array of controls, actions, and layout spacers to display.
     * Accepts `'button' | 'tab' | 'breadcrumbs' | 'text' | 'icon' | 'spacer' | 'divider'`
     */
    controls: Control[];
    /**
     * The maximum height of the overlay (relative to the window). Default is 90%, Medium is 75%, Small is 50%;
     */
    size?: 's' | 'm' | 'l';
    /**
     * Set the offset from the left side of the screen to account for Kibana's left-hand navigation menu.
     */
    leftOffset?: 's' | 'l' | undefined;
  };

interface EuiControlBarState {
  selectedTab: string;
}

export class EuiControlBar extends Component<
  EuiControlBarProps,
  EuiControlBarState
> {
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
      ...rest
    } = this.props;

    const classes = classNames('euiControlBar', className, {
      'euiControlBar--open': showContent,
      'euiControlBar--large': size === 'l' || !size,
      'euiControlBar--medium': size === 'm',
      'euiControlBar--small': size === 's',
      'euiControlBar--navExpanded': leftOffset === 'l',
      'euiControlBar--navCollapsed': leftOffset === 's',
    });

    const tabClasses = classNames('euiControlBar__tab', {
      'euiControlBar__tab--active': showContent,
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
        case 'button':
          return (
            <EuiButton
              key={control.id + index}
              aria-label={`Control Bar - ${control.label}`}
              onClick={control.onClick}
              data-test-subj={control.label}
              className={classNames(
                'euiControlBar__button',
                control.classNames
              )}
              color={control.color ? control.color : 'ghost'}>
              <EuiText size="s">{control.label}</EuiText>
            </EuiButton>
          );
        case 'icon':
          return (
            <EuiButtonIcon
              key={control.id + index}
              iconType={control.iconType}
              data-test-subj={control.label}
              aria-label={control.label}
              onClick={control.onClick}
              className={classNames(
                'euiControlBar__buttonIcon',
                control.classNames
              )}
              color={control.color ? control.color : 'ghost'}
            />
          );
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
        case 'text':
          return (
            <EuiText
              color={control.color ? control.color : 'ghost'}
              className="euiControlBar__euiText"
              key={control.id + index}
              size="s">
              {control.label}
            </EuiText>
          );
        case 'tab':
          return (
            <button
              key={control.id + index}
              className={`euiControlBar__tab ${
                control.id === this.state.selectedTab ? tabClasses : ''
              }`}
              data-test-subj={control.label}
              aria-label={`Control Bar - ${control.label}`}
              onClick={event => handleTabClick(control, event)}>
              <EuiText size="s">{control.label}</EuiText>
            </button>
          );
        case 'breadcrumbs':
          return (
            <EuiBreadcrumbs
              key={control.id}
              breadcrumbs={control.breadcrumbs}
              responsive={control.responsive}
              truncate={control.truncate}
              max={control.max}
            />
          );
      }
    };

    return (
      <EuiPortal>
        <div className={classes} aria-label="Control Bar" {...rest}>
          <div className="euiControlBar__controls">
            {controls.map((control, index) => {
              return controlItem(control, index);
            })}
          </div>
          {this.props.showContent ? (
            <div className="euiControlBar__content">{children}</div>
          ) : null}
        </div>
      </EuiPortal>
    );
  }
}
