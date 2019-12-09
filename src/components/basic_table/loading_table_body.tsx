import React, { Component } from 'react';
import { EuiTableBody } from '../table';

export class LoadingTableBody extends Component<{}> {
  private cleanups: Array<() => void>;
  private tbody: HTMLTableSectionElement | null;

  constructor(props: {}) {
    super(props);
    this.cleanups = [];
    this.tbody = null;
  }

  componentDidMount() {
    const listener = (event: Event) => {
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
      this.tbody!.addEventListener(event, listener, true);
      this.cleanups.push(() =>
        this.tbody!.removeEventListener(event, listener)
      );
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
