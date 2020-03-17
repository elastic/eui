import React, { Component, Fragment } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';
import { EuiPanel } from '../../../../src/components/panel/panel';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();
    const idPrefix2 = makeId();
    const idPrefix3 = makeId();

    this.toggleButtons = [
      {
        id: `${idPrefix}0`,
        label: 'Option one',
      },
      {
        id: `${idPrefix}1`,
        label: 'Option two is selected by default',
      },
      {
        id: `${idPrefix}2`,
        label: 'Option three',
      },
    ];

    this.toggleButtonsMulti = [
      {
        id: `${idPrefix2}0`,
        label: 'Option 1',
      },
      {
        id: `${idPrefix2}1`,
        label: 'Option 2 is selected by default',
      },
      {
        id: `${idPrefix2}2`,
        label: 'Option 3',
      },
    ];

    this.toggleButtonsCompressed = [
      {
        id: `${idPrefix2}3`,
        label: 'fine',
      },
      {
        id: `${idPrefix2}4`,
        label: 'rough',
      },
      {
        id: `${idPrefix2}5`,
        label: 'coarse',
      },
    ];

    this.toggleButtonsIcons = [
      {
        id: `${idPrefix3}0`,
        label: 'Align left',
        iconType: 'editorAlignLeft',
      },
      {
        id: `${idPrefix3}1`,
        label: 'Align center',
        iconType: 'editorAlignCenter',
      },
      {
        id: `${idPrefix3}2`,
        label: 'Align right',
        iconType: 'editorAlignRight',
      },
    ];

    this.toggleButtonsIconsMulti = [
      {
        id: `${idPrefix3}3`,
        label: 'Bold',
        name: 'bold',
        iconType: 'editorBold',
      },
      {
        id: `${idPrefix3}4`,
        label: 'Italic',
        name: 'italic',
        iconType: 'editorItalic',
      },
      {
        id: `${idPrefix3}5`,
        label: 'Underline',
        name: 'underline',
        iconType: 'editorUnderline',
      },
      {
        id: `${idPrefix3}6`,
        label: 'Strikethrough',
        name: 'strikethrough',
        iconType: 'editorStrike',
      },
    ];

    this.state = {
      toggleIdSelected: `${idPrefix}1`,
      toggleIdToSelectedMap: {
        [`${idPrefix2}1`]: true,
      },
      toggleIconIdSelected: `${idPrefix3}1`,
      toggleIconIdToSelectedMap: {},
      toggleCompressedIdSelected: `${idPrefix2}4`,
    };
  }

  onChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });
  };

  onChangeMulti = optionId => {
    const newToggleIdToSelectedMap = {
      ...this.state.toggleIdToSelectedMap,
      ...{
        [optionId]: !this.state.toggleIdToSelectedMap[optionId],
      },
    };

    this.setState({
      toggleIdToSelectedMap: newToggleIdToSelectedMap,
    });
  };

  onChangeIcons = optionId => {
    this.setState({
      toggleIconIdSelected: optionId,
    });
  };

  onChangeCompressed = optionId => {
    this.setState({
      toggleCompressedIdSelected: optionId,
    });
  };

  onChangeIconsMulti = optionId => {
    const newToggleIconIdToSelectedMap = {
      ...this.state.toggleIconIdToSelectedMap,
      ...{
        [optionId]: !this.state.toggleIconIdToSelectedMap[optionId],
      },
    };

    this.setState({
      toggleIconIdToSelectedMap: newToggleIconIdToSelectedMap,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiButtonGroup
          legend="This is a basic group"
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
        />
        <EuiSpacer size="m" />
        <EuiTitle size="xxs">
          <h3>Primary &amp; multi select</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          legend="This is a primary group"
          name="primary"
          options={this.toggleButtonsMulti}
          idToSelectedMap={this.state.toggleIdToSelectedMap}
          onChange={this.onChangeMulti}
          color="primary"
          type="multi"
        />
        <EuiSpacer size="m" />
        <EuiTitle size="xxs">
          <h3>Disabled &amp; full width</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          legend="This is a disabled group"
          name="disabledGroup"
          options={this.toggleButtons}
          idSelected={this.state.toggleIdSelected}
          onChange={this.onChange}
          buttonSize="m"
          isDisabled
          isFullWidth
        />
        <EuiSpacer size="m" />
        <EuiTitle size="xxs">
          <h3>Icons only</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          legend="Text align"
          name="textAlign"
          options={this.toggleButtonsIcons}
          idSelected={this.state.toggleIconIdSelected}
          onChange={this.onChangeIcons}
          isIconOnly
        />
        &nbsp;&nbsp;
        <EuiButtonGroup
          legend="Text style"
          options={this.toggleButtonsIconsMulti}
          idToSelectedMap={this.state.toggleIconIdToSelectedMap}
          onChange={this.onChangeIconsMulti}
          type="multi"
          isIconOnly
        />
        <EuiSpacer />
        <EuiPanel style={{ maxWidth: 300 }}>
          <EuiTitle size="xxxs">
            <h3>
              Compressed groups should always be fullWidth so they line up
              nicely in their small container.
            </h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiButtonGroup
            name="coarsness"
            legend="This is a basic group"
            options={this.toggleButtonsCompressed}
            idSelected={this.state.toggleCompressedIdSelected}
            onChange={this.onChangeCompressed}
            buttonSize="compressed"
            isFullWidth
          />
          <EuiSpacer />
          <EuiTitle size="xxxs">
            <h3>Unless they are icon only</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiButtonGroup
            name="textStyleCompressed"
            legend="Text style"
            className="eui-displayInlineBlock"
            options={this.toggleButtonsIconsMulti}
            idToSelectedMap={this.state.toggleIconIdToSelectedMap}
            onChange={this.onChangeIconsMulti}
            type="multi"
            buttonSize="compressed"
            isIconOnly
          />
        </EuiPanel>
      </Fragment>
    );
  }
}
