import React, { Component } from 'react';

import 'brace/theme/github';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';

import {
  EuiCodeEditor,
  EuiTitle,
  EuiSpacer,
  EuiHorizontalRule,
  EuiButton,
  EuiCallOut,
  EuiFlexItem,
  EuiFlexGrid,
  EuiCard,
  EuiPanel,
  EuiText,
  EuiCodeBlock,
} from '../../../../src/components';

const template = `PUT _template/logs-apache
{
  "index_patterns": [
    "logs-apache-*”
  ],
  "settings": {
    "index.nulmber_of_shards": 5,
    "index.number_of_replicas": 1,
    "index.routing.allocation.include.box_type": "hot",
    "index.lifecycle.name": "logs-apache"
  },
  "aliases": {
    "logs-apache-read": { “type”: “read_rollover” },
    "logs-apache-write": { “type”: “write_rollover” },
  },
  "mappings": {
    ...
  }
}
`;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: template
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const {
      onSelection,
      ...rest
    } = this.props;

    return (
      <div className="euiAnimateContentLoad">
        <EuiTitle>
          <h4>Changes that will occur</h4>
        </EuiTitle>
        <EuiSpacer />
        <EuiFlexGrid columns="3">
          <EuiFlexItem>
            <EuiPanel>
              <EuiTitle size="l" style={{ textAlign: 'center' }}>
                <p>4</p>
              </EuiTitle>
              <EuiText size="s">
                <p><strong>Index templates</strong> affected by this change:</p>
                <ul>
                  <li>Log americas</li>
                  <li>Log APAC</li>
                  <li>Log Europe</li>
                  <li>Log Africa</li>
                </ul>
              </EuiText>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <EuiTitle size="l" style={{ textAlign: 'center' }}>
                <p>1,856</p>
              </EuiTitle>
              <EuiText size="s">
                <p><strong>Indices</strong> affected by this change:</p>
                <ul>
                  <li>log_west_001</li>
                  <li>log_west_002</li>
                  <li>log_west_001</li>
                  <li>log_west_002</li>
                  <li>+ 1,852 more</li>
                </ul>
              </EuiText>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <EuiTitle size="l" style={{ textAlign: 'center' }}>
                <p>New aliases</p>
              </EuiTitle>
              <EuiText size="s">
                <p>Point to these new aliases going forward:</p>
                <ul>
                  <li><strong>READ</strong>: logstash_template_read</li>
                  <li><strong>WRITE</strong>: logstash_template_write</li>
                </ul>
              </EuiText>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGrid>
        <EuiHorizontalRule className="ilmHrule" />
        <EuiTitle>
          <h4>Verify your template looks OK</h4>
        </EuiTitle>
        <EuiSpacer size="m" />
        <EuiCodeBlock
          language="json"
        >
          {this.state.value}
        </EuiCodeBlock>

        <EuiHorizontalRule className="ilmHrule" />

        <EuiButton fill color="secondary" iconType="check" onClick={onSelection}>
          Looks good, make these changes
        </EuiButton>
      </div>
    );
  }
}
