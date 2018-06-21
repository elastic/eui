import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AceEditor from 'react-ace';

import { htmlIdGenerator, keyCodes } from '../../services';

export class EuiCodeEditor extends Component {

  state = {
    isHintActive: true,
    isEditing: false,
  };

  idGenerator = htmlIdGenerator();

  aceEditorRef = (aceEditor) => {
    if (aceEditor) {
      this.aceEditor = aceEditor;
      aceEditor.editor.textInput.getElement().tabIndex = -1;
      aceEditor.editor.textInput.getElement().addEventListener('keydown', this.onKeydownAce);
    }
  };

  onKeydownAce = (ev) => {
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
  }

  onFocusAce = (...args) => {
    this.setState({
      isEditing: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  }

  onBlurAce = (...args) => {
    this.stopEditing();
    if (this.props.onBlur) {
      this.props.onBlur(...args);
    }
  };

  onKeyDownHint = (ev) => {
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
  }

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
    if ((this.props.mode !== prevProps.mode) && this.isCustomMode()) {
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

    const activity = isReadOnly
      ? 'interacting with the code'
      : 'editing';


    // Don't use EuiKeyboardAccessible here because it doesn't play nicely with onKeyDown.
    const prompt = (
      <div
        className={promptClasses}
        id={this.idGenerator('codeEditor')}
        ref={(hint) => { this.editorHint = hint; }}
        tabIndex="0"
        role="button"
        onClick={this.startEditing}
        onKeyDown={this.onKeyDownHint}
        data-test-subj="codeEditorHint"
      >
        <p className="euiText">
          Press Enter to start {activity}.
        </p>

        <p className="euiText">
          When you&rsquo;re done, press Escape to stop {activity}.
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
        data-test-subj="codeEditorContainer"
      >
        {prompt}

        <AceEditor
          ref={this.aceEditorRef}
          width={width}
          height={height}
          onFocus={this.onFocusAce}
          onBlur={this.onBlurAce}
          setOptions={options}
          editorProps={{
            $blockScrolling: Infinity
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
  mode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
};

EuiCodeEditor.defaultProps = {
  setOptions: {},
};
