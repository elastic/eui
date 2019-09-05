import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiOverlayMask } from '../overlay_mask';

import { EuiIcon } from '../icon';

import { EuiFocusTrap } from '../focus_trap';

import { keyCodes } from '../../services';

const sizeToClassNameMap = {
  s: 'euiImage--small',
  m: 'euiImage--medium',
  l: 'euiImage--large',
  xl: 'euiImage--xlarge',
  fullWidth: 'euiImage--fullWidth',
  original: '',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const fullScreenIconColorMap = {
  light: 'ghost',
  dark: 'default',
};

export class EuiImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreenActive: false,
    };
  }

  onKeyDown = event => {
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
      size,
      caption,
      hasShadow,
      allowFullScreen,
      fullScreenIconColor,
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

    const allowFullScreeIcon = (
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
            onClick={this.closeFullScreen}
            onKeyDown={this.onKeyDown}>
            <figure
              ref={node => {
                this.figure = node;
              }}
              className="euiImageFullScreen">
              <img src={url} className="euiImageFullScreen__img" alt={alt} />
              {optionalCaption}
            </figure>
          </button>
        </EuiFocusTrap>
      </EuiOverlayMask>
    );

    if (allowFullScreen) {
      return (
        <button
          type="button"
          onClick={allowFullScreen ? this.openFullScreen : undefined}>
          <figure className={classes} {...rest}>
            <img src={url} className="euiImage__img" alt={alt} />
            {optionalCaption}
            {allowFullScreeIcon}
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

EuiImage.propTypes = {
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  fullScreenIconColor: PropTypes.string,
};

EuiImage.defaultProps = {
  size: 'original',
  fullScreenIconColor: 'light',
};
