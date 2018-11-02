import { EuiTableRowCell, ALIGNMENT } from '@elastic/eui/lib/components/table/table_row_cell.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size';

// Define type of property
interface Props {
  align: ALIGNMENT;
  childText: string;
  truncateText: boolean;
  width: number;
  height: number;
  textOnly: boolean;
}

export class Cell extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    childText: 'Cell text',
    width: 150,
    height: 40,
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
    },
    align: {
      type: ControlType.SegmentedEnum,
      options: ALIGNMENT,
      title: 'align',
    },
    truncateText: {
      type: ControlType.Boolean,
      title: 'truncateText',
    },
    textOnly: {
      type: ControlType.Boolean,
      title: 'textOnly',
    },
  };

  public render() {
    let childrenOrText;
    if (this.props.children) {
      childrenOrText = this.props.children;
    } else {
      childrenOrText = this.props.childText;
    }
    return (
      <FrameSize>
        <EuiTableRowCell
          align={this.props.align}
          truncateText={this.props.truncateText}
          textOnly={this.props.textOnly}
          style={{ width: this.props.width, display: 'flex' }}
        >
          <div style={{ width: this.props.width }}>{this.props.childText}</span>
        </EuiTableRowCell>
      </FrameSize>
    );
  }
}
