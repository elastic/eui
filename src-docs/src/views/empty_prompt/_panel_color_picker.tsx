import React, { useState, useEffect, useContext } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import classNames from 'classnames';
import {
  EuiTitle,
  EuiImage,
  EuiSpacer,
  EuiIcon,
  EuiText,
  EuiRadioGroup,
  EuiEmptyPrompt,
  EuiSplitPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiRadioGroupOption,
  EuiPageTemplate,
  EuiFlexGrid,
  EuiPanel,
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
      radioUseCaseId === 'errorPage' ||
      radioUseCaseId === 'loading'
    ) {
      // if this thumb is selected when we changing to use case for `noPermission` or `pageError` we select the first thumb
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
            <h3>What is the page template?</h3>
          </EuiTitle>

          <EuiSpacer size="m" />

          <EuiFlexGroup>
            <EuiFlexItem>
              <button
                onClick={() => onSelectThumbnail('sidebar')}
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumbBtn',
                  {
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': isSidebar,
                  }
                )}
                aria-label="Select page with sidebar thumbnail"
              >
                <EuiImage
                  alt=""
                  url={isDarkTheme ? darkSidebar : lightSidebar}
                  size="fullWidth"
                />
                {isSidebar && (
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="primary"
                    className="guideDemo__emptyPromptBgPickerCheckMark"
                  />
                )}
              </button>
              <EuiSpacer size="s" />

              <EuiText size="xs">
                <p>Centered content with sidebar</p>
              </EuiText>
            </EuiFlexItem>

            <EuiFlexItem>
              <button
                onClick={() => onSelectThumbnail('empty')}
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumbBtn',
                  {
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': isEmpty,
                  }
                )}
                aria-label="Select empty page thumbnail"
              >
                <EuiImage
                  alt=""
                  url={isDarkTheme ? darkEmpty : lightEmpty}
                  size="fullWidth"
                />
                {isEmpty && (
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="primary"
                    className="guideDemo__emptyPromptBgPickerCheckMark"
                  />
                )}
              </button>
              <EuiSpacer size="s" />

              <EuiText size="xs">
                <p>Centered body</p>
              </EuiText>
            </EuiFlexItem>

            <EuiFlexItem>
              <button
                onClick={() => onSelectThumbnail('multiple')}
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumbBtn',
                  {
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': isMultiple,
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isDisabled': isDisabledMultipleThumb,
                  }
                )}
                aria-label="Select page with multiple panels thumbnail"
                disabled={isDisabledMultipleThumb}
              >
                <EuiImage
                  alt=""
                  url={isDarkTheme ? darkMultiple : lightMultiple}
                  size="fullWidth"
                />
                {isMultiple && (
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="primary"
                    className="guideDemo__emptyPromptBgPickerCheckMark"
                  />
                )}
              </button>
              <EuiSpacer size="s" />

              <EuiText
                size="xs"
                className={classNames({
                  'guideDemo__emptyPromptPanelPickerThumbText-isDisabled': isDisabledMultipleThumb,
                })}
              >
                <p>Default with multiple panels</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>

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
