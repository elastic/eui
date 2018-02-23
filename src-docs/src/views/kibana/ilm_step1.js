import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCard,
  EuiTitle,
  EuiSpacer,
  EuiSelect,
  EuiFormRow,
  EuiFieldNumber,
  EuiHorizontalRule,
  EuiButton,
  EuiLink,
} from '../../../../src/components';

export class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTemplate: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({
      selectedTemplate: true,
    });
  }

  renderConfiguration() {
    if (this.state.selectedTemplate) {
      return (
        <div>
          <EuiHorizontalRule className="ilmHrule" />
          <EuiTitle>
            <h4>Configure options</h4>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiFormRow label="Where do you want your hot indices to live">
            <EuiSelect
              options={[
                { value: 'logstash_template', text: 'box_type:hot' },
                { value: 'option_two', text: 'box_type:warm' },
                { value: 'option_three', text: 'box_type:super_hot' },
              ]}
            />
          </EuiFormRow>
          <EuiTitle size="s">
            <p>How many nodes to you want to use for indexing?</p>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiFlexGroup>
            <EuiFlexItem style={{ maxWidth: 188 }}>
              <EuiFormRow label="Minimum">
                <EuiFieldNumber value={1} />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem style={{ maxWidth: 188 }}>
              <EuiFormRow label="Maximum">
                <EuiFieldNumber value={5} />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiTitle size="s">
            <p>How many replicas would you like to have?</p>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiFlexGroup>
            <EuiFlexItem style={{ maxWidth: 188 }}>
              <EuiFormRow label="Minimum">
                <EuiFieldNumber value={1} />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem style={{ maxWidth: 188 }}>
              <EuiFormRow label="Maximum">
                <EuiFieldNumber value={5} />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiHorizontalRule className="ilmHrule" />

          <EuiButton fill iconSide="right" iconType="sortRight" onClick={this.props.onSelection}>
            Save and continue
          </EuiButton>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    const {
      onSelection,
      ...rest
    } = this.props;


    return (
      <div className="euiAnimateContentLoad">
        <EuiTitle>
          <h4>Select a template</h4>
        </EuiTitle>
        <EuiSpacer/>
        <EuiFormRow
          label="Select a template"
          helpText={
            <span>
              Learn how
              to <EuiLink href="https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-templates.html">add a new
              index template</EuiLink>.
            </span>
          }
        >
          <EuiSelect
            onChange={this.onChange}
            options={[
              { value: 'blargh', text: '' },
              { value: 'logstash_template', text: 'Logstash template' },
              { value: 'option_two', text: 'Filebeat template' },
              { value: 'option_three', text: 'Metricbeat template' },
              { value: 'blargh', text: 'My other template' },
            ]}
          />
        </EuiFormRow>

        {this.renderConfiguration()}
      </div>
    );
  }
}
