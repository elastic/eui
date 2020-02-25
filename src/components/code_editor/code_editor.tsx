import React, { Component, AriaAttributes, KeyboardEventHandler } from 'react';
import classNames from 'classnames';
import AceEditor, { IAceEditorProps } from 'react-ace';

import { htmlIdGenerator, keyCodes } from '../../services';
import { EuiI18n } from '../i18n';

const DEFAULT_MODE = 'text';

function setOrRemoveAttribute(
  element: HTMLTextAreaElement,
  attributeName: SupportedAriaAttribute,
  value: SupportedAriaAttributes[SupportedAriaAttribute]
) {
  if (value === null || value === undefined) {
    element.removeAttribute(attributeName);
  } else {
    element.setAttribute(attributeName, value);
  }
}

type SupportedAriaAttribute =
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby';
type SupportedAriaAttributes = Pick<AriaAttributes, SupportedAriaAttribute>;

export interface EuiCodeEditorProps extends SupportedAriaAttributes {
  width?: string;
  height?: string;
  onBlur?: IAceEditorProps['onBlur'];
  onFocus?: IAceEditorProps['onFocus'];
  isReadOnly?: boolean;
  setOptions: IAceEditorProps['setOptions'];
  cursorStart?: number;
  'data-test-subj'?: string;

  /**
   * Use string for a built-in mode or object for a custom mode
   */
  mode?: IAceEditorProps['mode'] | object;
}

export interface EuiCodeEditorState {
  isHintActive: boolean;
  isEditing: boolean;
}

export class EuiCodeEditor extends Component<
  EuiCodeEditorProps,
  EuiCodeEditorState
> {
  static defaultProps = {
    setOptions: {},
  };

  state: EuiCodeEditorState = {
    isHintActive: true,
    isEditing: false,
  };

  idGenerator = htmlIdGenerator();
  aceEditor: AceEditor | null = null;
  editorHint: HTMLDivElement | null = null;

  aceEditorRef = (aceEditor: AceEditor | null) => {
    if (aceEditor) {
      this.aceEditor = aceEditor;
      const textbox = aceEditor.editor.textInput.getElement() as HTMLTextAreaElement;
      textbox.tabIndex = -1;
      textbox.addEventListener('keydown', this.onKeydownAce);
      setOrRemoveAttribute(textbox, 'aria-label', this.props['aria-label']);
      setOrRemoveAttribute(
        textbox,
        'aria-labelledby',
        this.props['aria-labelledby']
      );
      setOrRemoveAttribute(
        textbox,
        'aria-describedby',
        this.props['aria-describedby']
      );
    }
  };

  onKeydownAce = (event: KeyboardEvent) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      // If the autocompletion context menu is open then we want to let ESCAPE close it but
      // **not** exit out of editing mode.
      if (this.aceEditor !== null && !this.aceEditor.editor.completer) {
        event.preventDefault();
        event.stopPropagation();
        this.stopEditing();
        if (this.editorHint) {
          this.editorHint.focus();
        }
      }
    }
  };

  onFocusAce: IAceEditorProps['onFocus'] = (event, editor) => {
    this.setState({
      isEditing: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(event, editor);
    }
  };

  onBlurAce: IAceEditorProps['onBlur'] = (event, editor) => {
    this.stopEditing();
    if (this.props.onBlur) {
      this.props.onBlur(event, editor);
    }
  };

  onKeyDownHint: KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.keyCode === keyCodes.ENTER) {
      event.preventDefault();
      this.startEditing();
    }
  };

  startEditing = () => {
    this.setState({
      isHintActive: false,
    });
    if (this.aceEditor !== null) {
      this.aceEditor.editor.textInput.focus();
    }
  };

  stopEditing() {
    this.setState({
      isHintActive: true,
      isEditing: false,
    });
  }

  isCustomMode() {
    return typeof this.props.mode === 'object';
  }

  setCustomMode() {
    if (this.aceEditor !== null) {
      this.aceEditor.editor.getSession().setMode(this.props.mode);
    }
  }

  componentDidMount() {
    if (this.isCustomMode()) {
      this.setCustomMode();
    }
  }

  componentDidUpdate(prevProps: EuiCodeEditorProps) {
    if (this.props.mode !== prevProps.mode && this.isCustomMode()) {
      this.setCustomMode();
    }
  }

  render() {
    const {
      width,
      height,
      onBlur, // eslint-disable-line no-unused-vars
      isReadOnly,
      setOptions,
      cursorStart,
      mode = DEFAULT_MODE,
      'data-test-subj': dataTestSubj = 'codeEditorContainer',
      ...rest
    } = this.props;

    const classes = classNames('euiCodeEditorWrapper', {
      'euiCodeEditorWrapper-isEditing': this.state.isEditing,
    });

    const promptClasses = classNames('euiCodeEditorKeyboardHint', {
      'euiCodeEditorKeyboardHint-isInactive': !this.state.isHintActive,
    });

    let filteredCursorStart;

    const options = { ...setOptions };

    if (isReadOnly) {
      // Put the cursor at the beginning of the editor, so that it doesn't look like
      // a prompt to begin typing.
      filteredCursorStart = -1;

      Object.assign(options, {
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
      });
    } else {
      filteredCursorStart = cursorStart;
    }

    // Don't use EuiKeyboardAccessible here because it doesn't play nicely with onKeyDown.
    const prompt = (
      <div
        className={promptClasses}
        id={this.idGenerator('codeEditor')}
        ref={hint => {
          this.editorHint = hint;
        }}
        tabIndex={0}
        role="button"
        onClick={this.startEditing}
        onKeyDown={this.onKeyDownHint}
        data-test-subj="codeEditorHint">
        <p className="euiText">
          {isReadOnly ? (
            <EuiI18n
              token="euiCodeEditor.startInteracting"
              default="Press Enter to start interacting with the code."
            />
          ) : (
            <EuiI18n
              token="euiCodeEditor.startEditing"
              default="Press Enter to start editing."
            />
          )}
        </p>

        <p className="euiText">
          {isReadOnly ? (
            <EuiI18n
              token="euiCodeEditor.stopInteracting"
              default="When you're done, press Escape to stop interacting with the code."
            />
          ) : (
            <EuiI18n
              token="euiCodeEditor.stopEditing"
              default="When you're done, press Escape to stop editing."
            />
          )}
        </p>
      </div>
    );

    return (
      <div
        className={classes}
        style={{ width, height }}
        data-test-subj={dataTestSubj}>
        {prompt}

        <AceEditor
          // Setting a default, existing `mode` is necessary to properly initialize the editor
          // prior to dynamically setting a custom mode (https://github.com/elastic/eui/pull/2616)
          mode={this.isCustomMode() ? DEFAULT_MODE : (mode as string)} // https://github.com/securingsincity/react-ace/pull/771
          name={this.idGenerator()}
          ref={this.aceEditorRef}
          width={width}
          height={height}
          onFocus={this.onFocusAce}
          onBlur={this.onBlurAce}
          setOptions={options}
          editorProps={{
            $blockScrolling: Infinity,
          }}
          cursorStart={filteredCursorStart}
          {...rest}
        />
      </div>
    );
  }
}
