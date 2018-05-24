import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();
    const idPrefix2 = makeId();
    const idPrefix3 = makeId();

    this.toggleButtons = [{
      id: `${idPrefix}0`,
      label: 'Option one',
    }, {
      id: `${idPrefix}1`,
      label: 'Option two is selected by default',
    }, {
      id: `${idPrefix}2`,
      label: 'Option three',
    }];

    this.toggleButtonsMulti = [{
      id: `${idPrefix2}0`,
      label: 'Option 1',
    }, {
      id: `${idPrefix2}1`,
      label: 'Option 2 is selected by default',
    }, {
      id: `${idPrefix2}2`,
      label: 'Option 3',
    }];

    this.toggleButtonsIcons = [{
      id: `${idPrefix3}0`,
      label: 'Align left',
      iconType: 'editorAlignLeft',
    }, {
      id: `${idPrefix3}1`,
      label: 'Align center',
      iconType: 'editorAlignCenter',
    }, {
      id: `${idPrefix3}2`,
      label: 'Align right',
      iconType: 'editorAlignRight',
    }];

    this.toggleButtonsIconsMulti = [{
      id: `${idPrefix3}3`,
      label: 'Bold',
      iconType: 'editorBold',
    }, {
      id: `${idPrefix3}4`,
      label: 'Italic',
      iconType: 'editorItalic',
    }, {
      id: `${idPrefix3}5`,
      label: 'Underline',
      iconType: 'editorUnderline',
    }, {
      id: `${idPrefix3}6`,
      label: 'Strikethrough',
      iconType: 'editorStrike',
    }];

    this.state = {
      toggleIdSelected: `${idPrefix}1`,
      toggleIdToSelectedMap: {
        [`${idPrefix2}1`]: true,
      },
      toggleIconIdSelected: `${idPrefix3}1`,
      toggleIconIdToSelectedMap: {},
    };
  }

  onChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });
  };

  onChangeMulti = optionId => {
    const newToggleIdToSelectedMap = ({ ...this.state.toggleIdToSelectedMap, ...{
      [optionId]: !this.state.toggleIdToSelectedMap[optionId],
    } });

    this.setState({
      toggleIdToSelectedMap: newToggleIdToSelectedMap,
    });
  };

  onChangeIcons = optionId => {
    this.setState({
      toggleIconIdSelected: optionId,
    });
  };

  onChangeIconsMulti = optionId => {
    const newToggleIconIdToSelectedMap = ({ ...this.state.toggleIconIdToSelectedMap, ...{
      [optionId]: !this.state.toggleIconIdToSelectedMap[optionId],
    } });

    this.setState({
      toggleIconIdToSelectedMap: newToggleIconIdToSelectedMap,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiButtonGroup
          name="Basic"
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs"><h3>Primary &amp; multi select</h3></EuiTitle>

        <EuiSpacer size="s" />

        <EuiButtonGroup
          name="Primary"
          options={this.toggleButtonsMulti}
          idToSelectedMap={this.state.toggleIdToSelectedMap}
          onChange={this.onChangeMulti}
          color="primary"
          type="multi"
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs"><h3>Disabled &amp; full width</h3></EuiTitle>

        <EuiSpacer size="s" />

        <EuiButtonGroup
          name="Disabled"
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
          isDisabled
          isFullWidth
        />

        <EuiSpacer size="m" />

        <EuiTitle size="xxs"><h3>Icons only</h3></EuiTitle>

        <EuiSpacer size="s" />

        <EuiButtonGroup
          name="Text align"
          className="eui-displayInlineBlock"
          options={this.toggleButtonsIcons}
          idSelected={this.state.toggleIconIdSelected}
          onChange={this.onChangeIcons}
          isIconOnly
        />

        &nbsp;&nbsp;

        <EuiButtonGroup
          name="Text style"
          className="eui-displayInlineBlock"
          options={this.toggleButtonsIconsMulti}
          idToSelectedMap={this.state.toggleIconIdToSelectedMap}
          onChange={this.onChangeIconsMulti}
          type="multi"
          isIconOnly
        />
      </Fragment>
    );
  }
}
