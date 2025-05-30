import React, { useState, useCallback } from 'react';
import UploadLoopIcon from './icons/upload-loop-icon';
import { cn } from '../lib/cn';
import FolderIcon from './icons/folder-icon';

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        onFileSelect(file);
        e.dataTransfer.clearData();
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const baseClasses =
    'flex flex-col items-center justify-start p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out min-h-[200px] text-center max-w-xl mx-auto';
  const idleClasses =
    'bg-bg-secondary text-gray-700 border-border hover:border-border-light';
  const draggingClasses = 'border-border-light bg-gray-100/10 ';

  return (
    <div
      className={cn(baseClasses, dragging ? draggingClasses : idleClasses)}
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
      {selectedFile ? (
        <div className="text-sm text-text my-auto">
          <p className="my-1">Selected file: {selectedFile.name}</p>
          <p className="my-1">Type: {selectedFile.type}</p>
          <p className="my-1">
            Size: {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      ) : (
        <div
          className={cn(
            'pointer-events-none font-raleway flex flex-col items-center justify-center',
            dragging ? 'text-text ' : 'text-text/70'
          )}
        >
          <UploadLoopIcon className="w-16 h-16 mb-4 text-text" />
          <p>Choose a file or drag & drop it here</p>
          <button className="bg-bg border-border border px-2 py-1 rounded-md mt-4 flex items-center text-sm text-text/70 hover:text-text">
            <span className="mr-2 text-sm">Browse</span>
            <FolderIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
