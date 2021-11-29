import React, { useState } from 'react';
import classNames from 'classnames';
import {
  EuiTitle,
  EuiImage,
  EuiSpacer,
  EuiIcon,
  EuiPanel,
  EuiCode,
  EuiSelect,
  EuiText,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

import pageCenteredContent from '../../images/thumbnail_page-centered-content.svg';
import pageCenteredBody from '../../images/thumbnail_page-centered-body.svg';

export default () => {
  const [isPageCenteredBody, setPageCenteredBody] = useState(false);
  const useCases = [
    'No data',
    'No permission',
    'No results',
    'Error',
    'Error page',
    'Completed tasks',
    'License upgrade',
  ];
  const options = useCases.map((useCase) => {
    const value = useCase.split(' ').join('_').toLowerCase();

    return { value: value, text: useCase };
  });

  const [value, setValue] = useState(options[1].value);

  const errorValue = options[3].value;
  const errorPageValue = options[4].value;

  const basicSelectId = useGeneratedHtmlId({ prefix: 'basicSelect' });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const plainWithBorder = (
    <EuiPanel color="plain" hasBorder>
      <EuiCode>{'color="plain” | hasBorder={true}'}</EuiCode>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <p>
          Use this panel color to make users not getting distracted and focus on
          the content.
        </p>
      </EuiText>
    </EuiPanel>
  );

  const plain = (
    <EuiPanel color="plain" hasBorder>
      <EuiCode>{'color="plain”'}</EuiCode>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <p>
          Use this panel color to make users not getting distracted and focus on
          the content.
        </p>
      </EuiText>
    </EuiPanel>
  );

  const errorAlternative = (
    <EuiPanel color="plain" hasBorder>
      <EuiCode>{'color="danger'}</EuiCode>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <p>Use this panel color to emphasize that an error happened.</p>
      </EuiText>
    </EuiPanel>
  );

  let recommendedPanel;

  if (!isPageCenteredBody && value !== errorValue) {
    recommendedPanel = plainWithBorder;
  }

  if (isPageCenteredBody && value !== errorValue) {
    recommendedPanel = plain;
  }

  if (value === errorValue) {
    recommendedPanel = errorAlternative;
  }

  let errorPanelAlternative;

  if (!isPageCenteredBody && value === errorValue) {
    errorPanelAlternative = plainWithBorder;
  }

  if (isPageCenteredBody && value === errorValue) {
    errorPanelAlternative = plain;
  }

  const errorPagePanelAlternative =
    value === errorPageValue && errorAlternative;

  const standOutPanelAlternatives = isPageCenteredBody ? (
    <EuiPanel color="plain" hasBorder>
      <EuiCode>{'color="primary" | color="accent"'}</EuiCode>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <p>
          Consider any of these alternative if you want to make the empty prompt
          to stand out. For example, if there are other components on the page
          and you want to make users look to the empty prompt first.
        </p>
      </EuiText>
    </EuiPanel>
  ) : (
    <EuiPanel color="plain" hasBorder>
      <EuiCode>{'color="subdued"'}</EuiCode>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <p>
          Consider this alternative if you want to make the empty prompt stand
          out. For example, if there are other components on the page, and you
          want to make users look to the empty prompt first.
        </p>
      </EuiText>
    </EuiPanel>
  );

  const transparentPanelAlternative = (
    <EuiPanel color="plain" hasBorder>
      <EuiCode>{'color="transparent”'}</EuiCode>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <p>
          Consider this alternative if the empty prompt is contained in another
          component.
        </p>
      </EuiText>
    </EuiPanel>
  );

  return (
    <div className="guideDemo__emptyPromptPanelPicker">
      <div className="guideDemo__emptyPromptPanelPickerControls">
        <EuiTitle size="xs">
          <h3>What is the page layout?</h3>
        </EuiTitle>

        <EuiSpacer size="m" />

        <button
          onClick={() => setPageCenteredBody(false)}
          className={classNames('guideDemo__emptyPromptPanelPickerThumbBtn', {
            'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': !isPageCenteredBody,
          })}
          aria-label="Select page centered content template"
        >
          <EuiImage alt="" url={pageCenteredContent} />
          {!isPageCenteredBody && (
            <EuiIcon
              type="checkInCircleFilled"
              color="primary"
              className="guideDemo__emptyPromptPanelPickerCheckMark"
            />
          )}
        </button>

        <button
          onClick={() => setPageCenteredBody(true)}
          className={classNames('guideDemo__emptyPromptPanelPickerThumbBtn', {
            'guideDemo__emptyPromptPanelPickerThumbBtn-isSelected': isPageCenteredBody,
          })}
          aria-label="Select page centered body template"
        >
          <EuiImage alt="" url={pageCenteredBody} />
          {isPageCenteredBody && (
            <EuiIcon
              type="checkInCircleFilled"
              color="primary"
              className="guideDemo__emptyPromptPanelPickerCheckMark"
            />
          )}
        </button>

        <EuiSpacer size="xl" />

        <EuiTitle size="xs">
          <h3>What is the use case?</h3>
        </EuiTitle>

        <EuiSpacer size="m" />

        <EuiSelect
          id={basicSelectId}
          options={options}
          value={value}
          onChange={(e) => onChange(e)}
          aria-label="Select use case"
        />
      </div>
      <div className="guideDemo__emptyPromptPanelPickerPreview">
        <EuiTitle size="xs">
          <h3>Recommend panel color</h3>
        </EuiTitle>

        {recommendedPanel}

        <EuiSpacer size="m" />

        <EuiTitle size="xs">
          <h3>Alternatives </h3>
        </EuiTitle>

        {transparentPanelAlternative}

        {errorPanelAlternative}

        {errorPagePanelAlternative}

        {standOutPanelAlternatives}
      </div>
    </div>
  );
};
