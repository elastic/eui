/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import createCache from '@emotion/cache';

import { EuiProvider } from './provider';
import { EuiThemeLegacy } from '../../themes/legacy/theme';

describe('EuiProvider', () => {
  it('is rendered', () => {
    const component = shallow(<EuiProvider />);

    expect(component).toMatchSnapshot();
  });

  describe('using `null` theme option', () => {
    it('does not add global styles', () => {
      const component = shallow(<EuiProvider theme={null} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('providing an @emotion cache config', () => {
    const emotionCache = createCache({
      key: 'testing',
    });
    it('applies the cache to global styles', () => {
      const component = shallow(<EuiProvider cache={emotionCache} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('changing themes', () => {
    it('propagates `theme`', () => {
      const component = shallow(<EuiProvider theme={EuiThemeLegacy} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('changing color modes', () => {
    it('propagates `colorMode`', () => {
      const component = shallow(<EuiProvider colorMode="dark" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('applying modifications', () => {
    it('propagates `modify`', () => {
      const component = shallow(
        <EuiProvider
          modify={{
            colors: {
              LIGHT: { lightShade: '#d3e6df' },
              DARK: { lightShade: '#394c4b' },
            },
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
