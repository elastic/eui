/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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

interface EuiImageProps extends CommonProps, HTMLAttributes<HTMLImageElement> {
  /**
   * Sepearate from the caption is a title on the alt tag itself.
   * This one is required for accessibility.
   */
  alt: string;
  /**
   * Accepts `s` / `m` / `l` / `xl` / `original` / `fullWidth` / or a CSS size of `number` or `string`.
   * `fullWidth` will set the figure to stretch to 100% of its container.
   * `string` and `number` types will max both the width or height, whichever is greater.
   */
  size?: ImageSize | number | string;
  /**
   * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
   * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
   */
  fullScreenIconColor?: FullScreenIconColor;
  url: string;
  /**
   * Provides the visible caption to the image
   */
  caption?: string;
  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * When set to `true` will make the image clickable to a larger version
   */
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
      style,
      ...rest
    } = this.props;

    const { isFullScreenActive } = this.state;
    const customStyle: React.CSSProperties = { ...style };

    let classes = classNames(
      'euiImage',
      {
        'euiImage--hasShadow': hasShadow,
        'euiImage--allowFullScreen': allowFullScreen,
      },
      className
    );

    if (typeof size === 'string' && SIZES.includes(size)) {
      classes = `${classes} ${sizeToClassNameMap[size as ImageSize]}`;
    } else {
      classes = `${classes}`;
      customStyle.maxWidth = size;
      customStyle.maxHeight = size;
      // Set width back to auto to ensure aspect ratio is kept
      customStyle.width = 'auto';
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
                  src={url}
                  alt={alt}
                  className="euiImage__img"
                  style={customStyle}
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
            style={customStyle}
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
