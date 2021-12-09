import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  EuiTitle,
  EuiImage,
  EuiSpacer,
  EuiIcon,
  EuiCode,
  EuiText,
  EuiFormFieldset,
  EuiCheckableCard,
  EuiRadioGroup,
  EuiEmptyPrompt,
  EuiSplitPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiRadioGroupOption,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';
import pageCenteredContent from '../../images/thumbnail_page-centered-content.svg';
import pageCenteredBody from '../../images/thumbnail_page-centered-body.svg';
import { recommendedObj } from './_panel_color_picker_recommended';
import { useCasesObj } from './_panel_color_picker_use_cases';

export default () => {
  const useCasesOptions: any = Object.values(useCasesObj);

  const errorValue = useCasesObj.error.id;
  const errorPageValue = useCasesObj.errorPage.id;
  const [radioUseCaseId, setRadioUseCaseId] = useState<
    EuiRadioGroupOption['id']
  >(useCasesObj.noData.id);
  const radioGroupId = useGeneratedHtmlId({ prefix: 'radioGroup' });
  const [recommendedId, setRecommendedId] = useState('plainWithBorder');
  const [panelProps, setPanelProps] = useState({ color: 'plain' });
  const [pageBgColor, setPageBgColor] = useState('white');

  const onChangeBgColor = (pageBgColor: string) => {
    setPageBgColor(pageBgColor);
  };

  const isPageSubdued = pageBgColor === 'subdued';

  const onChangeUseCase = (id: EuiRadioGroupOption['id']) => {
    setRadioUseCaseId(id);

    // when use case changes and the recommendedId is set to `alternativeError`
    // we want to adjust the card recommendedId to the first card on the list
    if (!isPageSubdued && recommendedId === 'alternativeError') {
      setRecommendedId('plainWithBorder');
    } else if (isPageSubdued && recommendedId === 'alternativeError') {
      setRecommendedId('plain');
    }

    // when use case changes to error and the current recommended card is `plain` or `plainWithBorder`
    // we want to set the recommended card to `errorPanel`
    if (id === 'error' && recommendedId === 'plain') {
      setRecommendedId('errorPanel');
    } else if (id === 'error' && recommendedId === 'plainWithBorder') {
      setRecommendedId('errorPanel');
    }

    // when use case changes from error to other use case and the current recommended card is `errorPanel`
    // we want to set the recommended card to `plain` or `plainWithBorder`
    if (id !== 'error' && !isPageSubdued && recommendedId === 'errorPanel') {
      setRecommendedId('plainWithBorder');
    } else if (
      id !== 'error' &&
      isPageSubdued &&
      recommendedId === 'errorPanel'
    ) {
      setRecommendedId('plain');
    }
  };

  const card = (obj: any) => (
    <EuiCheckableCard
      id={obj.id}
      label={
        <>
          <EuiCode>{obj.code}</EuiCode>
          <EuiSpacer size="m" />
          <EuiText size="s">{obj.text}</EuiText>
        </>
      }
      name={radioGroupId}
      value={obj.id}
      checked={recommendedId === obj.id}
      onChange={() => setRecommendedId(obj.id)}
    />
  );

  const [visibleRecommendedCard, setVisibleRecommendedCard] = useState(
    card(recommendedObj.plainWithBorder)
  );

  // the `visibleAlternativeErrorCard` only exist for the error page so we don't show when the page renders
  const [
    visibleAlternativeErrorCard,
    setVisibleAlternativeErrorCard,
  ] = useState<any>(null);
  const [
    visibleAlternativeStandOutCard,
    setVisibleAlternativeStandOutCard,
  ] = useState(card(recommendedObj.standOutSubdued));

  // exists for all use cases
  const visibleAlternativeTransparentCard = card(
    recommendedObj.alternativeTransparent
  );

  useEffect(() => {
    // Some scenarios varies according to the bg color,
    // So we need to adjust them according to the bg color and the current recommendedId ID
    if (!isPageSubdued && recommendedId === 'plain') {
      setRecommendedId('plainWithBorder');
    } else if (isPageSubdued && recommendedId === 'plainWithBorder') {
      setRecommendedId('plain');
    } else if (!isPageSubdued && recommendedId === 'standOutColored') {
      setRecommendedId('standOutSubdued');
    } else if (isPageSubdued && recommendedId === 'standOutSubdued') {
      setRecommendedId('standOutColored');
    }

    // we want to show the following recommendedId cards according to the page bg and if is or it is not an error panel
    if (!isPageSubdued && radioUseCaseId !== errorValue) {
      setVisibleRecommendedCard(card(recommendedObj.plainWithBorder));
    } else if (isPageSubdued && radioUseCaseId !== errorValue) {
      setVisibleRecommendedCard(card(recommendedObj.plain));
    } else {
      setVisibleRecommendedCard(card(recommendedObj.errorPanel));
    }

    // visibleAlternative stand out cards
    if (isPageSubdued) {
      setVisibleAlternativeStandOutCard(card(recommendedObj.standOutColored));
    } else if (!isPageSubdued) {
      setVisibleAlternativeStandOutCard(card(recommendedObj.standOutSubdued));
    }

    // visibleAlternative error card
    if (radioUseCaseId === errorPageValue) {
      setVisibleAlternativeErrorCard(card(recommendedObj.alternativeError));
    } else {
      // if is not an error page it disappears
      setVisibleAlternativeErrorCard(null);
    }

    setPanelProps(recommendedObj[recommendedId].props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageSubdued, radioUseCaseId, errorValue, recommendedId]);

  const currentUseCaseObj: any = useCasesObj[radioUseCaseId];

  const euiEmptyPromptPreview = (
    <EuiEmptyPrompt
      iconType={currentUseCaseObj?.iconType}
      title={currentUseCaseObj.title}
      body={currentUseCaseObj?.body}
      actions={currentUseCaseObj?.actions}
      {...(panelProps as any)}
    />
  );

  return (
    <>
      <EuiSplitPanel.Outer direction="row">
        <EuiSplitPanel.Inner color="subdued">
          <EuiTitle size="xs">
            <h3>What is the page background?</h3>
          </EuiTitle>

          <EuiSpacer size="m" />

          <EuiFlexGroup>
            <EuiFlexItem>
              <button
                onClick={() => onChangeBgColor('plain')}
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumbBtn',
                  {
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': !isPageSubdued,
                  }
                )}
                aria-label="Select page centered content template"
              >
                <EuiImage alt="" url={pageCenteredContent} size="fullWidth" />
                {!isPageSubdued && (
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="primary"
                    className="guideDemo__emptyPromptBgPickerCheckMark"
                  />
                )}
              </button>
              <EuiSpacer size="xs" />
              <p>White</p>
            </EuiFlexItem>

            <EuiFlexItem>
              <button
                onClick={() => onChangeBgColor('subdued')}
                className={classNames(
                  'guideDemo__emptyPromptPanelPickerThumbBtn',
                  {
                    'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': isPageSubdued,
                  }
                )}
                aria-label="Select page centered body template"
              >
                <EuiImage alt="" url={pageCenteredBody} size="fullWidth" />
                {isPageSubdued && (
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="primary"
                    className="guideDemo__emptyPromptBgPickerCheckMark"
                  />
                )}
              </button>
              <EuiSpacer size="xs" />
              <p>Subdued</p>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="xl" />

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

          <div className="guideDemo__emptyPromptRecommendCards">
            <EuiTitle size="xs">
              <h3>Recommend panel color</h3>
            </EuiTitle>

            <EuiSpacer size="s" />

            {visibleRecommendedCard}

            <EuiSpacer size="m" />

            <EuiFormFieldset
              legend={{
                children: (
                  <>
                    <EuiTitle size="xs">
                      <h3>Alternatives</h3>
                    </EuiTitle>
                  </>
                ),
              }}
            >
              {visibleAlternativeTransparentCard}

              {visibleAlternativeErrorCard}

              {visibleAlternativeStandOutCard}
            </EuiFormFieldset>
          </div>
        </EuiSplitPanel.Inner>

        <EuiSplitPanel.Inner color={isPageSubdued ? 'subdued' : 'transparent'}>
          {euiEmptyPromptPreview}
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </>
  );
};
