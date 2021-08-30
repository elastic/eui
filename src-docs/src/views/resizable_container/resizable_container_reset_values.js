import React, { useCallback, useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiResizableContainer,
  EuiButton,
  EuiSpacer,
} from '../../../../src/components';
import { fake } from 'faker';
import { htmlIdGenerator } from '../../../../src/services';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

//const firstPanelId = 'resizable-panel__1';
//const secondPanelId = 'resizable-panel__2';
const panelID__1 = htmlIdGenerator('panel')();
const panelID__2 = htmlIdGenerator('panel')();
const stored = localStorage.getItem('resizableContainer');
const storedSizes = stored && JSON.parse(stored);
const defaultSizes = storedSizes || {
  [panelID__1]: 50,
  [panelID__2]: 50,
};

export default () => {
  const [savedSizes, setSavedSizes] = useState(storedSizes);
  const [sizes, setSizes] = useState(defaultSizes);
  const onPanelWidthChange = useCallback((newSizes) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      ...newSizes,
    }));
  }, []);
  const onClickDefault = useCallback(() => setSizes(defaultSizes), []);
  const onClick30x70 = useCallback(
    () =>
      setSizes({
        [panelID__1]: 30,
        [panelID__2]: 70,
      }),
    []
  );
  const onClick80x20 = useCallback(
    () =>
      setSizes({
        [panelID__1]: 80,
        [panelID__2]: 20,
      }),
    []
  );
  const onSaveToLocalStorage = useCallback(() => {
    setSavedSizes(sizes);
    localStorage.setItem('resizableContainer', JSON.stringify(sizes));
  }, [sizes]);

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButton onClick={onClickDefault}>{'Reset to defaults'}</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={onClick30x70}>{'30x70'}</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={onClick80x20}>{'80x20'}</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            fill={savedSizes === sizes}
            iconType={savedSizes === sizes ? 'check' : undefined}
            onClick={onSaveToLocalStorage}>
            {'Store in localStorage'}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiResizableContainer
        style={{ height: '200px' }}
        onPanelWidthChange={onPanelWidthChange}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              id={panelID__1}
              size={sizes[panelID__1]}
              minSize="30%">
              <EuiText>
                <div>{text}</div>
              </EuiText>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              id={panelID__2}
              size={sizes[panelID__2]}
              minSize="200px">
              <EuiText>
                <div>{text}</div>
              </EuiText>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    </>
  );
};
