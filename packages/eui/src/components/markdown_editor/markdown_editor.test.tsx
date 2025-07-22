/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render, screen } from '../../test/rtl';

import { EuiMarkdownEditor } from './markdown_editor';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import MarkdownActions from './markdown_actions';
import { getDefaultEuiMarkdownPlugins } from './plugins/markdown_default_plugins';

describe('EuiMarkdownEditor', () => {
  shouldRenderCustomStyles(
    <EuiMarkdownEditor
      {...requiredProps}
      onChange={() => {}}
      value="Test"
      initialViewMode="viewing"
    />,
    { childProps: ['markdownFormatProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiMarkdownEditor
        editorId="editorId"
        placeholder="placeholder"
        value=""
        onChange={() => null}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('height', () => {
      test('is rendered with a custom size', () => {
        const { container } = render(
          <EuiMarkdownEditor
            editorId="editorId"
            height={400}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered in full mode', () => {
        const { container } = render(
          <EuiMarkdownEditor
            editorId="editorId"
            height="full"
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('maxHeight', () => {
      test('is rendered with a custom size', () => {
        const { container } = render(
          <EuiMarkdownEditor
            editorId="editorId"
            maxHeight={600}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('autoExpandPreview', () => {
      test('is rendered with false', () => {
        const { container } = render(
          <EuiMarkdownEditor
            editorId="editorId"
            autoExpandPreview={false}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('readOnly', () => {
      test('is set to true', () => {
        const { container } = render(
          <EuiMarkdownEditor
            editorId="editorId"
            autoExpandPreview={false}
            value=""
            onChange={() => null}
            readOnly
            {...requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  test('is preview rendered', () => {
    const { container, getByRole } = render(
      <EuiMarkdownEditor
        editorId="editorId"
        value="## Hello world"
        onChange={() => null}
        {...requiredProps}
      />
    );
    fireEvent.click(getByRole('button', { name: 'Preview' }));
    expect(
      container.querySelector('.euiText.euiMarkdownFormat')?.querySelector('h2')
    ).toHaveTextContent('Hello world');
  });

  test('modal with help syntax is rendered', () => {
    const { baseElement } = render(
      <EuiMarkdownEditor
        editorId="editorId"
        value=""
        onChange={() => null}
        {...requiredProps}
      />
    );
    expect(baseElement.querySelector('.euiModal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Show markdown help'));

    expect(baseElement.querySelector('.euiModal')).toBeInTheDocument();
  });

  test('custom plugins are excluded and popover is rendered', () => {
    const { parsingPlugins, processingPlugins, uiPlugins } =
      getDefaultEuiMarkdownPlugins({ exclude: ['tooltip'] });

    const { baseElement } = render(
      <EuiMarkdownEditor
        editorId="editorId"
        value=""
        onChange={() => null}
        parsingPluginList={parsingPlugins}
        processingPluginList={processingPlugins}
        uiPlugins={uiPlugins}
        {...requiredProps}
      />
    );
    fireEvent.click(screen.getByLabelText('Show markdown help'));

    expect(baseElement.querySelector('.euiModal')).not.toBeInTheDocument();
    expect(baseElement.querySelector('.euiPopover')).toBeInTheDocument();
  });

  test('fires onChange on text area change', () => {
    const testProps = {
      editorId: 'editorId',
      value: 'Hello',
      onChange: jest.fn(),
    };

    render(<EuiMarkdownEditor {...testProps} {...requiredProps} />);

    const event = { target: { value: 'sometext' } };
    fireEvent.change(
      screen.getByTestSubject('euiMarkdownEditorTextArea'),
      event
    );

    expect(testProps.onChange).toHaveBeenCalledTimes(1);
    expect(testProps.onChange).toHaveBeenLastCalledWith(event.target.value);
  });

  describe('render markdown error', () => {
    test('fires onParse with messages if there is an error in markdown', () => {
      const testMessage = [
        {
          message: 'No tooltip text found',
          name: '1:18',
          reason: 'No tooltip text found',
          line: 1,
          column: 18,
          location: { start: expect.any(Object), end: expect.any(Object) },
          source: null,
          ruleId: null,
          fatal: null,
        },
      ];
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello]()}',
        onChange: jest.fn(),
        onParse: jest.fn(),
      };

      render(<EuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(testProps.onParse).toHaveBeenCalledTimes(1);
      expect(testProps.onParse).toHaveBeenCalledWith(null, {
        ast: expect.anything(),
        messages: testMessage,
      });
    });

    test('render error if markdown has error', () => {
      const testMessage = [
        {
          message: 'No tooltip text found',
          name: '1:18',
          reason: 'No tooltip text found',
        },
      ];
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello]()}',
        onChange: jest.fn(),
        errors: testMessage,
      };

      render(<EuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(screen.getByLabelText('Show errors')).toBeInTheDocument();
    });

    test('does not render error if error messages are empty', () => {
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello](hello)}',
        onChange: jest.fn(),
        errors: [],
      };

      render(<EuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(screen.queryByTestSubject('Show errors')).not.toBeInTheDocument();
    });
  });

  describe('markdown actions', () => {
    const toolbarPlugins = [MarkdownTooltip.plugin];
    const markdownActions = new MarkdownActions('editorId', toolbarPlugins);

    it('do calls apply style for a correct plugin with immediate formatting', () => {
      markdownActions.applyStyle = jest.fn();
      markdownActions.do('mdBold');

      expect(markdownActions.applyStyle).toHaveBeenCalledTimes(1);
    });
  });

  describe('toolbar actions', () => {
    const testProps = {
      editorId: 'editorId',
      value: 'Hello',
      onChange: jest.fn(),
    };

    const getElementByIdSpy = jest.spyOn(document, 'getElementById');
    const execCommandMock = jest.fn();
    document.execCommand = execCommandMock;

    beforeEach(() => {
      render(<EuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByTestSubject(
        'euiMarkdownEditorTextArea'
      ) as HTMLTextAreaElement;
      textarea.setSelectionRange(0, 5);

      getElementByIdSpy.mockReturnValue(textarea);
      execCommandMock.mockReturnValue(true);
      jest.clearAllMocks();
    });

    it('bold selected text on bold icon click', () => {
      fireEvent.click(screen.getByLabelText('Bold'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `**${testProps.value}**`
      );
    });

    it('italicize selected text on italic icon click', () => {
      fireEvent.click(screen.getByLabelText('Italic'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `_${testProps.value}_`
      );
    });

    it('convert selected text to unordered list on unordered list icon click', () => {
      fireEvent.click(screen.getByLabelText('Unordered list'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `- ${testProps.value}`
      );
    });

    it('convert selected text to ordered list on ordered list icon click', () => {
      fireEvent.click(screen.getByLabelText('Ordered list'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `1. ${testProps.value}`
      );
    });

    it('convert selected text task list on tasklist icon click', () => {
      fireEvent.click(screen.getByLabelText('Task list'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `- [ ] ${testProps.value}`
      );
    });

    it('convert selected text to quote on quote icon click', () => {
      fireEvent.click(screen.getByLabelText('Quote'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `> ${testProps.value}`
      );
    });

    it('convert selected text to code on code icon click', () => {
      fireEvent.click(screen.getByLabelText('Code'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `\`${testProps.value}\``
      );
    });

    it('selected text will have a tooltip on tooltip icon click', () => {
      fireEvent.click(screen.getByLabelText('Tooltip'));
      expect(getElementByIdSpy).toHaveBeenCalledWith(testProps.editorId);
      expect(execCommandMock).toHaveBeenCalledWith(
        'insertText',
        false,
        `!{tooltip[${testProps.value}]()}`
      );
    });
  });
  describe('toolbar props', () => {
    it('shows the custom toolbar component when passed', () => {
      const CustomToolbarComponent = () => <div>Custom toolbar</div>;
      render(
        <EuiMarkdownEditor
          onChange={() => null}
          value="markdown test"
          {...requiredProps}
          toolbarProps={{ right: <CustomToolbarComponent /> }}
        />
      );
      expect(screen.getByText('Custom toolbar')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Preview' })
      ).not.toBeInTheDocument();
      cleanup();
      render(
        <EuiMarkdownEditor
          onChange={() => null}
          value="markdown test"
          {...requiredProps}
        />
      );
      expect(screen.queryByText('Custom toolbar')).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Preview' })
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Preview' }));
      expect(
        screen.getByRole('button', { name: 'Editor' })
      ).toBeInTheDocument();
    });
  });
  it('should show footer by default and hide when showFooter is false', () => {
    render(
      <EuiMarkdownEditor
        onChange={() => null}
        value="markdown test"
        {...requiredProps}
      />
    );
    expect(
      screen.getByTestSubject('euiMarkdownEditorFooter')
    ).toBeInTheDocument();
    cleanup();
    render(
      <EuiMarkdownEditor
        onChange={() => null}
        value="markdown test"
        {...requiredProps}
        showFooter={false}
      />
    );
    expect(
      screen.queryByTestSubject('euiMarkdownEditorFooter')
    ).not.toBeInTheDocument();
  });
});
