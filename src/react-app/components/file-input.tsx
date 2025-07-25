import React, { useState, useCallback, useEffect } from 'react';
import UploadLoopIcon from './icons/upload-loop-icon';
import { cn } from '../../lib/cn';
import ClearFile from './clear-file';
import FolderIcon from './icons/folder-icon';
import { useFileContext } from '../context/file-context';

const FileInput: React.FC = () => {
  const { handleFileSelected, file, isLoading } = useFileContext();
  const [dragging, setDragging] = useState(false);

  // Reset file input when file is cleared
  useEffect(() => {
    if (!file) {
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }, [file]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const selectedFile = e.dataTransfer.files[0];
        handleFileSelected(selectedFile);
        e.dataTransfer.clearData();
      }
    },
    [handleFileSelected]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelected(selectedFile);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const baseClasses =
    'flex flex-col  items-center justify-start p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out min-h-[200px] text-center w-full max-w-xl mx-auto relative ';
  const idleClasses =
    'group text-gray-700 border-accent hover:border-accent-hover blur-bg shadow-md';
  const draggingClasses = 'border-border bg-gray-100/10 ';
  const selectedClasses = 'border-accent  min-h-[100px] blur-bg-2';

  return (
    <div
      className={cn(
        baseClasses,
        file ? selectedClasses
        : dragging ? draggingClasses
        : idleClasses
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
        accept="*"
      />
      <ClearFile />
      {file ?
        <div className="text-sm text-text my-auto ">
          <p className="my-1 text-wrap max-w-sm break-words">
            {isLoading ? 'Uploading file:' : 'Selected file:'} {file.name}
          </p>
          <p className="my-1">Type: {file.type}</p>
          <p className="my-1">Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      : <div
          className={cn(
            'pointer-events-none font-raleway flex flex-col items-center justify-center',
            dragging ? 'text-text ' : 'text-text/70'
          )}
        >
          <UploadLoopIcon className="w-16 h-16 mb-4 text-text" />
          <p>Choose a file or drag & drop it here</p>
          <button className="bg-accent/80  px-2 py-1 rounded-md mt-4 flex items-center text-sm text-text group-hover:bg-accent-hover transition-colors duration-200 ease-in-out">
            <span className="mr-2 text-sm font-semibold">Browse</span>
            <FolderIcon className="w-4 h-4" />
          </button>
        </div>
      }
    </div>
  );
};

export default FileInput;
