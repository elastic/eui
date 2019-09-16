import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiOverlayMask } from '../overlay_mask';

import { EuiIcon } from '../icon';

import { EuiFocusTrap } from '../focus_trap';

import { keyCodes } from '../../services';

type ImageSize = 's' | 'm' | 'l' | 'xl' | 'fullWidth' | 'original';

const sizeToClassNameMap: { [size in ImageSize]: string } = {
  s: 'euiImage--small',
  m: 'euiImage--medium',
  l: 'euiImage--large',
  xl: 'euiImage--xlarge',
  fullWidth: 'euiImage--fullWidth',
  original: '',
};

export const SIZES = Object.keys(sizeToClassNameMap);

type FullScreenIconColor = 'light' | 'dark';

const fullScreenIconColorMap: { [color in FullScreenIconColor]: string } = {
  light: 'ghost',
  dark: 'default',
};

interface EuiImageProps extends CommonProps, HTMLAttributes<HTMLElement> {
  alt: string;
  size?: ImageSize;
  fullScreenIconColor?: FullScreenIconColor;
  url: string;
  caption?: string;
  hasShadow?: boolean;
  allowFullScreen?: boolean;
}

interface State {
  isFullScreen: boolean;
}

export class EuiImage extends Component<EuiImageProps, State> {
  state: State = {
    isFullScreen: false,
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.closeFullScreen();
    }
  };

  closeFullScreen = () => {
    this.setState({
      isFullScreen: false,
    });
  };

  openFullScreen = () => {
    this.setState({
      isFullScreen: true,
    });
  };

  render() {
    const {
      className,
      url,
      size = 'original',
      caption,
      hasShadow,
      allowFullScreen,
      fullScreenIconColor = 'light',
      alt,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiImage',
      sizeToClassNameMap[size],
      {
        'euiImage--hasShadow': hasShadow,
        'euiImage--allowFullScreen': allowFullScreen,
      },
      className
    );

    let optionalCaption;
    if (caption) {
      optionalCaption = (
        <figcaption className="euiImage__caption">{caption}</figcaption>
      );
    }

    let optionalIcon;

    if (allowFullScreen) {
      optionalIcon = (
        <EuiIcon
          type="fullScreen"
          color={fullScreenIconColorMap[fullScreenIconColor]}
          className="euiImage__icon"
        />
      );
    }

    let fullScreenDisplay;

    if (this.state.isFullScreen) {
      fullScreenDisplay = (
        <EuiOverlayMask onClick={this.closeFullScreen}>
          <EuiFocusTrap clickOutsideDisables={true}>
            <button
              type="button"
              onClick={this.closeFullScreen}
              onKeyDown={this.onKeyDown}>
              <figure className="euiImageFullScreen">
                <img src={url} className="euiImageFullScreen__img" alt={alt} />
                {optionalCaption}
              </figure>
            </button>
          </EuiFocusTrap>
        </EuiOverlayMask>
      );
    }

    return (
      <button
        type="button"
        onClick={allowFullScreen ? this.openFullScreen : undefined}>
        <figure className={classes} {...rest}>
          <img src={url} className="euiImage__img" alt={alt} />
          {optionalCaption}

          {/*
          If the below fullScreen image renders, it actually attaches to the body because of
          EuiOverlayMask's React portal usage.
        */}
          {optionalIcon}
          {fullScreenDisplay}
        </figure>
      </button>
    );
  }
}
