import React, { useState } from 'react';

import { EuiListGroup, EuiListGroupItem } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [favorite1, setFavorite1] = useState(undefined);
  const [favorite2, setFavorite2] = useState('link2');
  const [favorite3, setFavorite3] = useState(undefined);
  const [favorite4, setFavorite4] = useState(undefined);

  const listGroupLinkId__1 = useGeneratedHtmlId({
    prefix: 'listGroupLink',
    suffix: 'first',
  });
  const listGroupLinkId__2 = useGeneratedHtmlId({
    prefix: 'listGroupLink',
    suffix: 'second',
  });
  const listGroupLinkId__3 = useGeneratedHtmlId({
    prefix: 'listGroupLink',
    suffix: 'third',
  });
  const listGroupLinkId__4 = useGeneratedHtmlId({
    prefix: 'listGroupLink',
    suffix: 'fourth',
  });
  const listGroupLinkId__5 = useGeneratedHtmlId({
    prefix: 'listGroupLink',
    suffix: 'fifth',
  });

  const link1Clicked = () => {
    setFavorite1(favorite1 === 'link1' ? undefined : 'link1');
    if (favorite1 === undefined) {
      document.activeElement.blur();
    }
  };

  const link2Clicked = () => {
    setFavorite2(favorite2 === 'link2' ? undefined : 'link2');
    if (favorite2 === undefined) {
      document.activeElement.blur();
    }
  };

  const link3Clicked = () => {
    setFavorite3(favorite3 === 'link3' ? undefined : 'link3');
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  const link4Clicked = () => {
    setFavorite4(favorite4 === 'link4' ? undefined : 'link4');
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  return (
    <EuiListGroup maxWidth={288}>
      <EuiListGroupItem
        id={listGroupLinkId__1}
        iconType="bullseye"
        label="EUI button link"
        onClick={() => {}}
        isActive
        extraAction={{
          color: 'text',
          onClick: link1Clicked,
          iconType: favorite1 === 'link1' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link1',
          alwaysShow: favorite1 === 'link1',
        }}
      />

      <EuiListGroupItem
        id={listGroupLinkId__2}
        iconType="visualizeApp"
        onClick={() => {}}
        label="EUI button link"
        extraAction={{
          color: 'text',
          onClick: link2Clicked,
          iconType: favorite2 === 'link2' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link2',
          alwaysShow: favorite2 === 'link2',
        }}
      />

      <EuiListGroupItem
        id={listGroupLinkId__3}
        iconType="lensApp"
        iconProps={{ color: 'default' }}
        onClick={() => {}}
        label="EUI button link"
        extraAction={{
          color: 'text',
          onClick: link3Clicked,
          iconType: favorite3 === 'link3' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link3',
          alwaysShow: favorite3 === 'link3',
        }}
      />

      <EuiListGroupItem
        id={listGroupLinkId__4}
        onClick={() => {}}
        iconType="broom"
        label="EUI button link"
        extraAction={{
          color: 'text',
          onClick: link4Clicked,
          iconType: favorite4 === 'link4' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
          alwaysShow: favorite3 === 'link4',
          isDisabled: true,
        }}
      />

      <EuiListGroupItem
        id={listGroupLinkId__5}
        iconType="brush"
        isDisabled
        label="EUI button link"
        extraAction={{
          color: 'text',
          onClick: () => {},
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
        }}
      />
    </EuiListGroup>
  );
};
