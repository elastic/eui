import React, { useState } from 'react';
import {
  EuiTextArea,
  EuiCommentList,
  EuiComment,
  EuiButtonGroup,
  EuiButtonIcon,
  EuiButtonIconProps,
  EuiText,
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCommentListProps,
  EuiSelect,
  EuiCode,
} from '../../../../src/components/';

import { EuiCommentEventProps } from '../../../../src/components/comment_list/comment_event';

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>
);

const CopyAction = ({ color = 'text' }: Pick<EuiButtonIconProps, 'color'>) => (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color={color}
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
      <EuiBadge>phishing</EuiBadge>
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
  },
  {
    username: 'luisg',
    timelineAvatarAriaLabel: 'Luis G',
    event: eventWithMultipleTags,
    timestamp: '22 hours ago',
    eventIcon: 'tag',
    eventIconAriaLabel: 'tag',
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

export default () => {
  const colors: Array<{
    value: EuiCommentEventProps['eventColor'];
    text: string;
  }> = [
    { value: 'subdued', text: 'subdued' },
    { value: 'transparent', text: 'transparent' },
    { value: 'danger', text: 'danger' },
    { value: 'warning', text: 'warning' },
    { value: 'accent', text: 'accent' },
    { value: 'primary', text: 'primary' },
    { value: 'success', text: 'success' },
    { value: undefined, text: 'undefined' },
  ];
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

  const onChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const color = e.target.value;
    setColor(
      color && color !== 'undefined'
        ? (color as EuiCommentEventProps['eventColor'])
        : undefined
    );
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
        {toggleIdSelected !== 'custom' ? (
          <EuiFlexItem grow={false}>
            <EuiSelect
              prepend="eventColor"
              options={colors}
              value={color}
              onChange={(e) => onChangeSize(e)}
              compressed
            />
          </EuiFlexItem>
        ) : undefined}
        <EuiFlexItem>
          {toggleIdSelected === 'regular' && color === 'subdued' && (
            <span>
              subdued is the default <EuiCode>eventColor</EuiCode> for regular{' '}
              <strong>EuiComment</strong>
            </span>
          )}
          {toggleIdSelected === 'update' && color === 'transparent' && (
            <span>
              transparent is the default <EuiCode>eventColor</EuiCode> for
              update <strong>EuiComment</strong>
            </span>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiCommentList>
        <EuiComment
          {...comment}
          eventColor={color}
          actions={
            toggleIdSelected !== 'custom' && (
              <CopyAction
                color={
                  color !== 'transparent' && color !== 'subdued'
                    ? color
                    : 'text'
                }
              />
            )
          }
        />
      </EuiCommentList>
    </>
  );
};
