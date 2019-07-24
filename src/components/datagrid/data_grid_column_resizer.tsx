import React, { Component, MouseEventHandler } from 'react';

const MINIMUM_COLUMN_WIDTH = 40;

interface EuiDataGridColumnResizerProps {
  columnName: string;
  columnWidth: number;
  setColumnWidth: (columnName: string, width: number) => void;
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

  onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
    this.setState({
      initialX: e.pageX,
    });

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('blur', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
  };

  onMouseUp = () => {
    const { offset } = this.state;
    const { columnName, columnWidth, setColumnWidth } = this.props;
    setColumnWidth(
      columnName,
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
        style={{ marginRight: `${-offset}px` }}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}
