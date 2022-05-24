import React, { useState } from 'react';
import {
  EuiTextArea,
  EuiComment,
  EuiButtonGroup,
  EuiButtonIcon,
  EuiText,
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
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

const eventWihtMultipleTags = (
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

const commentsData: any[] = [
  {
    id: 'regular',
    username: 'janed',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
    actions: copyAction,
  },
  {
    id: 'update',
    username: 'luisg',
    event: eventWihtMultipleTags,
    timestamp: '22 hours ago',
    eventIcon: 'tag',
    eventIconAriaLabel: 'tag',
    actions: copyAction,
  },
  {
    id: 'updateDanger',
    username: 'system',
    avatarIcon: 'dot',
    event: 'pushed a new incident',
    timestamp: '20 hours ago',
    eventColor: 'danger',
  },
  {
    id: 'custom',
    avatarName: 'pancho1',
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
    id: 'updateDanger',
    label: 'Update danger',
  },
  {
    id: 'custom',
    label: 'Custom',
  },
];

export default () => {
  const [toggleIdSelected, setToggleIdSelected] = useState('regular');
  const [comment, setComment] = useState(commentsData[0]);

  const onChangeButtonGroup = (optionId: any) => {
    setToggleIdSelected(optionId);
    const buttonId = optionId.replace('Button', '');

    const selectedComment = commentsData.find(
      (comment) => comment.id === buttonId
    );
    setComment(selectedComment);
  };

  return (
    <>
      <EuiButtonGroup
        legend="Pick an example"
        options={toggleButtons}
        onChange={onChangeButtonGroup}
        idSelected={toggleIdSelected}
        type="single"
        color="primary"
      />
      <EuiSpacer />
      <div>
        <EuiComment component="div" {...comment} />
      </div>
    </>
  );
};
