import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiImage,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiRadioGroup,
  EuiSpacer,
  EuiSplitPanel,
  EuiTitle,
  useEuiTheme,
} from '@elastic/eui';

import { TYPES_OF_USE_CASES } from './use_cases';
import { TYPES_OF_PANEL_COLORS } from './colors';
import type { UseCaseTypeKeys } from './use_cases';
import { SidebarSnippet } from './sidebar_snippet';
import { EmptySnippet } from './empty_snippet';
import { MultipleSnippet } from './multiple_snippet';
import { isUseCaseTypeKey } from './utils';

const keyPadMenuItemCss = css`
  block-size: initial !important;
`;

const OPTIONS = Object.values(TYPES_OF_USE_CASES).map((item) => ({
  id: item.id,
  label: item.label,
}));

export const TypesOfEmptyStates = () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const [thumbnail, setThumbnail] = useState<'sidebar' | 'empty' | 'multiple'>(
    'sidebar'
  );
  const [radioUseCaseId, setRadioUseCaseId] = useState<UseCaseTypeKeys>(
    TYPES_OF_USE_CASES.firstUse.id
  );

  const useCase = TYPES_OF_USE_CASES[radioUseCaseId];
  const recommendedColor =
    TYPES_OF_PANEL_COLORS[radioUseCaseId === 'error' ? 'error' : thumbnail] ||
    TYPES_OF_PANEL_COLORS.error;

  const thumbnailDarkPageSidebar = useBaseUrl(
    '/images/empty_prompt/thumbnail_dark_page-sidebar.svg'
  );
  const thumbnailDarkPageEmpty = useBaseUrl(
    '/images/empty_prompt/thumbnail_dark_page-empty.svg'
  );
  const thumbnailDarkPageMultiple = useBaseUrl(
    '/images/empty_prompt/thumbnail_dark_page-multiple.svg'
  );

  const thumbnailLightPageSidebar = useBaseUrl(
    '/images/empty_prompt/thumbnail_light_page-sidebar.svg'
  );
  const thumbnailLightPageEmpty = useBaseUrl(
    '/images/empty_prompt/thumbnail_light_page-empty.svg'
  );
  const thumbnailLightPageMultiple = useBaseUrl(
    '/images/empty_prompt/thumbnail_light_page-multiple.svg'
  );

  const isMultipleAvailable = ![
    'noPrivileges',
    'errorPages',
    'forbidden',
    'noResults',
  ].includes(radioUseCaseId);

  useEffect(() => {
    if (thumbnail === 'multiple' && !isMultipleAvailable) {
      setThumbnail('sidebar');
    }
  }, [radioUseCaseId, thumbnail]);

  return (
    <>
      <EuiSplitPanel.Outer direction="row" hasBorder>
        <EuiSplitPanel.Inner color="subdued">
          <EuiRadioGroup
            options={OPTIONS}
            idSelected={radioUseCaseId}
            onChange={(value: string) =>
              isUseCaseTypeKey(value)
                ? setRadioUseCaseId(value)
                : console.error('Invalid use case type key:', value)
            }
            legend={{
              children: (
                <EuiTitle size="xs">
                  <h3>What is the use case?</h3>
                </EuiTitle>
              ),
            }}
          />
          <EuiSpacer size="xl" />
          <EuiTitle size="xs">
            <h3 id="emptyPromptPanelPageTemplateLegend">
              What is the page template?
            </h3>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiKeyPadMenu
            checkable={{ ariaLegend: 'What is the page template?' }}
          >
            <EuiKeyPadMenuItem
              checkable="single"
              css={keyPadMenuItemCss}
              isSelected={thumbnail === 'sidebar'}
              label="Centered content with sidebar"
              name="thumbnailRadioGroup"
              onChange={() => setThumbnail('sidebar')}
            >
              <EuiImage
                alt="Page with sidebar thumbnail"
                url={
                  isDarkTheme
                    ? thumbnailDarkPageSidebar
                    : thumbnailLightPageSidebar
                }
                size="fullWidth"
              />
            </EuiKeyPadMenuItem>
            <EuiKeyPadMenuItem
              checkable="single"
              css={keyPadMenuItemCss}
              isSelected={thumbnail === 'empty'}
              label="Centered body without sidebar"
              name="thumbnailRadioGroup"
              onChange={() => setThumbnail('empty')}
            >
              <EuiImage
                alt="Empty page thumbnail"
                url={
                  isDarkTheme ? thumbnailDarkPageEmpty : thumbnailLightPageEmpty
                }
                size="fullWidth"
              />
            </EuiKeyPadMenuItem>
            {isMultipleAvailable && (
              <EuiKeyPadMenuItem
                checkable="single"
                css={keyPadMenuItemCss}
                isSelected={thumbnail === 'multiple'}
                label="Default with multiple panels"
                name="thumbnailRadioGroup"
                onChange={() => setThumbnail('multiple')}
              >
                <EuiImage
                  alt="Page with multiple panels thumbnail"
                  url={
                    isDarkTheme
                      ? thumbnailDarkPageMultiple
                      : thumbnailLightPageMultiple
                  }
                  size="fullWidth"
                />
              </EuiKeyPadMenuItem>
            )}
          </EuiKeyPadMenu>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner>
          <EuiDescriptionList>
            <EuiDescriptionListTitle>Description</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {useCase.info.description}
            </EuiDescriptionListDescription>
            <EuiDescriptionListTitle>Goal</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {useCase.info.goal}
            </EuiDescriptionListDescription>
            {useCase.info.action && (
              <>
                <EuiDescriptionListTitle>Action</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  {useCase.info.action}
                </EuiDescriptionListDescription>
              </>
            )}
            <EuiDescriptionListTitle>
              Recommended panel color
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {recommendedColor.text}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
      {thumbnail === 'sidebar' ? (
        <SidebarSnippet radioUseCaseId={radioUseCaseId} />
      ) : null}
      {thumbnail === 'empty' ? (
        <EmptySnippet radioUseCaseId={radioUseCaseId} />
      ) : null}
      {thumbnail === 'multiple' ? (
        <MultipleSnippet radioUseCaseId={radioUseCaseId} />
      ) : null}
    </>
  );
};
