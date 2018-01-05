import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { keyCodes } from '../../services';
import FocusTrap from 'focus-trap-react';

import {
  EuiOverlayMask,
  EuiIcon,
} from '../../components';

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

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isImageFullScreen: false,
    };

    this.toggleImageFullScreen = this.toggleImageFullScreen.bind(this);
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      this.toggleImageFullScreen();
    }
  };

  // Only toggle the state if allowed by allowFullScreen prop.
  toggleImageFullScreen() {
    const currentState = this.state.isImageFullScreen;
    if (this.props.allowFullScreen) {
      this.setState({
        isImageFullScreen: !currentState,
      });
    }
  }

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
        <figcaption className="euiImage__caption">
          {caption}
        </figcaption>
      );
    }

    let optionalIcon;
    if (allowFullScreen) {
      optionalIcon = <EuiIcon type="fullScreen" color={fullScreenIconColorMap[fullScreenIconColor]} className="euiImage__icon" />;
    }

    let FullScreenDisplay;

    if (this.state.isImageFullScreen) {
      FullScreenDisplay = (
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: true,
            initialFocus: () => this.figure,
          }}
        >
          <EuiOverlayMask onClick={this.toggleImageFullScreen}>
            <figure
              ref={node => { this.figure = node; }}
              className="euiImageFullScreen"
              onClick={this.toggleImageFullScreen}
              tabIndex={0}
              onKeyDown={this.onKeyDown}
            >
              <img src={url} className="euiImageFullScreen__img" alt={alt} />
              {optionalCaption}
            </figure>
          </EuiOverlayMask>
        </FocusTrap>
      );
    }

    return (
      <figure
        className={classes}
        onClick={this.toggleImageFullScreen}
        {...rest}
      >
        <img src={url} className="euiImage__img" alt={alt} />
        {optionalCaption}

        {/*
          If the below FullScreen image renders, it actually attaches to the body because of
          EuiOverlayMask's React portal usage.
        */}
        {optionalIcon}
        {FullScreenDisplay}
      </figure>
    );
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
