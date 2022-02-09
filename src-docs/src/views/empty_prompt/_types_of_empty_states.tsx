import React, { useState, useEffect, useContext } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import classNames from 'classnames';
import {
  EuiTitle,
  EuiImage,
  EuiSpacer,
  EuiRadioGroup,
  EuiEmptyPrompt,
  EuiSplitPanel,
  EuiKeyPadMenu,
  EuiFlexItem,
  EuiRadioGroupOption,
  EuiPageTemplate,
  EuiFlexGrid,
  EuiPanel,
  EuiKeyPadMenuItem,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiLoadingSpinner,
} from '../../../../src/components';
import { ThemeContext } from '../../components/with_theme';
import { typesOfPanelColors } from './_types_of_panel_colors';
// @ts-ignore Importing from JS file
import { typesOfUseCases } from './_types_of_use_cases';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

// images dark
import darkSidebar from '../../images/empty-prompt/thumbnail_dark_page-sidebar.svg';
import darkEmpty from '../../images/empty-prompt/thumbnail_dark_page-empty.svg';
import darkMultiple from '../../images/empty-prompt/thumbnail_dark_page-multiple.svg';
import darkContent from '../../images/empty-prompt/thumbnail_dark_empty_content.svg';

// images light
import lightSidebar from '../../images/empty-prompt/thumbnail_light_page-sidebar.svg';
import lightEmpty from '../../images/empty-prompt/thumbnail_light_page-empty.svg';
import lightMultiple from '../../images/empty-prompt/thumbnail_light_page-multiple.svg';
import lightContent from '../../images/empty-prompt/thumbnail_light_empty_content.svg';

