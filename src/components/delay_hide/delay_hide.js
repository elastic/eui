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

  constructor(props) {
    super(props);

    this.state = {
      hide: this.props.hide
    };

    this.lastRenderedTime = this.props.hide ? 0 : Date.now();
  }

  getTimeRemaining(minimumDuration) {
    const visibleDuration = Date.now() - this.lastRenderedTime;
    return minimumDuration - visibleDuration;
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeout);
    const timeRemaining = this.getTimeRemaining(nextProps.minimumDuration);

    if (nextProps.hide && timeRemaining > 0) {
      this.setStateDelayed(timeRemaining);
    } else {
      if (this.state.hide && !nextProps.hide) {
        this.lastRenderedTime = Date.now();
      }

      this.setState({ hide: nextProps.hide });
    }
  }

  setStateDelayed = timeRemaining => {
    this.timeout = setTimeout(() => {
      this.setState({ hide: true });
    }, timeRemaining);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (this.state.hide) {
      return null;
    }

    return this.props.render();
  }
}
