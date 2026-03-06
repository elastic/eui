/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';
import { EuiMarkdownFormat } from '../../index';

describe('remarkIntrawordUnderscore', () => {
  it('preserves identifiers with double underscores as plain text', () => {
    const { container } = render(
      <EuiMarkdownFormat>
        {`ABDC__AppleBanana__c
          ABDC__MangoKiwi__c
          ABDC__PineappleCherry__c`}
      </EuiMarkdownFormat>
    );

    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('ABDC__AppleBanana__c');
    expect(container).toHaveTextContent('ABDC__MangoKiwi__c');
    expect(container).toHaveTextContent('ABDC__PineappleCherry__c');
  });

  it('preserves identifiers with single underscores as plain text', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'some_variable_name'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('em')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('some_variable_name');
  });

  it('still applies bold for standalone double underscores', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'__bold text__'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('strong')).toHaveTextContent('bold text');
  });

  it('still applies emphasis for standalone single underscores', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'_italic text_'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('em')).toHaveTextContent('italic text');
  });

  it('handles multiple identifiers in a sentence', () => {
    const { container } = render(
      <EuiMarkdownFormat>
        {'Fields ABDC__AppleBanana__c and ABDC__MangoKiwi__c are required'}
      </EuiMarkdownFormat>
    );

    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(container).toHaveTextContent(
      'Fields ABDC__AppleBanana__c and ABDC__MangoKiwi__c are required'
    );
  });
});
