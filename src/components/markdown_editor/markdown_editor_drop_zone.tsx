import React from 'react';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { EuiIcon } from '../icon';
import { EuiLoadingSpinner } from '../loading';

export const EuiMarkdownEditorDropZone = (props: any) => {
  const [isDragging, toggleDragging] = React.useState(false);
  const [isUploadingFiles, toggleUploadingFiles] = React.useState(false);

  const { children, className } = props;

  const classes = classNames('euiMarkdownEditor__dropZone', {
    'euiMarkdownEditor__dropZone--isDragging': isDragging,
    className,
  });

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    // multiple: false,
    onDragEnter: () => {
      toggleDragging(true);
    },
    onDragLeave: () => {
      toggleDragging(false);
    },
    onDrop: () => {
      toggleUploadingFiles(true);

      // faking the file upload
      setTimeout(() => {
        toggleDragging(false);
        toggleUploadingFiles(false);
      }, 3000);
    },
  });

  let buttonIcon;

  if (isUploadingFiles) {
    buttonIcon = (
      <EuiLoadingSpinner
        className="euiMarkdownEditor__dropZone__icon"
        size="m"
      />
    );
  } else {
    buttonIcon = (
      <EuiIcon
        className="euiMarkdownEditor__dropZone__icon"
        type="paperClip"
        size="s"
        aria-hidden="true"
      />
    );
  }

  return (
    <div {...getRootProps()} className={classes}>
      {children}
      <button className="euiMarkdownEditor__dropZone__button" onClick={open}>
        {buttonIcon}
        <div className="euiMarkdownEditor__dropZone__text">
          {isUploadingFiles
            ? 'Uploading your files...'
            : 'Attach files by dragging & dropping or by clicking this area'}
        </div>
      </button>
      <input {...getInputProps()} />
    </div>
  );
};
