/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';

const MINIMUM_COLUMN_WIDTH = 40;

export interface EuiDataGridColumnResizerProps {
  columnId: string;
  columnWidth: number;
  setColumnWidth: (columnId: string, width: number) => void;
}

interface EuiDataGridColumnResizerState {
  initialX: number;
  offset: number;
}

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
