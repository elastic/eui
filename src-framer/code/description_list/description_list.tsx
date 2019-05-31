import {
  EuiDescriptionList,
  TYPES,
  ALIGNMENTS,
  TEXT_STYLES,
  // @ts-ignore
} from '@elastic/eui/lib/components/description_list/description_list.js';
// @ts-ignore
import { EuiDescriptionListTitle } from '@elastic/eui/lib/components/description_list/description_list_title.js';
// @ts-ignore
import { EuiDescriptionListDescription } from '@elastic/eui/lib/components/description_list/description_list_description.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  align: ALIGNMENTS;
  compressed: boolean;
  textStyle: TEXT_STYLES;
  type: TYPES;
  titleText: string;
  descText: string;
  height: number;
}

export class DescriptionList extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    align: 'left',
    compressed: false,
    textStyle: 'normal',
    type: 'row',
    // Framer only props for ease of use below
    titleText: 'Title',
    descText: 'Description',
    height: 40,
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    titleText: {
      type: ControlType.String,
      title: '🧙 titleText',
    },
    descText: {
      type: ControlType.String,
      title: '🧙 descText',
    },
    compressed: {
      type: ControlType.Boolean,
      title: 'compressed',
    },
    align: {
      type: ControlType.SegmentedEnum,
      options: ALIGNMENTS,
      align: 'size',
    },
    textStyle: {
      type: ControlType.SegmentedEnum,
      options: TEXT_STYLES,
      align: 'textStyle',
    },
    type: {
      type: ControlType.SegmentedEnum,
      options: TYPES,
      title: 'type',
    },
  };

  render() {
    return (
      <EuiDescriptionList
        titleText={this.props.titleText}
        descText={this.props.descText}
        compressed={this.props.compressed}
        align={this.props.align}
        textStyle={this.props.textStyle}
        type={this.props.type}>
        <EuiDescriptionListTitle>
          {this.props.titleText}
        </EuiDescriptionListTitle>
        <EuiDescriptionListDescription>
          {this.props.descText}
        </EuiDescriptionListDescription>
      </EuiDescriptionList>
    );
  }
}
