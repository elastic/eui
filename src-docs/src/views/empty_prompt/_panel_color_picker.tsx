import React, { useState, useEffect, useContext } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import classNames from 'classnames';
import {
  EuiTitle,
  EuiImage,
  EuiSpacer,
  EuiText,
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
} from '../../../../src/components';
import { ThemeContext } from '../../components/with_theme';
import { recommendedObj } from './_panel_color_picker_recommended';
import { useCasesObj } from './_panel_color_picker_use_cases';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

// images dark
import darkSidebar from '../../images/empty-prompt/thumbnail_dark_page-sidebar.svg';
import darkEmpty from '../../images/empty-prompt/thumbnail_dark_page-empty.svg';
import darkMultiple from '../../images/empty-prompt/thumbnail_dark_page-multiple.svg';

// images light
import lightSidebar from '../../images/empty-prompt/thumbnail_light_page-sidebar.svg';
import lightEmpty from '../../images/empty-prompt/thumbnail_light_page-empty.svg';
import lightMultiple from '../../images/empty-prompt/thumbnail_light_page-multiple.svg';

import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');

  const useCasesOptions: any = Object.values(useCasesObj);

  const errorValue = useCasesObj.error.id;
  const [radioUseCaseId, setRadioUseCaseId] = useState<
    EuiRadioGroupOption['id']
  >(useCasesObj.noData.id);

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

  const getRecommendedText = (obj: any) => (
    <EuiText size="s">{obj.text}</EuiText>
  );

  const [visibleRecommendedText, setVisibleRecommendedText] = useState(
    getRecommendedText(recommendedObj.subdued)
  );

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
      setVisibleRecommendedText(getRecommendedText(recommendedObj.subdued));
      setPanelProps(recommendedObj.subdued.props);
    } else if (isEmpty && radioUseCaseId !== errorValue) {
      setVisibleRecommendedText(getRecommendedText(recommendedObj.plain));
      setPanelProps(recommendedObj.plain.props);
    } else if (isMultiple && radioUseCaseId !== errorValue) {
      setVisibleRecommendedText(getRecommendedText(recommendedObj.multiple));
      setPanelProps(recommendedObj.multiple.props);
    } else {
      setVisibleRecommendedText(getRecommendedText(recommendedObj.error));
      setPanelProps(recommendedObj.error.props);
    }

    if (
      radioUseCaseId === 'noPermission' ||
      radioUseCaseId === 'pageNotFound' ||
      radioUseCaseId === 'forbidden' ||
      radioUseCaseId === 'loading'
    ) {
      // if the `multiple` thumb is selected when we changing the use case for `noPermission`, `pageNotFound`, `forbidden` or `loading` we change the selection for the first thumb
      // because these use cases don't work for a `multiple` page layout
      if (thumbnail === 'multiple') {
        setThumbnail('sidebar');
      }

      setIsDisabledMultipleThumb(true);
    } else {
      setIsDisabledMultipleThumb(false);
    }
  }, [radioUseCaseId, errorValue, isSidebar, isEmpty, isMultiple, thumbnail]);

  const currentUseCaseObj: any = useCasesObj[radioUseCaseId];

  const icon = currentUseCaseObj.iconType
    ? { iconType: currentUseCaseObj.iconType }
    : {
        icon: currentUseCaseObj.icon,
      };

  const euiEmptyPromptPreview = (
    <EuiEmptyPrompt
      {...icon}
      title={currentUseCaseObj.title}
      body={currentUseCaseObj?.body}
      actions={currentUseCaseObj?.actions}
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
            <EuiPanel hasBorder />
          </EuiFlexItem>
          <EuiFlexItem style={{ minHeight: '200px' }}>
            <EuiPanel hasBorder />
          </EuiFlexItem>
          <EuiFlexItem style={{ minHeight: '200px' }}>
            <EuiPanel hasBorder />
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
          <div className="guideDemo__emptyPromptRecommendCards">
            <EuiTitle size="xs">
              <h3>Recommend panel color</h3>
            </EuiTitle>

            <EuiSpacer size="m" />

            {visibleRecommendedText}
          </div>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>

      <GuideSection
        demo={<div className={'guideDemo__highlightLayout'}>{demo}</div>}
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
