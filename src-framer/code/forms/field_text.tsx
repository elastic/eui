// @ts-ignore
import { EuiFieldText } from '@elastic/eui/lib/components/form/field_text/field_text.js';
// @ts-ignore
import { EuiFormRow } from '@elastic/eui/lib/components/form/form_row/form_row.js';
// @ts-ignore
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  placeholder: string;
  value: string;
  isInvalid: boolean;
  fullWidth: boolean;
  isLoading: boolean;
  hasFormRow: boolean;
  compressed: boolean;
  formRowLabel: string;
  formRowHelpText: string;
  icon: ICON_TYPES;
}

export class FieldText extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    hasFormRow: false,
    fullWidth: true,
    formRowLabel: 'Label name',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    placeholder: { type: ControlType.String, title: 'placeholder' },
    value: { type: ControlType.String, title: 'value' },
    isInvalid: { type: ControlType.Boolean, title: 'isInvalid' },
    isLoading: { type: ControlType.Boolean, title: 'isLoading' },
    fullWidth: { type: ControlType.Boolean, title: 'fullWidth' },
    compressed: { type: ControlType.Boolean, title: 'compressed' },
    hasFormRow: { type: ControlType.Boolean, title: '🧙 Form Row?' },
    formRowLabel: {
      type: ControlType.String,
      title: '↳ label',
      hidden(props: Props) {
        return props.hasFormRow === false;
      },
    },
    formRowHelpText: {
      type: ControlType.String,
      title: '↳ helpText',
      hidden(props: Props) {
        return props.hasFormRow === false;
      },
    },
    icon: {
      type: ControlType.Enum,
      options: ICON_TYPES,
      title: '↳ icon',
    },
  };

  render() {
    const fieldText = (
      <EuiFieldText
        placeholder={this.props.placeholder}
        value={this.props.value}
        isInvalid={this.props.isInvalid}
        isLoading={this.props.isLoading}
        fullWidth={this.props.fullWidth}
        icon={this.props.icon}
        compressed={this.props.compressed}
      />
    );
    let fieldWithOptionalRow = fieldText;

    if (this.props.hasFormRow) {
      fieldWithOptionalRow = (
        <EuiFormRow
          label={this.props.formRowLabel}
          helpText={this.props.formRowHelpText}>
          {fieldText}
        </EuiFormRow>
      );
    }

    return <div>{fieldWithOptionalRow}</div>;
  }
}
