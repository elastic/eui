import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../components/with_theme';

import {
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiButtonGroup,
} from '../../../../src/components';

const text = [
  <h1 key={0}>This is Heading One</h1>,

  <p key={1}>
    Far out in the uncharted backwaters of the unfashionable end of the western
    spiral arm of the Galaxy lies a small unregarded yellow sun.
  </p>,

  <pre key={0.25}>
    <code>const completelyUnexpected = &quot;the audacity!&quot;;</code>
  </pre>,

  <h2 key={0.5}>This is Heading Two</h2>,

  <p key={2}>
    Orbiting this at a distance of roughly ninety-two million miles is an
    utterly insignificant little blue green planet whose ape- descended life
    forms are so amazingly primitive that they still think digital watches are a
    pretty neat idea.
  </p>,

  <ul key={3}>
    <li>List item one</li>
    <li>List item two</li>
    <li>Dolphins</li>
  </ul>,

  <p key={4}>
    This planet has - or rather had - a problem, which was this: most of the
    people living on it were unhappy for pretty much of the time. Many solutions
    were suggested for this problem, but most of these were largely concerned
    with the movements of small green pieces of paper, which is odd because on
    the whole it was not the small green pieces of paper that were unhappy.
  </p>,

  <h3 key={5}>This is Heading Three</h3>,

  <ol key={6}>
    <li>Number one</li>
    <li>Number two</li>
    <li>Dolphins again</li>
  </ol>,

  <p key={7}>
    But the dog wasn&rsquo;t lazy, it was just practicing mindfulness, so it had
    a greater sense of life-satisfaction than that fox with all its silly
    jumping.
  </p>,

  <p key={8}>
    And from the fox&rsquo;s perspective, life was full of hoops to jump{' '}
    <em>through</em>, low-hanging fruit to jump <em>for</em>, and dead car
    batteries to jump-<em>start</em>.
  </p>,

  <h4 key={9}>This is Heading Four</h4>,

  <p key={10}>
    So it thought the dog was making a poor life choice by focusing so much on
    mindfulness. What if its car broke down?
  </p>,

  <h5 key={11}>This is Heading Five</h5>,

  <p key={12}>
    <small>
      So it thought the dog was making a poor life choice by focusing so much on
      mindfulness. What if its car broke down?
    </small>
  </p>,

  <h6 key={13}>This is Heading Six</h6>,
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const textSizeArray = ['xs', 's', 'm'];
  const textSizeNamesArray = ['Extra small', 'Small', 'Medium'];

  const textSizeOptions = textSizeArray.map((name, i) => {
    return {
      value: name,
      label: textSizeNamesArray[i],
    };
  });

  const firstOptions = textSizeOptions.map((option) => {
    return {
      id: `first${option.value}`,
      ...option,
    };
  });

  const secondOptions = textSizeOptions.map((option) => {
    return {
      id: `second${option.value}`,
      ...option,
    };
  });

  const [firstIdSelected, setFirstIdSelected] = useState('firsts');
  const [secondIdSelected, setSecondIdSelected] = useState('secondxs');
  const [firstSize, setFirstSize] = useState('s');
  const [secondSize, setSecondSize] = useState('xs');

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButtonGroup
            isFullWidth
            legend={'First text size'}
            name={'first'}
            idSelected={firstIdSelected}
            onChange={(optionId) => {
              setFirstIdSelected(optionId);
              setFirstSize(
                firstOptions.find(({ id }) => id === optionId).value
              );
            }}
            options={firstOptions}
          />
          <EuiHorizontalRule />
          <EuiText
            className={`guideDemo__textLines guideDemo__textLines--${themeContext.theme}`}
            size={firstSize}
          >
            {text}
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButtonGroup
            isFullWidth
            legend={'Second text size'}
            name={'second'}
            idSelected={secondIdSelected}
            onChange={(optionId) => {
              setSecondIdSelected(optionId);
              setSecondSize(
                secondOptions.find(({ id }) => id === optionId).value
              );
            }}
            options={secondOptions}
          />
          <EuiHorizontalRule />
          <EuiText
            className={`guideDemo__textLines guideDemo__textLines--${themeContext.theme}`}
            size={secondSize}
          >
            {text}
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
