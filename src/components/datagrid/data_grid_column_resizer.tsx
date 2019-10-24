import React, { Component } from 'react';

const MINIMUM_COLUMN_WIDTH = 40;

interface EuiDataGridColumnResizerProps {
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

  onMouseDown = (e: { pageX: number }) => {
    this.setState({
      initialX: e.pageX,
    });

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('blur', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
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
