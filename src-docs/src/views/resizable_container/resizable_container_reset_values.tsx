import React, { useCallback, useState } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiResizableContainer,
  EuiButton,
  EuiSpacer,
  htmlIdGenerator,
} from '../../../../src';
import { faker } from '@faker-js/faker';

const text = (
  <>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
  </>
);

const firstPanelId = htmlIdGenerator('firstPanel')();
const secondPanelId = htmlIdGenerator('secondPanel')();
const stored = localStorage.getItem('resizableContainer');
const storedSizes = stored && JSON.parse(stored);
const defaultSizes = storedSizes || {
  [firstPanelId]: 50,
  [secondPanelId]: 50,
};

export default () => {
  const [savedSizes, setSavedSizes] = useState(storedSizes);
  const [sizes, setSizes] = useState(defaultSizes);
  const onPanelWidthChange = useCallback((newSizes) => {
    setSizes((prevSizes: Record<string, number>) => ({
      ...prevSizes,
      ...newSizes,
    }));
  }, []);
  const onClickDefault = useCallback(() => setSizes(defaultSizes), []);
  const onClick30x70 = useCallback(
    () =>
      setSizes({
        [firstPanelId]: 30,
        [secondPanelId]: 70,
      }),
    []
  );
  const onClick80x20 = useCallback(
    () =>
      setSizes({
        [firstPanelId]: 80,
        [secondPanelId]: 20,
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
            onClick={onSaveToLocalStorage}
          >
            {'Store in localStorage'}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiResizableContainer
        style={{ height: '200px' }}
        onPanelWidthChange={onPanelWidthChange}
      >
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              id={firstPanelId}
              size={sizes[firstPanelId]}
              minSize="30%"
              tabIndex={0}
            >
              <EuiText>
                <div>{text}</div>
              </EuiText>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              id={secondPanelId}
              size={sizes[secondPanelId]}
              minSize="200px"
              tabIndex={0}
            >
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
