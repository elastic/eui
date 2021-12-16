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
} from '../../../../src/components';
import { ThemeContext } from '../../components/with_theme';
import { recommendedObj } from './_panel_color_picker_recommended';
import { useCasesObj } from './_panel_color_picker_use_cases';

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

  const onSelectThumbnail = (thumbnailName: string) => {
    setThumbnail(thumbnailName);
  };

  const isSidebar = thumbnail === 'sidebar';
  const isEmpty = thumbnail === 'empty';
  const isMultiple = thumbnail === 'multiple';

  const isPageSubdued = thumbnail === 'empty';

  const onChangeUseCase = (id: EuiRadioGroupOption['id']) => {
    setRadioUseCaseId(id);
  };

  const getRecommendedText = (obj: any) => (
    <EuiText size="s">{obj.text}</EuiText>
  );

  const [visibleRecommendedText, setVisibleRecommendedText] = useState(
    getRecommendedText(recommendedObj.subdued)
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
  }, [
    isPageSubdued,
    radioUseCaseId,
    errorValue,
    isSidebar,
    isEmpty,
    isMultiple,
  ]);

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

  const code = reactElementToJSXString(euiEmptyPromptPreview);

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
            <h3>What is the type of page?</h3>
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
                <p>Page with sidebar</p>
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
                <p>Empty page</p>
              </EuiText>
            </EuiFlexItem>

            <EuiFlexItem>
              <button
                onClick={() => onSelectThumbnail('multiple')}
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumbBtn',
                  {
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': isMultiple,
                  }
                )}
                aria-label="Select page with multiple panels thumbnail"
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

              <EuiText size="xs">
                <p>Page with multiple panels</p>
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
        demo={euiEmptyPromptPreview}
        demoPanelProps={{ color: isPageSubdued ? 'subdued' : 'transparent' }}
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
