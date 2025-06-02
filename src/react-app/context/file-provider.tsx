import { useState } from 'react';
import { FileContext, FileContextType } from './file-context';

interface FileProviderProps {
  children: React.ReactNode;
}

export const FileProvider = ({ children }: FileProviderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [expireIn, setExpireIn] = useState<number>(1);
  const [key, setKey] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    setFile(file);
  };

  const handleShare = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('expireIn', expireIn.toString());

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (data.result.success) {
        setFile(null);
        setExpireIn(1);
        setKey(data.key);
        return data.key;
      } else {
        console.error(data.message);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setKey(null);
  };

  console.log(file, expireIn);

  const value: FileContextType = {
    file,
    expireIn,
    key,
    setFile,
    setExpireIn,
    handleFileSelected,
    handleShare,
    handleClearFile,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
