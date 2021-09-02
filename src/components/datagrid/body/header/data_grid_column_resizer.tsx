/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import {
  EuiDataGridColumnResizerProps,
  EuiDataGridColumnResizerState,
} from '../../data_grid_types';

const MINIMUM_COLUMN_WIDTH = 40;

export class EuiDataGridColumnResizer extends Component<
  EuiDataGridColumnResizerProps,
  EuiDataGridColumnResizerState
> {
  state = {
    initialX: 0,
    offset: 0,
  };

  onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      initialX: e.pageX,
    });

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('blur', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);

    // don't let this action steal focus
    e.preventDefault();
  };

  onMouseUp = () => {
    const { offset } = this.state;
    const { columnId, columnWidth, setColumnWidth } = this.props;
    setColumnWidth(
      columnId,
      Math.max(MINIMUM_COLUMN_WIDTH, columnWidth + offset)
    );

    this.setState({ offset: 0 });

    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('blur', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseMove = (e: { pageX: number }) => {
    const { columnWidth } = this.props;
    this.setState(({ initialX }) => ({
      offset: Math.max(
        e.pageX - initialX,
        -(columnWidth - MINIMUM_COLUMN_WIDTH)
      ),
    }));
  };

  render() {
    const { offset } = this.state;

    return (
      <div
        className="euiDataGridColumnResizer"
        data-test-subj="dataGridColumnResizer"
        style={{ marginRight: `${-offset}px` }}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}
