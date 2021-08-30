import React, { useState } from 'react';

import { EuiListGroup, EuiListGroupItem } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [linkID__1] = useState(htmlIdGenerator('link')());
  const [linkID__2] = useState(htmlIdGenerator('link')());
  const [linkID__3] = useState(htmlIdGenerator('link')());
  const [linkID__4] = useState(htmlIdGenerator('link')());
  const [linkID__5] = useState(htmlIdGenerator('link')());

  const [favorite1, setFavorite1] = useState(undefined);
  const [favorite2, setFavorite2] = useState(linkID__2);
  const [favorite3, setFavorite3] = useState(undefined);
  const [favorite4, setFavorite4] = useState(undefined);

  const link1Clicked = () => {
    setFavorite1(favorite1 === linkID__1 ? undefined : linkID__1);
    if (favorite1 === undefined) {
      document.activeElement.blur();
    }
  };

  const link2Clicked = () => {
    setFavorite2(favorite2 === linkID__2 ? undefined : linkID__2);
    if (favorite2 === undefined) {
      document.activeElement.blur();
    }
  };

  const link3Clicked = () => {
    setFavorite3(favorite3 === linkID__3 ? undefined : linkID__3);
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  const link4Clicked = () => {
    setFavorite4(favorite4 === linkID__4 ? undefined : linkID__4);
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  return (
    <EuiListGroup maxWidth={288}>
      <EuiListGroupItem
        id={linkID__1}
        iconType="bullseye"
        label="EUI button link"
        onClick={() => {}}
        isActive
        extraAction={{
          color: 'subdued',
          onClick: link1Clicked,
          iconType: favorite1 === linkID__1 ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link1',
          alwaysShow: favorite1 === linkID__1,
        }}
      />

      <EuiListGroupItem
        id={linkID__2}
        iconType="visualizeApp"
        onClick={() => {}}
        label="EUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link2Clicked,
          iconType: favorite2 === linkID__2 ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link2',
          alwaysShow: favorite2 === linkID__2,
        }}
      />

      <EuiListGroupItem
        id={linkID__3}
        iconType="lensApp"
        iconProps={{ color: 'default' }}
        onClick={() => {}}
        label="EUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link3Clicked,
          iconType: favorite3 === linkID__3 ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link3',
          alwaysShow: favorite3 === linkID__3,
        }}
      />

      <EuiListGroupItem
        id={linkID__4}
        onClick={() => {}}
        iconType="broom"
        label="EUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link4Clicked,
          iconType: favorite4 === linkID__4 ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
          alwaysShow: favorite3 === linkID__4,
          isDisabled: true,
        }}
      />

      <EuiListGroupItem
        id={linkID__5}
        iconType="brush"
        isDisabled
        label="EUI button link"
        extraAction={{
          color: 'subdued',
          onClick: () => {},
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
        }}
      />
    </EuiListGroup>
  );
};
