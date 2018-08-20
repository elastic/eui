import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Adds and removes window events for you (renders null)
 * Usage:
 * <WindowEvent event='keydown' handler={this.handleKeyDown} />
 */
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
   * Type of event
   */
  event: PropTypes.string.isRequired,
  /**
    * Event callback function
    */
  handler: PropTypes.func.isRequired
};
