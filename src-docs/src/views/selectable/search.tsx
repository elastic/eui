import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { EuiIcon } from '../../../../src/components/icon';
import { EuiText } from '../../../../src/components/text';
import { EuiBadge } from '../../../../src/components/badge';
import {
  EuiSelectable,
  EuiSelectableTemplateSitewide,
} from '../../../../src/components/selectable';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiLink } from '../../../../src/components/link';

export type EuiSelectableProps = React.ComponentProps<typeof EuiSelectable>;
export type EuiSelectableOptionsProps = Required<EuiSelectableProps>['options'];
export type EuiSelectableOptionProps = EuiSelectableOptionsProps[number];

import { searchData, recents } from './data';
import { EuiSelectableLIOption } from 'src/components/selectable/selectable_option';

const allSearches = searchData.concat(recents);
const recentData: EuiSelectableOptionsProps = recents.map(item => {
  return {
    prepend: <EuiIcon type="clock" size="m" color="subdued" />,
  };
});

export default () => {
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

  const onChange = (updatedOptions: EuiSelectableLIOption[]) => {
    const clickedItem = _.find(updatedOptions, { checked: 'on' });
    if (!clickedItem) return;
    if (clickedItem && clickedItem.url) console.log(clickedItem.url);
  };

  return (
    <EuiSelectableTemplateSitewide
      onChange={onChange}
      options={allSearches}
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
