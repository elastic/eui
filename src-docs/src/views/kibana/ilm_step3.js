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
          <h4>Review and save</h4>
        </EuiTitle>
        <EuiSpacer />
        <EuiFlexGrid columns="3">
          <EuiFlexItem>
            <EuiCard
              title="2"
              description="Index templates will be effected by this change"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              title="2"
              description="Index templates will be effected by this change"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              title="2"
              description="Index templates will be effected by this change"
            />
          </EuiFlexItem>
        </EuiFlexGrid>
        <EuiSpacer />
        <EuiCallOut
          size="s"
          title="Changing the values in your template may invalidate decisions made in previous steps"
          color="warning"
        />
        <EuiSpacer size="m" />
        <EuiCodeEditor
          mode="json"
          theme="github"
          width="100%"
          value={this.state.value}
          onChange={this.onChange}
          setOptions={{
            fontSize: '12px',
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
          }}
          onBlur={() => { console.log('blur'); }}
        />

        <EuiHorizontalRule className="ilmHrule" />

        <EuiButton fill color="secondary" iconType="check" onClick={onSelection}>
          Save and finish
        </EuiButton>
      </div>
    );
  }
}
