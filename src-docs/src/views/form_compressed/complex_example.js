import React, { useState } from 'react';

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
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = htmlIdGenerator()();
  const idPrefix1 = htmlIdGenerator()();

  const typeStyleToggleButtons = [
    {
      id: `${idPrefix1}3`,
      label: 'Bold',
      name: 'bold',
      iconType: 'editorBold',
    },
    {
      id: `${idPrefix1}4`,
      label: 'Italic',
      name: 'italic',
      iconType: 'editorItalic',
    },
    {
      id: `${idPrefix1}5`,
      label: 'Underline',
      name: 'underline',
      iconType: 'editorUnderline',
    },
    {
      id: `${idPrefix1}6`,
      label: 'Strikethrough',
      name: 'strikethrough',
      iconType: 'editorStrike',
    },
  ];

  const granularityToggleButtons = [
    {
      id: `${idPrefix}3`,
      label: 'fine',
    },
    {
      id: `${idPrefix}4`,
      label: 'rough',
    },
    {
      id: `${idPrefix}5`,
      label: 'coarse',
    },
  ];

  const selectTooltipContent =
    'Otherwise use an EuiToolTip around the label of the form row.';

  const [opacityValue, setOpacityValue] = useState('20');
  const [color, setColor] = useState('#D36086');
  const [popoverSliderValues, setPopoverSliderValues] = useState(16);
  const [dualValue, setDualValue] = useState([5, 10]);
  const [
    typeStyleToggleButtonsIdToSelectedMap,
    setTypeStyleToggleButtonsIdToSelectedMap,
  ] = useState({});
  const [
    granularityToggleButtonsIdSelected,
    setGranularityToggleButtonsIdSelected,
  ] = useState(`${idPrefix}4`);

  const onPopoverSliderValueChange = (e) => {
    setPopoverSliderValues(e.target.value);
  };

  const onColorChange = (value) => {
    setColor(value);
  };

  const onRangeChange = (e) => {
    setOpacityValue(e.target.value);
  };

  const onDualChange = (value) => {
    setDualValue(value);
  };

  const onTypeStyleChange = (optionId) => {
    const newTypeStyleToggleButtonsIdToSelectedMap = {
      ...typeStyleToggleButtonsIdToSelectedMap,
      ...{
        [optionId]: !typeStyleToggleButtonsIdToSelectedMap[optionId],
      },
    };

    setTypeStyleToggleButtonsIdToSelectedMap(
      newTypeStyleToggleButtonsIdToSelectedMap
    );
  };

  const onGranularityChange = (optionId) => {
    setGranularityToggleButtonsIdSelected(optionId);
  };

  return (
    <EuiPanel style={{ maxWidth: 432 }}>
      <EuiFormRow label="Name" display="columnCompressed">
        <EuiFieldText prepend="Label" placeholder="Input" compressed />
      </EuiFormRow>

      <EuiFormRow label="Visibility" display="columnCompressed">
        <EuiDualRange
          value={dualValue}
          onChange={onDualChange}
          min={0}
          max={26}
          compressed
          showInput="inputWithPopover"
          showLabels
          aria-label="EuiDualRange within compressed form"
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
          value={opacityValue}
          onChange={onRangeChange}
          append="%"
        />
      </EuiFormRow>

      <EuiSpacer size="s" />

      <EuiScreenReaderOnly>
        <span id="docsExampleSelectTooltipContent">{selectTooltipContent}</span>
      </EuiScreenReaderOnly>
      <EuiFormRow
        label={
          <EuiToolTip content={selectTooltipContent}>
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
          options={granularityToggleButtons}
          idSelected={granularityToggleButtonsIdSelected}
          onChange={onGranularityChange}
          buttonSize="compressed"
          isFullWidth
        />
      </EuiFormRow>

      <EuiFormRow label="Fill" display="columnCompressed">
        <EuiColorPicker onChange={onColorChange} color={color} compressed />
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
              onChange={onColorChange}
              color={color}
              button={
                <EuiColorPickerSwatch
                  color={color}
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
              value={popoverSliderValues}
              onChange={onPopoverSliderValueChange}
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
                value={popoverSliderValues}
                onChange={onPopoverSliderValueChange}
                compressed
                append="px"
                aria-label="Label font size in pixels"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonGroup
                legend="Label text style"
                className="eui-displayInlineBlock"
                options={typeStyleToggleButtons}
                idToSelectedMap={typeStyleToggleButtonsIdToSelectedMap}
                onChange={onTypeStyleChange}
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
            value={popoverSliderValues}
            onChange={onPopoverSliderValueChange}
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
            onChange={onColorChange}
            color={color}
            button={
              <EuiColorPickerSwatch
                color={color}
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
};
