import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { keyCodes } from '../../services';

import {
  EuiOverlayMask,
} from '../../components';

const sizeToClassNameMap = {
  s: 'euiImage--small',
  m: 'euiImage--medium',
  l: 'euiImage--large',
  fullWidth: 'euiImage--fullWidth',
  original: '',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export class EuiImage extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isImageFullscreen: false,
    };

    this.toggleImageFullscreen = this.toggleImageFullscreen.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      this.setState({
        isImageFullscreen: false,
      });
    }
  };

  // Only toggle the state if allowed by allowFullScreen prop.
  toggleImageFullscreen() {
    const currentState = this.state.isImageFullscreen;
    if (this.props.allowFullScreen) {
      this.setState({
        isImageFullscreen: !currentState,
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

    let fullScreenDisplay;

    if (this.state.isImageFullscreen) {
      fullScreenDisplay = (
        <EuiOverlayMask onClick={this.toggleImageFullscreen}>
          <figure className="euiImageFullscreen" onClick={this.toggleImageFullscreen}>
            <img src={url} className="euiImageFullscreen__img" />
            {optionalCaption}
          </figure>
        </EuiOverlayMask>
      );
    }

    return (
      <div>
        <figure
          className={classes}
          onClick={this.toggleImageFullscreen}
          {...rest}
        >
          <img src={url} className="euiImage__img" />
          {optionalCaption}
        </figure>
        {fullScreenDisplay}
      </div>
    );
  }
}
