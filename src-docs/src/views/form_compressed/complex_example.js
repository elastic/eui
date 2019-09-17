import React, { Component } from 'react';

import {
  EuiButtonGroup,
  EuiButtonIcon,
  EuiColorPicker,
  EuiColorPickerSwatch,
  EuiDualRange,
  EuiFieldNumber,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormLabel,
  EuiFormRow,
  EuiHorizontalRule,
  EuiIcon,
  EuiPanel,
  EuiRange,
  EuiScreenReaderOnly,
  EuiSelect,
  EuiSpacer,
  EuiSuperSelect,
  EuiToolTip,
} from '../../../../src/components';
import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);
    const idPrefix = makeId;
    const idPrefix2 = makeId;
    const idPrefix3 = makeId;

    this.toggleButtons = [
      {
        id: `${idPrefix}0`,
        label: 'coarse',
      },
      {
        id: `${idPrefix}1`,
        label: 'fine',
      },
      {
        id: `${idPrefix}2`,
        label: 'finest',
      },
    ];

    this.typeStyleToggleButtons = [
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

    this.granularityToggleButtons = [
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

    this.state = {
      isSwitchChecked: false,
      opacityValue: '20',
      buttonGroupIdSelected: `${idPrefix}1`,
      color: '#DB1374',
      borderValue: 3,
      popoverSliderValues: 16,
      dualValue: [5, 10],
      typeStyleToggleButtonsIdToSelectedMap: {},
      granularityToggleButtonsIdSelected: `${idPrefix2}4`,
    };

    this.selectTooltipContent =
      'Otherwise use an EuiToolTip around the label of the form row.';
  }

  onPopoverSliderValueChange = e => {
    this.setState({
      popoverSliderValues: e.target.value,
    });
  };

  onBorderChange = e => {
    this.setState({ borderValue: e.target.value });
  };

  onColorChange = value => {
    this.setState({ color: value });
  };

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onRangeChange = e => {
    this.setState({
      opacityValue: e.target.value,
    });
  };

  onChange = optionId => {
    this.setState({
      buttonGroupIdSelected: optionId,
    });
  };

  onDualChange = value => {
    this.setState({
      dualValue: value,
    });
  };

  onTypeStyleChange = optionId => {
    const newTypeStyleToggleButtonsIdToSelectedMap = {
      ...this.state.typeStyleToggleButtonsIdToSelectedMap,
      ...{
        [optionId]: !this.state.typeStyleToggleButtonsIdToSelectedMap[optionId],
      },
    };

    this.setState({
      typeStyleToggleButtonsIdToSelectedMap: newTypeStyleToggleButtonsIdToSelectedMap,
    });
  };

  onGranularityChange = optionId => {
    this.setState({
      granularityToggleButtonsIdSelected: optionId,
    });
  };

  render() {
    return (
      <EuiPanel style={{ maxWidth: 432 }}>
        <EuiFormRow label="Name" display="columnCompressed">
          <EuiFieldText prepend="Label" placeholder="Input" compressed />
        </EuiFormRow>

        <EuiFormRow label="Visibility" display="columnCompressed">
          <EuiDualRange
            value={this.state.dualValue}
            onChange={this.onDualChange}
            min={0}
            max={26}
            compressed
            showInput="inputWithPopover"
            showLabels
            prepend="Zoom levels"
          />
        </EuiFormRow>

        <EuiFormRow label="Opacity" display="columnCompressed">
          <EuiRange
            min={0}
            max={100}
            name="range"
            id="range"
            showInput
            compressed
            value={this.state.opacityValue}
            onChange={this.onRangeChange}
            append="%"
          />
        </EuiFormRow>

        <EuiSpacer size="s" />

        <EuiScreenReaderOnly>
          <span id="docsExampleSelectTooltipContent">
            {this.selectTooltipContent}
          </span>
        </EuiScreenReaderOnly>
        <EuiFormRow
          label={
            <EuiToolTip content={this.selectTooltipContent}>
              <span>
                Label <EuiIcon type="questionInCircle" color="subdued" />
              </span>
            </EuiToolTip>
          }
          display="columnCompressed">
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
            aria-describedby="docsExampleSelectTooltipContent"
          />
        </EuiFormRow>

        <EuiFormRow label="Granularity" display="columnCompressed">
          <EuiButtonGroup
            legend="Granulariy of zoom levels"
            options={this.granularityToggleButtons}
            idSelected={this.state.granularityToggleButtonsIdSelected}
            onChange={this.onGranularityChange}
            buttonSize="compressed"
            isFullWidth
          />
        </EuiFormRow>

        <EuiFormRow label="Fill" display="columnCompressed">
          <EuiColorPicker
            onChange={this.onColorChange}
            color={this.state.color}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="Select one" display="columnCompressed">
          <EuiSuperSelect
            options={[
              { value: 'option_one', inputDisplay: 'Option one' },
              { value: 'option_two', inputDisplay: 'Option two' },
              { value: 'option_three', inputDisplay: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="With button" display="columnCompressed">
          <EuiFieldNumber
            min={1}
            max={100}
            defaultValue={10}
            compressed
            prepend={[
              <EuiButtonIcon
                iconType="magnet"
                aria-label="Dynamic toggle"
                title="Make dynamic"
              />,
              'kibana_sample_ecommerce_data',
            ]}
            append="px"
          />
        </EuiFormRow>

        <EuiHorizontalRule />

        <EuiFormRow label="Container" display="columnCompressed">
          <EuiFlexGroup gutterSize="s" responsive={false} wrap>
            <EuiFlexItem grow={false}>
              <EuiColorPicker
                onChange={this.onColorChange}
                color={this.state.color}
                button={
                  <EuiColorPickerSwatch
                    color={this.state.color}
                    aria-label="Container color"
                    title="Container color"
                    style={{ width: 32, height: 32 }}
                  />
                }
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiRange
                showInput="inputWithPopover"
                min={0}
                max={240}
                value={this.state.popoverSliderValues}
                onChange={this.onPopoverSliderValueChange}
                compressed
                append="px"
                prepend="Padding"
                aria-label="Container padding in pixels"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFormRow>

        <EuiSpacer size="s" />

        <EuiFormRow label="Label" display="columnCompressed">
          <div>
            <EuiSelect
              id="docsExampleLabelFont"
              options={[
                { value: 'inter', text: 'Inter UI' },
                { value: 'roboto', text: 'Roboto' },
                { value: 'comic', text: 'Comic sans' },
              ]}
              compressed
              prepend="Font"
              aria-label="Label font family"
            />
            <EuiSpacer size="xs" />
            <EuiFlexGroup
              gutterSize="s"
              responsive={false}
              wrap
              justifyContent="flexEnd">
              <EuiFlexItem>
                <EuiRange
                  showInput="inputWithPopover"
                  min={7}
                  max={140}
                  value={this.state.popoverSliderValues}
                  onChange={this.onPopoverSliderValueChange}
                  compressed
                  append="px"
                  aria-label="Label font size in pixels"
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup
                  legend="Label text style"
                  className="eui-displayInlineBlock"
                  options={this.typeStyleToggleButtons}
                  idToSelectedMap={
                    this.state.typeStyleToggleButtonsIdToSelectedMap
                  }
                  onChange={this.onTypeStyleChange}
                  type="multi"
                  isIconOnly
                  buttonSize="compressed"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiFormRow>

        <EuiSpacer size="s" />

        <EuiFormLabel htmlFor="docsExampleBorderSize">Border</EuiFormLabel>
        <EuiSpacer size="xs" />
        <EuiFlexGroup gutterSize="s" responsive={false} wrap>
          <EuiFlexItem style={{ flexBasis: 72 }}>
            <EuiRange
              id="docsExampleBorderSize"
              showInput="inputWithPopover"
              min={0}
              max={32}
              value={this.state.popoverSliderValues}
              onChange={this.onPopoverSliderValueChange}
              compressed
              append="px"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={4} style={{ minWidth: 160 }}>
            <EuiSelect
              id="docsExampleBorderStyle"
              options={[
                { value: 'dashed', text: 'Dashed' },
                { value: 'dotted', text: 'Dotted' },
                { value: 'solid', text: 'Solid' },
              ]}
              compressed
              prepend="Style"
              aria-label="Border style"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiColorPicker
              onChange={this.onColorChange}
              color={this.state.color}
              button={
                <EuiColorPickerSwatch
                  color={this.state.color}
                  aria-label="Border color"
                  title="Border color"
                  style={{ width: 32, height: 32 }}
                />
              }
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    );
  }
}
