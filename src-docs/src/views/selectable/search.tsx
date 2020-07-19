import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { EuiIcon } from '../../../../src/components/icon';
import { EuiHighlight } from '../../../../src/components/highlight';
import { EuiText, EuiTextColor } from '../../../../src/components/text';
import { EuiBadge } from '../../../../src/components/badge';
import {
  EuiSelectable,
  EuiSelectableTemplateSitewide,
} from '../../../../src/components/selectable';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiLink } from '../../../../src/components/link';
import { EuiAvatar } from '../../../../src/components/avatar';

export type EuiSelectableProps = React.ComponentProps<typeof EuiSelectable>;
export type EuiSelectableOptionsProps = Required<EuiSelectableProps>['options'];
export type EuiSelectableOptionProps = EuiSelectableOptionsProps[number];

import { searchData, recents } from './data';

function createAppendNodes(space?: string) {
  const spaceAvatar = space ? (
    <EuiAvatar type="space" name={space} size="s" />
  ) : (
    undefined
  );

  return spaceAvatar;
}

const allSearches = searchData.concat(recents);
const data: EuiSelectableOptionsProps = allSearches.map(item => {
  return {
    key: item.title,
    label: `${item.title} ${item.type.title}`,
    prepend: item.type.iconType ? (
      <EuiIcon type={item.type.iconType} size="m" color="subdued" />
    ) : (
      undefined
    ),
    className: 'kibanaChromeSearch__item',
    append: createAppendNodes(item.space),
  };
});

const recentData: EuiSelectableOptionsProps = recents.map(item => {
  return {
    key: item.title,
    label: `${item.title} ${item.type.title}`,
    prepend: <EuiIcon type="clock" size="m" color="subdued" />,
    className: 'kibanaChromeSearch__item',
    append: createAppendNodes(item.space),
  };
});

export default () => {
  const options = data;
  const [searchValue, setSearchValue] = useState('');
  const searchValueExists = searchValue && searchValue !== '';

  let inputRef: HTMLInputElement;

  useEffect(() => {
    window.addEventListener('keydown', onWindowKeyDown);

    return function cleanup() {
      window.removeEventListener('resize', onWindowKeyDown);
    };
  });

  const onWindowKeyDown = (e: any) => {
    if (e.metaKey && e.key.toLowerCase() === 'k') {
      window.addEventListener('keyup', onWindowKeyUp);
    }
  };

  const onWindowKeyUp = () => {
    inputRef && inputRef.focus();
    window.removeEventListener('keyup', onWindowKeyUp);
  };

  const onChange = (updatedOptions: EuiSelectableOptionProps[]) => {
    const clickedItem = _.find(updatedOptions, { checked: 'on' });
    if (!clickedItem) return;
    const searchItem = _.find(allSearches, { title: clickedItem.key });
    if (searchItem && searchItem.url) console.log(searchItem.url);
  };

  const renderOption = (
    option: EuiSelectableOptionProps,
    searchValue: string
  ) => {
    const moreInfo = _.find(allSearches, { title: option.key });
    if (!moreInfo) return 'Missing info';

    return (
      <>
        <strong>
          <EuiHighlight search={searchValue}>{moreInfo.title}</EuiHighlight>
        </strong>
        <br />
        <small>
          {moreInfo.type.title && (
            <EuiTextColor color="secondary">
              <strong>
                <EuiHighlight search={searchValue}>
                  {moreInfo.type.title}
                </EuiHighlight>
              </strong>
            </EuiTextColor>
          )}
          {moreInfo.meta && (
            <EuiTextColor color="subdued">
              &ensp;•&ensp;
              <EuiHighlight search={searchValue}>{moreInfo.meta}</EuiHighlight>
            </EuiTextColor>
          )}
        </small>
      </>
    );
  };

  return (
    <EuiSelectableTemplateSitewide
      onChange={onChange}
      options={searchValueExists ? options : recentData}
      searchProps={{
        append: '⌘K',
        // onKeyUpCapture: (e: any) => setSearchValue(e.currentTarget.value),
        compressed: true,
        className: 'customSearchClass',
        inputRef: (ref: HTMLInputElement) => (inputRef = ref),
      }}
      listProps={{
        className: 'customListClass',
      }}
      popoverProps={{
        className: 'customPopoverClass',
        width: '50vw',
      }}
      popoverFooter={
        <EuiText color="subdued" size="xs">
          <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiLink>View more results</EuiLink>
            </EuiFlexItem>
            <EuiFlexItem />
            <EuiFlexItem grow={false}>Quickly search using</EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>Command + K</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiText>
      }
    />
  );
};
