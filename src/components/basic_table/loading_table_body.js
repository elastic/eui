import React, { Component } from 'react';
import { EuiTableBody } from '../table/table_body';

export class LoadingTableBody extends Component {
  constructor(props) {
    super(props);
    this.cleanups = [];
  }

  componentDidMount() {
    const listener = event => {
      event.stopPropagation();
      event.preventDefault();
    };
    [
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
      'click',
      'dblclick',
      'keydown',
      'keyup',
      'keypress',
    ].forEach(event => {
      this.tbody.addEventListener(event, listener, true);
      this.cleanups.push(() => this.tbody.removeEventListener(event, listener));
    });
  }

  componentWillUnmount() {
    this.cleanups.forEach(cleanup => cleanup());
  }

  render() {
    return (
      <EuiTableBody
        bodyRef={tbody => {
          this.tbody = tbody;
        }}>
        {this.props.children}
      </EuiTableBody>
    );
  }
}
