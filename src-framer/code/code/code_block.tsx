import {
  FONT_SIZES,
  PADDING_SIZES,
  // @ts-ignore
} from '@elastic/eui/lib/components/code/_code_block.js';
// @ts-ignore
import { EuiCodeBlock } from '@elastic/eui/lib/components/code/code_block.js';
import { ControlType, PropertyControls } from 'framer';
import React from 'react';

// Define type of property
interface Props {
  fontSize: FONT_SIZES;
  language: string;
  overflowHeight: number;
  paddingSize: PADDING_SIZES;
  transparentBackground: boolean;
  childText: string;
}

export class CodeBlock extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    name: 'Han Solo',
    height: 300, // To give a decent start with sizing
    width: 600, // To give a decent start with sizing
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    fontSize: {
      type: ControlType.SegmentedEnum,
      options: FONT_SIZES,
      title: 'fontSize',
    },
    language: {
      type: ControlType.String,
      title: 'language',
    },
    overflowHeight: {
      type: ControlType.Number,
      title: 'overflowHeight',
    },
    paddingSize: {
      type: ControlType.SegmentedEnum,
      options: PADDING_SIZES,
      title: 'paddingSize',
    },
    transparentBackground: {
      type: ControlType.Boolean,
      title: 'transparentBackground',
    },
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
    },
  };

  render() {
    return (
      <EuiCodeBlock
        fontSize={this.props.fontSize}
        language={this.props.language}
        overflowHeight={this.props.overflowHeight}
        paddingSize={this.props.paddingSize}
        transparentBackground={this.props.transparentBackground}>
        {this.props.childText}
      </EuiCodeBlock>
    );
  }
}
