/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Component, ReactNode } from 'react';

function isComponentBecomingVisible(
  prevHide: boolean = false,
  nextHide: boolean = false
) {
  return prevHide === true && nextHide === false;
}

export interface EuiDelayHideProps {
  hide: boolean;
  minimumDuration: number;
  render: () => ReactNode;
}

interface EuiDelayHideState {
  hide: boolean;
  countdownExpired?: boolean;
}

export class EuiDelayHide extends Component<
  EuiDelayHideProps,
  EuiDelayHideState
> {
  static defaultProps = {
    hide: false,
    minimumDuration: 1000,
  };

  static getDerivedStateFromProps(
    nextProps: EuiDelayHideProps,
    prevState: EuiDelayHideState
  ) {
    const isBecomingVisible = isComponentBecomingVisible(
      prevState.hide,
      nextProps.hide
    );
    return {
      hide: nextProps.hide,
      countdownExpired: isBecomingVisible ? false : prevState.countdownExpired,
    };
  }

  state = {
    hide: this.props.hide,
    countdownExpired: this.props.hide,
  };

  private timeoutId?: number;

  componentDidMount() {
    // if the component begins visible start counting
    if (this.props.hide === false) {
      this.startCountdown();
    }
  }

  componentDidUpdate(prevProps: EuiDelayHideProps) {
    const isBecomingVisible = isComponentBecomingVisible(
      prevProps.hide,
      this.props.hide
    );
    if (isBecomingVisible) {
      this.startCountdown();
    }
  }

  componentWillUnmount() {
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
    }
  }

  startCountdown = () => {
    // only start the countdown if there is not one in progress
    if (this.timeoutId == null) {
      this.timeoutId = setTimeout(
        this.finishCountdown,
        // even though `minimumDuration` cannot be undefined, passing a strict number type to setTimeout makes TS interpret
        // it as a NodeJS.Timer instead of a number. The DOM lib defines the setTimeout call as taking `number | undefined`
        // so we cast minimumDuration to this type instead to force TS's cooperation
        this.props.minimumDuration as number | undefined
      );
    }
  };

  finishCountdown = () => {
    this.timeoutId = undefined;
    this.setState({ countdownExpired: true });
  };

  render() {
    const shouldHideContent =
      this.props.hide === true && this.state.countdownExpired;
    return shouldHideContent ? null : this.props.render();
  }
}
