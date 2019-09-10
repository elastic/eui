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
        <figure role="figure" aria-label={caption} {...rest}>
          <img src={url} className="euiImage__img" alt={alt} />
          <figcaption className="euiImage__caption">{caption}</figcaption>
        </figure>
      );
    } else {
      optionalCaption = <img src={url} className="euiImage__img" alt={alt} />;
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
          <div className="euiImage-isFullScreen">
            {optionalCaption}
            <button
              className="euiImage-isFullScreen__button"
              type="button"
              aria-label={`Show ${alt} image full screen`}
              onClick={this.closeFullScreen}
              onKeyDown={this.onKeyDown}>
              <EuiIcon
                type="cross"
                color={fullScreenIconColorMap[fullScreenIconColor]}
                className="euiImage-isFullScreen__icon"
              />
            </button>
          </div>
        </EuiFocusTrap>
      </EuiOverlayMask>
    );

    if (allowFullScreen) {
      return (
        <div className={classes}>
          {optionalCaption}
          <button
            type="button"
            aria-label={`Show ${alt} image full screen`}
            onClick={allowFullScreen ? this.openFullScreen : undefined}
            className="euiImage__button">
            {allowFullScreeIcon}
            {isFullScreenActive && fullScreenDisplay}
          </button>
        </div>
      );
    } else {
      return <div className={classes}>{optionalCaption}</div>;
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
