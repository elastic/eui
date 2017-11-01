import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AceEditor from 'react-ace';

import { htmlIdGenerator, keyCodes } from '../../services';

export class EuiCodeEditor extends Component {

  state = {
    isHintActive: true
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
      ev.preventDefault();
      ev.stopPropagation();
      this.stopEditing();
      this.editorHint.focus();
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
    this.setState({ isHintActive: false });
    this.aceEditor.editor.textInput.focus();
  }

  stopEditing() {
    this.setState({ isHintActive: true });
  }

  render() {
    const {
      width,
      height,
      onBlur, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames('euiCodeEditorKeyboardHint', {
      'euiCodeEditorKeyboardHint-isInactive': !this.state.isHintActive
    });

    return (
      <div
        className="euiCodeEditorWrapper"
        style={{ width, height }}
      >
        <div
          className={classes}
          id={this.idGenerator('codeEditor')}
          ref={(hint) => { this.editorHint = hint; }}
          tabIndex="0"
          role="button"
          onClick={this.startEditing}
          onKeyDown={this.onKeyDownHint}
          data-test-subj="codeEditorHint"
        >
          <p className="euiText euiVerticalRhythmSmall">
            Press Enter to start editing.
          </p>

          <p className="euiText euiVerticalRhythmSmall">
            When you&rsquo;re done, press Escape to stop editing.
          </p>
        </div>

        <AceEditor
          ref={this.aceEditorRef}
          width={width}
          height={height}
          onBlur={this.onBlurAce}
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
};
