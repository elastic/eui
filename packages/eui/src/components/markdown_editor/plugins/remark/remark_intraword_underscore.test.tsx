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

  it('preserves trailing double underscores as plain text', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'Mango__Kiwi__'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('Mango__Kiwi__');
  });

  it('preserves leading double underscores as plain text', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'__Mango__Kiwi'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('__Mango__Kiwi');
  });

  it('preserves trailing single underscores as plain text', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'Mango_Kiwi_'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('em')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('Mango_Kiwi_');
  });

  it('preserves mixed double/single trailing underscores as plain text', () => {
    const { container } = render(
      <EuiMarkdownFormat>{'Mango__Kiwi_'}</EuiMarkdownFormat>
    );

    expect(container.querySelector('em')).not.toBeInTheDocument();
    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('Mango__Kiwi_');
  });

  it('handles edge-case identifiers mixed in a sentence', () => {
    const { container } = render(
      <EuiMarkdownFormat>
        {'Check __Mango__Kiwi and Mango__Kiwi__ fields'}
      </EuiMarkdownFormat>
    );

    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(container).toHaveTextContent(
      'Check __Mango__Kiwi and Mango__Kiwi__ fields'
    );
  });
});
