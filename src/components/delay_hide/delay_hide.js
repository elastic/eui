import { Component } from 'react';
import PropTypes from 'prop-types';

export class EuiDelayHide extends Component {
  static propTypes = {
    hide: PropTypes.bool,
    minimumDuration: PropTypes.number,
    render: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hide: this.props.hide
    };

    this.lastRenderedTime = this.props.hide ? 0 : Date.now();
    this.shouldRender = false;
  }

  componentWillReceiveProps({ hide, minimumDuration = 1000 }) {
    clearTimeout(this.timeout);

    const visibleDuration = Date.now() - this.lastRenderedTime;
    const timeRemaining = minimumDuration - visibleDuration;
    if (hide && timeRemaining > 0) {
      this.shouldRender = false;
      this.setStateDelayed(timeRemaining);
    } else {
      this.shouldRender = true;
      this.lastRenderedTime = Date.now();
      this.setState({ hide });
    }
  }

  setStateDelayed = timeRemaining => {
    this.timeout = setTimeout(() => {
      this.shouldRender = true;
      this.setState({ hide: true });
    }, timeRemaining);
  };

  shouldComponentUpdate() {
    return this.shouldRender;
  }

  render() {
    if (this.state.hide) {
      return null;
    }

    return this.props.render();
  }
}
