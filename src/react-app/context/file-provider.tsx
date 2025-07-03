import { useState } from 'react';
import { FileContext, FileContextType } from './file-context';
import { InsertResult, ShareResult } from '../../types';
interface FileProviderProps {
  children: React.ReactNode;
}

export const FileProvider = ({ children }: FileProviderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [expireIn, setExpireIn] = useState<number>(1);
  const [result, setResult] = useState<InsertResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    setFile(file);
  };

  const handleShare = async (): Promise<ShareResult | null> => {
    if (!file) return null;

    setIsLoading(true);
    setError(null); // Clear any previous errors

    const formData = new FormData();
    formData.append('file', file);
    formData.append('expireIn', expireIn.toString());

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.result?.success) {
        setFile(null);
        setExpireIn(1);
        setResult(data.result);
        setIsLoading(false);
        setError(null);
        return data.result;
      } else {
        const errorMessage = data.message || 'Upload failed for unknown reason';
        console.error('Upload failed:', errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      setIsLoading(false);

      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('413')) {
          setError('File is too large. Please choose a smaller file.');
        } else if (error.message.includes('415')) {
          setError('File type is not supported.');
        } else if (
          error.message.includes('network') ||
          error.message.includes('fetch')
        ) {
          setError(
            'Network error. Please check your connection and try again.'
          );
        } else {
          setError(`Upload failed: ${error.message}`);
        }
      } else {
        setError('An unexpected error occurred while uploading the file');
      }
      return null;
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setResult(null);
  };

  const value: FileContextType = {
    file,
    expireIn,
    result,
    isLoading,
    error,
    setFile,
    setExpireIn,
    setError,
    handleFileSelected,
    handleShare,
    handleClearFile,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
