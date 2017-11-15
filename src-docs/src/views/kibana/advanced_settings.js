import React, {
  Component,
} from 'react';

import {
  EuiBottomBar,
  EuiButtonEmpty,
  EuiCallOut,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiTitle,
} from '../../../../src/components';

import {
  KibanaChrome,
  ManagementSideNav,
} from '../partials';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBar: false,
    };
  }

  handleFormChange() {
    this.setState({
      showBar: !this.state.showBar,
    });
  }

  renderForm() {
    return (
      <EuiForm>
        <EuiFormRow
          id="blargh1"
          label="query:queryString:options"
          helpText={
            <div>
              <span>Options for the lucene query string parser. </span>
              <EuiLink href="">
                Reset
              </EuiLink>
            </div>
          }
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="analyze_wildcard: true" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh2"
          label="sort:options"
          helpText="Options for the Elasticsearch sort parameter"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="unmapped_type: boolean" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="dateFormat"
          helpText="When displaying a pretty formatted date, use this format"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="MMMM Do YYYY, HH:mm:ss.SSS" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="dateFormat:tz"
          helpText="Which timezone should be used. 'Browser' will use the timezone detected by your browser."
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="Browser" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="dateFormat:dow"
          helpText="What day should weeks start on?"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="Sunday" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="defaultIndex (Default: null) "
          helpText="The index to access if no index is set"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="null" />
        </EuiFormRow>
      </EuiForm>
    );
  }

  renderPage() {
    return (
      <EuiPage>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Management</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>

        <EuiPageBody>
          <EuiPageSideBar>
            <ManagementSideNav />
          </EuiPageSideBar>

          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Advanced settings &raquo; General</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>

            <EuiPageContentBody>
              <EuiCallOut
                title="Proceed with caution!"
                type="warning"
              >
                <p>
                  Tweaks you make here can break Kibana if you do not know what you are doing.
                </p>
              </EuiCallOut>

              <EuiSpacer size="l" />

              {this.renderForm()}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }


  render() {
    let bottomBar;
    if (this.state.showBar) {
      bottomBar = (
        <EuiBottomBar>
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>
                <p>
                  <EuiTextColor color="ghost">
                    You have unsaved changes in your form.
                  </EuiTextColor>
                </p>
              </EuiText>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiFlexGroup justifyContent="flexEnd" gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty color="ghost" size="s" iconType="check">Save</EuiButtonEmpty>
                </EuiFlexItem>

                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty color="ghost" size="s" iconType="cross">Discard</EuiButtonEmpty>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      );
    }

    return (
      <KibanaChrome>
        {this.renderPage()}
        {bottomBar}
      </KibanaChrome>
    );
  }
}
