import { Component } from 'react';
import PropTypes from 'prop-types';

export class EuiDelayHide extends Component {
  static propTypes = {
    hide: PropTypes.bool,
    minimumDuration: PropTypes.number,
    render: PropTypes.func.isRequired
  };

  static defaultProps = {
    hide: false,
    minimumDuration: 1000
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // if the component should be visible (nextProps.hide === false)
    // but we're currently suppresing it, update state.countdownExpired
    if (nextProps.hide === false && prevState.countdownExpired === true) {
      return {
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
    };
  }

  componentDidMount() {
    // if the component begins visible start counting
    if (this.props.hide === false) {
      this.startCountdown();
    }
  }

  componentDidUpdate(prevProps) {
    const isComponentBecomingVisible = prevProps.hide === true && this.props.hide === false;
    if (isComponentBecomingVisible) {
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
  }

  finishCountdown = () => {
    this.timeoutId = null;
    this.setState({ countdownExpired: true });
  }

  render() {
    const shouldHideContent = this.props.hide === true && this.state.countdownExpired;
    return shouldHideContent ? null : this.props.render();
  }
}
