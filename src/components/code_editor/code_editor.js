import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AceEditor from 'react-ace';

import { htmlIdGenerator, keyCodes } from '../../services';
import { EuiI18n } from '../i18n';

function setOrRemoveAttribute(element, attributeName, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(attributeName);
  } else {
    element.setAttribute(attributeName, value);
  }
}

export class EuiCodeEditor extends Component {
  state = {
    isHintActive: true,
    isEditing: false,
  };

  idGenerator = htmlIdGenerator();

  aceEditorRef = aceEditor => {
    if (aceEditor) {
      this.aceEditor = aceEditor;
      const textbox = aceEditor.editor.textInput.getElement();
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

  onKeydownAce = ev => {
    if (ev.keyCode === keyCodes.ESCAPE) {
      // If the autocompletion context menu is open then we want to let ESCAPE close it but
      // **not** exit out of editing mode.
      if (!this.aceEditor.editor.completer) {
        ev.preventDefault();
        ev.stopPropagation();
        this.stopEditing();
        this.editorHint.focus();
      }
    }
  };

  onFocusAce = (...args) => {
    this.setState({
      isEditing: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  };

  onBlurAce = (...args) => {
    this.stopEditing();
    if (this.props.onBlur) {
      this.props.onBlur(...args);
    }
  };

  onKeyDownHint = ev => {
    if (ev.keyCode === keyCodes.ENTER) {
      ev.preventDefault();
      this.startEditing();
    }
  };

  startEditing = () => {
    this.setState({
      isHintActive: false,
    });
    this.aceEditor.editor.textInput.focus();
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
    this.aceEditor.editor.getSession().setMode(this.props.mode);
  }

  componentDidMount() {
    if (this.isCustomMode()) {
      this.setCustomMode();
    }
  }

  componentDidUpdate(prevProps) {
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
        tabIndex="0"
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

    if (this.isCustomMode()) {
      delete rest.mode; // Otherwise, the AceEditor component will complain about wanting a string value for the mode prop.
    }

    return (
      <div
        className={classes}
        style={{ width, height }}
        data-test-subj="codeEditorContainer">
        {prompt}

        <AceEditor
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

EuiCodeEditor.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onBlur: PropTypes.func,
  isReadOnly: PropTypes.bool,
  setOptions: PropTypes.object,
  cursorStart: PropTypes.number,

  /**
   * Use string for a built-in mode or object for a custom mode
   */
  mode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

EuiCodeEditor.defaultProps = {
  setOptions: {},
};
