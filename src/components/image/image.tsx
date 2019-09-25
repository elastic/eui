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
          <button
            type="button"
            className="euiImage-isFullScreen"
            onClick={this.closeFullScreen}
            onKeyDown={this.onKeyDown}>
            <figure>
              <img src={url} className="euiImage-isFullScreen__img" alt={alt} />
              {optionalCaption}

              <EuiIcon
                type="cross"
                color={fullScreenIconColorMap[fullScreenIconColor]}
                className="euiImage-isFullScreen__icon"
              />
            </figure>
          </button>
        </EuiFocusTrap>
      </EuiOverlayMask>
    );

    if (allowFullScreen) {
      return (
        <button type="button" onClick={this.openFullScreen} className={classes}>
          <figure {...rest}>
            <img src={url} className="euiImage__img" alt={alt} />
            {optionalCaption}
            {allowFullScreenIcon}
            {isFullScreenActive && fullScreenDisplay}
          </figure>
        </button>
      );
    } else {
      return (
        <figure className={classes} {...rest}>
          <img src={url} className="euiImage__img" alt={alt} />
          {optionalCaption}
        </figure>
      );
    }
  }
}