import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');

  const useCasesOptions: EuiRadioGroupOption[] = Object.values(
    typesOfUseCases
  ).map((item: any) => {
    return {
      id: item.id,
      label: item.label,
    };
  });

  const errorValue = typesOfUseCases.error.id;
  const [radioUseCaseId, setRadioUseCaseId] = useState<
    EuiRadioGroupOption['id']
  >(typesOfUseCases.firstUse.id);

  const [panelProps, setPanelProps] = useState({ color: 'plain' });
  const [thumbnail, setThumbnail] = useState('sidebar');
  const [isDisabledMultipleThumb, setIsDisabledMultipleThumb] = useState(false);

  const onSelectThumbnail = (thumbnailName: string) => {
    setThumbnail(thumbnailName);
  };

  const isSidebar = thumbnail === 'sidebar';
  const isEmpty = thumbnail === 'empty';
  const isMultiple = thumbnail === 'multiple';

  const onChangeUseCase = (id: EuiRadioGroupOption['id']) => {
    setRadioUseCaseId(id);
  };

  const [
    visibleRecommendedPanelColorText,
    setVisibleRecommendedPanelColorText,
  ] = useState(typesOfPanelColors.subdued.text);

  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const sideNav = (
    <EuiImage
      size={isMobileSize ? 'original' : 'fullWidth'}
      alt="Fake side nav list"
      url={isMobileSize ? singleSvg : sideNavSvg}
    />
  );

  useEffect(() => {
    if (isSidebar && radioUseCaseId !== errorValue) {
      setVisibleRecommendedPanelColorText(typesOfPanelColors.subdued.text);
      setPanelProps(typesOfPanelColors.subdued.props);
    } else if (isEmpty && radioUseCaseId !== errorValue) {
      setVisibleRecommendedPanelColorText(typesOfPanelColors.plain.text);
      setPanelProps(typesOfPanelColors.plain.props);
    } else if (isMultiple && radioUseCaseId !== errorValue) {
      setVisibleRecommendedPanelColorText(typesOfPanelColors.multiple.text);
      setPanelProps(typesOfPanelColors.multiple.props);
    } else {
      setVisibleRecommendedPanelColorText(typesOfPanelColors.error.text);
      setPanelProps(typesOfPanelColors.error.props);
    }

    if (
      radioUseCaseId === 'noPrivileges' ||
      radioUseCaseId === 'errorPages' ||
      radioUseCaseId === 'forbidden' ||
      radioUseCaseId === 'noResults'
    ) {
      // if the `multiple` thumb is selected when we changing the use case for `noPrivileges`, `errorPages`, `forbidden` or `noResults` we change the selection for the first thumb
      // because these use cases don't work for a `multiple` page layout
      if (thumbnail === 'multiple') {
        setThumbnail('sidebar');
      }

      setIsDisabledMultipleThumb(true);
    } else {
      setIsDisabledMultipleThumb(false);
    }
  }, [radioUseCaseId, errorValue, isSidebar, isEmpty, isMultiple, thumbnail]);

  const currentUseCaseInfo = typesOfUseCases[radioUseCaseId].info;

  const currentUseCaseExample = typesOfUseCases[radioUseCaseId].example;

  let icon;

  if (
    currentUseCaseExample.icon &&
    isMultiple &&
    radioUseCaseId === 'loading'
  ) {
    icon = { icon: <EuiLoadingSpinner size="l" /> };
  } else if (currentUseCaseExample.iconType) {
    icon = { iconType: currentUseCaseExample.iconType };
  } else {
    icon = {
      icon: currentUseCaseExample.icon,
    };
  }

  const layout = currentUseCaseExample.layout
    ? { layout: currentUseCaseExample.layout }
    : { layout: 'vertical' };

  const titleSize = isMultiple ? 's' : 'm';
  const multipleLoadingPanel = isMultiple && radioUseCaseId === 'loading';

  const multipleLoadingPanelStyles = multipleLoadingPanel && {
    style: {
      minWidth: '100%',
      width: '100%',
    },
  };

  const body = currentUseCaseExample.body && {
    body: currentUseCaseExample.body,
  };

  const actions = currentUseCaseExample.actions && {
    actions: currentUseCaseExample.actions,
  };

  const euiEmptyPromptPreview = (
    <EuiEmptyPrompt
      {...icon}
      {...layout}
      {...multipleLoadingPanelStyles}
      title={currentUseCaseExample.title}
      titleSize={titleSize}
      {...body}
      {...actions}
      {...(panelProps as any)}
    />
  );

  let demo;

  if (isSidebar) {
    demo = (
      <EuiPageTemplate
        template="centeredContent"
        pageContentProps={{ paddingSize: 'none' }}
        pageSideBar={sideNav}
      >
        {euiEmptyPromptPreview}
      </EuiPageTemplate>
    );
  } else if (isEmpty) {
    demo = (
      <EuiPageTemplate
        template="centeredBody"
        pageContentProps={{ color: 'transparent' }}
      >
        {euiEmptyPromptPreview}
      </EuiPageTemplate>
    );
  } else if (isMultiple) {
    demo = (
      <EuiPageTemplate pageSideBar={sideNav}>
        <EuiFlexGrid columns={2}>
          <EuiFlexItem>{euiEmptyPromptPreview}</EuiFlexItem>
          <EuiFlexItem style={{ minHeight: '200px' }}>
            <EuiPanel hasBorder>
              <EuiImage
                width="fullWidth"
                url={isDarkTheme ? darkContent : lightContent}
                alt=""
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem style={{ minHeight: '200px' }}>
            <EuiPanel hasBorder>
              <EuiImage
                width="fullWidth"
                url={isDarkTheme ? darkContent : lightContent}
                alt=""
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem style={{ minHeight: '200px' }}>
            <EuiPanel hasBorder>
              <EuiImage
                width="fullWidth"
                url={isDarkTheme ? darkContent : lightContent}
                alt=""
              />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGrid>
      </EuiPageTemplate>
    );
  }

  const code = reactElementToJSXString(demo);

  return (
    <>
      <EuiSplitPanel.Outer direction="row" hasBorder>
        <EuiSplitPanel.Inner color="subdued">
          <EuiRadioGroup
            options={useCasesOptions}
            idSelected={radioUseCaseId}
            onChange={onChangeUseCase}
            name="radio group"
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
            className="guideDemo__emptyPromptPanelPicker"
            checkable={{
              ariaLegend: 'What is the page template?',
            }}
          >
            <EuiKeyPadMenuItem
              checkable="single"
              name={'radioGroupName'}
              className="guideDemo__emptyPromptPanelPickerThumbBtn"
              isSelected={isSidebar}
              label={'Centered content with sidebar'}
              onChange={() => onSelectThumbnail('sidebar')}
            >
              <EuiImage
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumb',
                  {
                    'guideDemo__emptyPromptPanelPickerThumb-isSelected': isSidebar,
                  }
                )}
                alt="Page with sidebar thumbnail"
                url={isDarkTheme ? darkSidebar : lightSidebar}
                size="fullWidth"
              />
            </EuiKeyPadMenuItem>
            <EuiKeyPadMenuItem
              checkable="single"
              name={'radioGroupName'}
              className="guideDemo__emptyPromptPanelPickerThumbBtn"
              isSelected={isEmpty}
              label={'Centered body without sidebar'}
              onChange={() => onSelectThumbnail('empty')}
            >
              <EuiImage
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumb',
                  {
                    'guideDemo__emptyPromptPanelPickerThumb-isSelected': isEmpty,
                  }
                )}
                alt="Empty page thumbnail"
                url={isDarkTheme ? darkEmpty : lightEmpty}
                size="fullWidth"
              />
            </EuiKeyPadMenuItem>
            {!isDisabledMultipleThumb && (
              <EuiKeyPadMenuItem
                checkable="single"
                name={'radioGroupName'}
                className="guideDemo__emptyPromptPanelPickerThumbBtn"
                isSelected={isMultiple}
                label={'Default with multiple panels'}
                onChange={() => onSelectThumbnail('multiple')}
              >
                <EuiImage
                  className={classNames(
                    'guideDemo__emptyPromptPanelPickerThumb',
                    {
                      'guideDemo__emptyPromptPanelPickerThumb-isSelected': isMultiple,
                    }
                  )}
                  alt="Page with multiple panels thumbnail"
                  url={isDarkTheme ? darkMultiple : lightMultiple}
                  size="fullWidth"
                />
              </EuiKeyPadMenuItem>
            )}
          </EuiKeyPadMenu>

          <EuiSpacer size="xl" />
        </EuiSplitPanel.Inner>

        <EuiSplitPanel.Inner>
          <EuiDescriptionList>
            <EuiDescriptionListTitle>Description</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {currentUseCaseInfo.description}
            </EuiDescriptionListDescription>

            <EuiDescriptionListTitle>Goal</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {currentUseCaseInfo.goal}
            </EuiDescriptionListDescription>

            {currentUseCaseInfo.action && (
              <>
                <EuiDescriptionListTitle>Action</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  {currentUseCaseInfo.action}
                </EuiDescriptionListDescription>
              </>
            )}

            <EuiDescriptionListTitle>
              Recommend panel color
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {visibleRecommendedPanelColorText}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>

          <div className="guideDemo__emptyPromptRecommendCards">{/*  */}</div>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>

      <GuideSection
        demo={<div className={'guideDemo__emptyPromptDemoPreview'}>{demo}</div>}
        source={[
          {
            type: GuideSectionTypes.STRING_JS,
            code: code,
          },
        ]}
      />
    </>
  );
};
