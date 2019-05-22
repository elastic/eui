// @ts-ignore
import { EuiFieldSearch } from '@elastic/eui/lib/components/form/field_search/field_search.js';
// @ts-ignore
import { EuiFormRow } from '@elastic/eui/lib/components/form/form_row/form_row.js';
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
  formRowLabel: string;
  formRowHelpText: string;
  compressed: boolean;
}

export class FieldSearch extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    hasFormRow: false,
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
    hasFormRow: { type: ControlType.Boolean, title: '🖍 Form Row?' },
    formRowLabel: {
      type: ControlType.String,
      title: 'label',
      hidden(props: Props) {
        return props.hasFormRow === false;
      },
    },
    formRowHelpText: {
      type: ControlType.String,
      title: 'helpText',
      hidden(props: Props) {
        return props.hasFormRow === false;
      },
    },
  };

  render() {
    const fieldSearch = (
      <EuiFieldSearch
        placeholder={this.props.placeholder}
        value={this.props.value}
        isInvalid={this.props.isInvalid}
        isLoading={this.props.isLoading}
        fullWidth={this.props.fullWidth}
        compressed={this.props.compressed}
      />
    );
    let fieldWithOptionalRow = fieldSearch;

    if (this.props.hasFormRow) {
      fieldWithOptionalRow = (
        <EuiFormRow
          label={this.props.formRowLabel}
          helpText={this.props.formRowHelpText}>
          {fieldSearch}
        </EuiFormRow>
      );
    }

    return <div>{fieldWithOptionalRow}</div>;
  }
}
