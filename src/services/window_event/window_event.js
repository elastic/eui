import { Component } from 'react';
import PropTypes from 'prop-types';

export default class WindowEvent extends Component {

  componentDidMount() {
    this.addEvent(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.event !== this.props.event || prevProps.handler !== this.props.handler) {
      this.removeEvent(prevProps);
      this.addEvent(this.props);
    }
  }

  componentWillUnmount() {
    this.removeEvent(this.props);
  }

  addEvent({ event, handler }) {
    window.addEventListener(event, handler);
  }

  removeEvent({ event, handler }) {
    window.removeEventListener(event, handler);
  }

  render() {
    return null;
  }

}

WindowEvent.displayName = 'WindowEvent';

WindowEvent.propTypes = {
  /**
   * Type of valid DOM event
   */
  event: PropTypes.string.isRequired,
  /**
    * Event callback function
    */
  handler: PropTypes.func.isRequired
};
