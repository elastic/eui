import React, { KeyboardEvent, useEffect, useState } from 'react';
import { EuiButton } from '../../../../src/components/button';
import { EuiCode } from '../../../../src/components/code';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import {
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideOption,
} from '../../../../src/components/selectable/selectable_templates';
import { EuiText } from '../../../../src/components/text';
import { GuidePageHeaderProps } from './guide_page_header';

export function GuidePageSearch({
  navigation,
  historyPush,
}: {
  navigation: GuidePageHeaderProps['navigation'];
  historyPush: GuidePageHeaderProps['historyPush'];
}) {
  const [searchRef, setSearchRef] = useState<HTMLInputElement | null>(null);
  const [buttonRef, setButtonRef] = useState<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const searchValueExists = !searchValue.length;

  /**
   * Hook up the keyboard shortcut for command+k to initiate focus into search input
   */
  useEffect(() => {
    window.addEventListener('keydown', onWindowKeyDown);

    return function cleanup() {
      window.removeEventListener('resize', onWindowKeyDown);
    };
  });

  const onWindowKeyDown = (e: any) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
      if (searchRef) {
        searchRef.focus();
      } else if (buttonRef) {
        (buttonRef.children[0] as HTMLButtonElement).click();
      }
    }
  };

  const onKeyUpCapture = (e: KeyboardEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const pages: EuiSelectableTemplateSitewideOption[] = [];
  navigation.forEach(({ name: text, items }) => {
    pages.push(
      ...items.map(({ name: label, path }) => ({
        label,
        path,
        meta: [
          {
            text,
            type: 'application',
          },
        ],
      }))
    );
  });

  const pagesAndSections: EuiSelectableTemplateSitewideOption[] = [...pages];
  navigation.forEach(({ name: categoryName, items }) => {
    items.forEach(({ name: routeName, sections, path }) => {
      if (!sections) return;

      pagesAndSections.push(
        ...sections
          .filter((section) => section.title)
          .map(({ title, id }) => {
            return {
              label: title!,
              path: `${path}/#${id}`,
              meta: [
                {
                  text: categoryName,
                  type: 'application',
                },
                {
                  text: routeName,
                  type: 'article',
                },
              ],
            };
          })
      );
    });
  });

  const onChange = (updatedOptions: EuiSelectableTemplateSitewideOption[]) => {
    const clickedItem = updatedOptions.find(({ checked }) => checked === 'on');
    if (!clickedItem) return;
    historyPush(`/${clickedItem.path}`);
  };

  return (
    <EuiSelectableTemplateSitewide
      options={searchValueExists ? pages : pagesAndSections}
      onChange={onChange}
      singleSelection={true}
      searchProps={{
        'aria-label': 'Search docs pages and sections',
        placeholder: 'Search docs pages and sections',
        compressed: true,
        onKeyUpCapture: onKeyUpCapture,
        inputRef: setSearchRef,
      }}
      popoverProps={{
        repositionOnScroll: true,
        buttonRef: setButtonRef,
      }}
      popoverButton={<EuiButton>Mobile toggle</EuiButton>}
      popoverButtonBreakpoints={['xs', 's']}
      popoverFooter={
        <EuiFlexGroup
          alignItems="center"
          justifyContent="flexEnd"
          gutterSize="s"
          responsive={false}
          wrap>
          <EuiFlexItem grow={false}>
            <EuiText color="subdued" size="xs">
              <p>
                Shortcut: <EuiCode>Ctrl + /</EuiCode> or{' '}
                <EuiCode>Cmd + /</EuiCode>
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      }
    />
  );
}
