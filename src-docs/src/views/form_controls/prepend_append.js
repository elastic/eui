import React, { Fragment, useState } from 'react';

import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText,
  EuiIcon,
  EuiIconTip,
  EuiPopover,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiToolTip,
} from '../../../../src/components';

export default () => {
  const [isCompressed, setCompressed] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isReadOnly, setReadOnly] = useState(false);

  return (
    <Fragment>
      <EuiSwitch
        label="compressed"
        checked={isCompressed}
        onChange={e => setCompressed(e.target.checked)}
      />
      &emsp;
      <EuiSwitch
        label="disabled"
        checked={isDisabled}
        onChange={e => setDisabled(e.target.checked)}
      />
      &emsp;
      <EuiSwitch
        label="readOnly"
        checked={isReadOnly}
        onChange={e => setReadOnly(e.target.checked)}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="String & text in a tooltip"
        prepend="String"
        append={
          <EuiToolTip content="content">
            <EuiText size="s">Tooltip</EuiText>
          </EuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="XS empty button in a popover & tooltip"
        prepend={
          <EuiPopover
            button={
              <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
                Popover
              </EuiButtonEmpty>
            }
            closePopover={() => {}}
          />
        }
        append={
          <EuiToolTip content="content">
            <EuiButtonEmpty size="xs">Tooltip</EuiButtonEmpty>
          </EuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="XS empty buttons with icons"
        prepend={
          <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
            <EuiIcon type="calendar" />
          </EuiButtonEmpty>
        }
        append={
          <EuiButtonEmpty size="xs" iconType="gear">
            Tooltip
          </EuiButtonEmpty>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="Icon & button icon"
        prepend={<EuiIcon type="vector" />}
        append={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="Icons in buttons and popovers and tooltips"
        prepend={[
          <EuiIcon type="vector" />,
          <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
        ]}
        append={[
          <EuiPopover
            button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
            closePopover={() => {}}
          />,
          <EuiIconTip content="content" />,
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="Icon button in popover & tooltip"
        append={
          <EuiPopover
            button={<EuiButtonIcon iconType="arrowDown" aria-label="Popover" />}
            closePopover={() => {}}
          />
        }
        prepend={
          <EuiToolTip content="content">
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />
          </EuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="Icon and string & string and icon button"
        prepend={[<EuiIcon type="vector" />, 'String']}
        append={[
          'String',
          <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
      <EuiSpacer />
      <EuiFieldText
        placeholder="String and button icon in tooltip & button icon in popover and string "
        prepend={[
          'String',
          <EuiToolTip content="content">
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />
          </EuiToolTip>,
        ]}
        append={[
          <EuiPopover
            button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
            closePopover={() => {}}
          />,
          'String',
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
    </Fragment>
  );
};
