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
  size?: ImageSize | number;
  fullScreenIconColor?: FullScreenIconColor;
  url: string;
  caption?: string;
  hasShadow?: boolean;
  allowFullScreen?: boolean;
}

interface State {
  isFullScreenActive: boolean;
  customStyle?: {
    width?: number | 'auto';
    height?: number | 'auto';
  };
}

export class EuiImage extends Component<EuiImageProps, State> {
  state: State = {
    isFullScreenActive: false,
    customStyle: {},
  };

  containerRef: React.RefObject<HTMLImageElement> = React.createRef();
  getRectsInterval?: NodeJS.Timer = undefined;

  componentDidMount = () => {
    if (this.props.size && typeof this.props.size !== 'string') {
      if (!this.containerRef || !this.containerRef.current) return;

      this.getRectsInterval = setInterval(() => {
        let width: 'auto' | number = this.containerRef.current!.width;
        let height: 'auto' | number = this.containerRef.current!.height;

        if (width > height) {
          width = this.props.size as number;
          height = 'auto';
        } else {
          height = this.props.size as number;
          width = 'auto';
        }
        this.setState({ customStyle: { width, height } });
      }, 10);
    }
  };

  componentWillUnmount() {
    if (this.getRectsInterval) clearInterval(this.getRectsInterval);
  }

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

    const { isFullScreenActive, customStyle } = this.state;

    let classes = classNames(
      'euiImage',
      {
        'euiImage--hasShadow': hasShadow,
        'euiImage--allowFullScreen': allowFullScreen,
      },
      className
    );

    if (typeof size === 'string') {
      classes = `${classes} ${sizeToClassNameMap[size]}`;
    } else {
      classes = `${classes} euiImage--restrictHeight-custom`;
    }

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
        <figure className={classes} aria-label={caption}>
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
                <img
                  ref={this.containerRef}
                  src={url}
                  alt={alt}
                  className="euiImage__img"
                  style={customStyle as React.CSSProperties}
                  {...rest}
                />
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
        <figure className={classes} aria-label={caption}>
          <img
            style={customStyle as React.CSSProperties}
            src={url}
            className="euiImage__img"
            alt={alt}
            {...rest}
          />
          {optionalCaption}
        </figure>
      );
    }
  }
}
