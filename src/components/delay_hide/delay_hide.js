import { Component } from 'react';
import PropTypes from 'prop-types';

function isComponentBecomingVisible(prevHide, nextHide) {
  return prevHide === true && nextHide === false;
}

export class EuiDelayHide extends Component {
  static propTypes = {
    hide: PropTypes.bool,
    minimumDuration: PropTypes.number,
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    hide: false,
    minimumDuration: 1000,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // if the component should be visible (nextProps.hide === false)
    // but we're currently suppresing it, update state.countdownExpired
    const isBecomingVisible = isComponentBecomingVisible(prevState.prevHide, nextProps.hide);
    if (isBecomingVisible && prevState.countdownExpired === true) {
      return {
        prevHide: false,
        countdownExpired: false,
      };
    }

    return null;
  }

  constructor(...args) {
    super(...args);

    this.timeoutId = null; // track timeout so it can be referenced / cleared

    this.state = {
      // start countdownExpired based on the hide prop
      countdownExpired: this.props.hide,
      prevHide: this.props.hide,
    };
  }

  componentDidMount() {
    // if the component begins visible start counting
    if (this.props.hide === false) {
      this.startCountdown();
    }
  }

  componentDidUpdate(prevProps) {
    const isBecomingVisible = isComponentBecomingVisible(prevProps.hide, this.props.hide);
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
      this.timeoutId = setTimeout(this.finishCountdown, this.props.minimumDuration);
    }
  };

  finishCountdown = () => {
    this.timeoutId = null;
    this.setState({ countdownExpired: true });
  };

  render() {
    const shouldHideContent = this.props.hide === true && this.state.countdownExpired;
    return shouldHideContent ? null : this.props.render();
  }
}
