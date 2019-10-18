import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiOverlayMask } from '../overlay_mask';

import { EuiIcon } from '../icon';

import { EuiI18n } from '../i18n';

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
  isFullScreenActive: boolean;
}

export class EuiImage extends Component<EuiImageProps, State> {
  state: State = {
    isFullScreenActive: false,
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
      isFullScreenActive: false,
    });
  };

  openFullScreen = () => {
    this.setState({
      isFullScreenActive: true,
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

    const { isFullScreenActive } = this.state;

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

    const allowFullScreenIcon = (
      <EuiIcon
        type="fullScreen"
        color={fullScreenIconColorMap[fullScreenIconColor]}
        className="euiImage__icon"
      />
    );

    const fullScreenDisplay = (
      <EuiOverlayMask onClick={this.closeFullScreen}>
        <EuiFocusTrap clickOutsideDisables={true}>
          <figure
            className="euiImage euiImage-isFullScreen"
            role="figure"
            aria-label={caption}>
            <EuiI18n
              token="euiImage.closeImage"
              values={{ alt }}
              default="Close full screen {alt} image">
              {(closeImage: string) => (
                <button
                  type="button"
                  aria-label={closeImage}
                  className="euiImage__button"
                  onClick={this.closeFullScreen}
                  onKeyDown={this.onKeyDown}>
                  <img
                    src={url}
                    alt={alt}
                    className="euiImage-isFullScreen__img"
                    {...rest}
                  />
                  <EuiIcon
                    type="cross"
                    color={fullScreenIconColorMap[fullScreenIconColor]}
                    className="euiImage-isFullScreen__icon"
                  />
                </button>
              )}
            </EuiI18n>
            {optionalCaption}
          </figure>
        </EuiFocusTrap>
      </EuiOverlayMask>
    );

    if (allowFullScreen) {
      return (
        <figure className={classes} role="figure" aria-label={caption}>
          <EuiI18n
            token="euiImage.openImage"
            values={{ alt }}
            default="Open full screen {alt} image">
            {(openImage: string) => (
              <button
                type="button"
                aria-label={openImage}
                className="euiImage__button"
                onClick={this.openFullScreen}>
                <img src={url} alt={alt} className="euiImage__img" {...rest} />
                {allowFullScreenIcon}
                {isFullScreenActive && fullScreenDisplay}
              </button>
            )}
          </EuiI18n>
          {optionalCaption}
        </figure>
      );
    } else {
      return (
        <figure className={classes} role="figure" aria-label={caption}>
          <img src={url} className="euiImage__img" alt={alt} {...rest} />
          {optionalCaption}
        </figure>
      );
    }
  }
}
