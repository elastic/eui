import React, { useState } from 'react';
import {
  EuiTextArea,
  EuiCommentList,
  EuiComment,
  EuiButtonGroup,
  EuiButtonIcon,
  EuiText,
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCommentListProps,
  EuiSelect,
  EuiCode,
} from '../../../../src/components/';

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

const eventWithMultipleTags = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="xs" wrap>
    <EuiFlexItem grow={false}>added tags</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>case</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>phising</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>security</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

const commentsData: EuiCommentListProps['comments'] = [
  {
    username: 'janed',
    timelineAvatarAriaLabel: 'Jane Doe',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
    actions: copyAction,
  },
  {
    username: 'luisg',
    timelineAvatarAriaLabel: 'Luis G',
    event: eventWithMultipleTags,
    timestamp: '22 hours ago',
    eventIcon: 'tag',
    eventIconAriaLabel: 'tag',
    actions: copyAction,
  },
  {
    username: 'pancho1',
    timelineAvatarAriaLabel: 'Pancho Pérez',
    children: (
      <EuiTextArea
        fullWidth
        placeholder="I'm a textarea in a EuiComment"
        value=""
        onChange={() => {}}
      />
    ),
  },
];

const toggleButtons = [
  {
    id: 'regular',
    label: 'Regular',
  },
  {
    id: 'update',
    label: 'Update',
  },
  {
    id: 'custom',
    label: 'Custom',
  },
];

const colors = [
  { value: 'subdued', text: 'subdued' },
  {
    value: 'transparent',
    text: 'transparent',
  },
  { value: 'danger', text: 'danger' },
  { value: 'warning', text: 'warning' },
  { value: 'accent', text: 'accent' },
  { value: 'primary', text: 'primary' },
  { value: 'success', text: 'success' },
];

export default () => {
  const [toggleIdSelected, setToggleIdSelected] = useState('regular');
  const [color, setColor] = useState(colors[0].value);
  const [comment, setComment] = useState(commentsData[0]);

  const onChangeButtonGroup = (optionId: any) => {
    setToggleIdSelected(optionId);
    const buttonId = optionId.replace('Button', '');

    const selectedCommentIndex = toggleButtons.findIndex(
      ({ id }) => id === buttonId
    );
    setComment(commentsData[selectedCommentIndex]);
  };

  const onChangeSize = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButtonGroup
            legend="Pick an example"
            options={toggleButtons}
            onChange={onChangeButtonGroup}
            idSelected={toggleIdSelected}
            type="single"
            color="primary"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="eventColor"
            options={colors}
            value={color}
            onChange={(e) => onChangeSize(e)}
            compressed
          />
        </EuiFlexItem>
        <EuiFlexItem>
          {toggleIdSelected === 'regular' && color === 'subdued' ? (
            <span>
              subdued is the default <EuiCode>eventColor</EuiCode> for regular{' '}
              <strong>EuiComment</strong>
            </span>
          ) : toggleIdSelected === 'update' && color === 'transparent' ? (
            <span>
              transparent is the default <EuiCode>eventColor</EuiCode> for
              update <strong>EuiComment</strong>
            </span>
          ) : undefined}
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiCommentList>
        <EuiComment {...comment} eventColor={color} />
      </EuiCommentList>
    </>
  );
};
