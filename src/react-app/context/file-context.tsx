import { createContext, useContext } from 'react';

export interface FileContextType {
  file: File | null;
  expireIn: number;
  key: string | null;
  setFile: (file: File | null) => void;
  setExpireIn: (expireIn: number) => void;
  handleFileSelected: (file: File) => void;
  handleShare: () => void;
  handleClearFile: () => void;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};
