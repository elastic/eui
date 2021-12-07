import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  EuiTitle,
  EuiImage,
  EuiSpacer,
  EuiButton,
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

export default () => {
  const [isPageSubdued, setPageSubdued] = useState(false);
  const useCases = [
    'No data',
    'No permission',
    'No results',
    'Error',
    'Error page',
    'Completed tasks',
    'License upgrade',
  ];
  const useCasesOptions = useCases.map((useCase) => {
    const id = useCase.split(' ').join('_').toLowerCase();

    return { label: useCase, id: id };
  });

  const errorValue = useCasesOptions[3].id;
  const errorPageValue = useCasesOptions[4].id;
  const [radioUseCaseIdSelected, setRadioUseCaseIdSelected] = useState<
    EuiRadioGroupOption['id']
  >(useCasesOptions[0].id);
  const radioGroupId = useGeneratedHtmlId({ prefix: 'radioGroup' });
  const [recommended, setRecommended] = useState('plainWithBorder');
  const [panelProps, setPanelProps] = useState({ color: 'plain' });

  const recommendedObj: any = {
    plainWithBorder: {
      id: 'plainWithBorder',
      code: 'color="plain” | hasBorder={true}',
      text: (
        <p>
          Use this panel color to make users not getting distracted and focus on
          the content.
        </p>
      ),
      props: { color: 'plain', hasBorder: true },
    },
    plain: {
      id: 'plain',
      code: 'color="plain”',
      text: (
        <p>
          Use this panel color to make users not getting distracted and focus on
          the content.
        </p>
      ),
      props: { color: 'plain' },
    },
    errorPanel: {
      id: 'errorPanel',
      code: 'color="error"',
      text: <p>Use this panel color to emphasize that an error happened.</p>,
      props: { color: 'danger' },
    },
    standOutSubdued: {
      id: 'standOutSubdued',
      code: 'color="subdued"',
      text: (
        <p>
          Consider this alternative if you want to make the empty prompt stand
          out. For example, if there are other components on the page, and you
          want to make users look to the empty prompt first.
        </p>
      ),
      props: { color: 'subdued' },
    },
    standOutColored: {
      id: 'standOutColored',
      code: 'color="primary" | color="accent"',
      text: (
        <p>
          Consider any of these alternative if you want to make the empty prompt
          to stand out. For example, if there are other components on the page
          and you want to make users look to the empty prompt first.
        </p>
      ),
      props: { color: 'primary' },
    },
    errorPage: {
      id: 'errorPage',
      code: 'color="error"',
      text: <p>Use this panel color to emphasize that an error happened.</p>,
      props: { color: 'error' },
    },
    transparentPanelAlternative: {
      id: 'transparentPanelAlternative',
      code: 'color="transparent”"',
      text: (
        <p>
          Consider this alternative if the empty prompt is contained in another
          component.
        </p>
      ),
      props: { color: 'error' },
    },
  };

  const onChangePageBackground = (color: string) => {
    setPanelProps(recommendedObj[recommended].props);
    return color === 'subdued' ? setPageSubdued(true) : setPageSubdued(false);
  };

  const onChangeUseCase = (id: EuiRadioGroupOption['id']) => {
    setRadioUseCaseIdSelected(id);
    setPanelProps(recommendedObj[recommended].props);
  };

  useEffect(() => {
    if (!isPageSubdued && recommended === 'plain') {
      setRecommended('plainWithBorder');
    } else if (isPageSubdued && recommended === 'plainWithBorder') {
      setRecommended('plain');
    } else if (isPageSubdued && recommended === 'standOutSubdued') {
      setRecommended('standOutColored');
    } else if (!isPageSubdued && recommended === 'standOutColored') {
      setRecommended('standOutSubdued');
    }

    setPanelProps(recommendedObj[recommended].props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageSubdued, radioUseCaseIdSelected, errorValue, recommended]);

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
      checked={recommended === obj.id}
      onChange={() => setRecommended(obj.id)}
    />
  );

  let recommendedCard;

  if (!isPageSubdued && radioUseCaseIdSelected !== errorValue) {
    recommendedCard = card(recommendedObj.plainWithBorder);
  } else if (isPageSubdued && radioUseCaseIdSelected !== errorValue) {
    recommendedCard = card(recommendedObj.plain);
  } else {
    recommendedCard = card(recommendedObj.errorPanel);
  }

  const errorPagePanelAlternative =
    radioUseCaseIdSelected === errorPageValue && card(recommendedObj.errorPage);

  const standOutPanelAlternatives = isPageSubdued
    ? card(recommendedObj.standOutColored)
    : card(recommendedObj.standOutSubdued);

  const transparentPanelAlternative = card(
    recommendedObj.transparentPanelAlternative
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
                onClick={() => onChangePageBackground('plain')}
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
                onClick={() => onChangePageBackground('subdued')}
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
            idSelected={radioUseCaseIdSelected}
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

            {recommendedCard}

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
              {transparentPanelAlternative}

              {errorPagePanelAlternative}

              {standOutPanelAlternatives}
            </EuiFormFieldset>
          </div>
        </EuiSplitPanel.Inner>

        <EuiSplitPanel.Inner color={isPageSubdued ? 'subdued' : 'transparent'}>
          <EuiEmptyPrompt
            iconType="logoSecurity"
            title={<h2>Start adding cases</h2>}
            body={
              <p>
                There are no cases to display. Add a new case or change your
                filter settings.
              </p>
            }
            actions={
              <EuiButton color="primary" fill>
                Add a case
              </EuiButton>
            }
            {...(panelProps as any)}
          />
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </>
  );
};
