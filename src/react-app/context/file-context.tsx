import { createContext, useContext } from 'react';
import { InsertResult, ShareResult } from '../../types';

export interface FileContextType {
  file: File | null;
  expireIn: number;
  result: InsertResult | null;
  isLoading: boolean;
  error: string | null;
  setFile: (file: File | null) => void;
  setExpireIn: (expireIn: number) => void;
  setError: (error: string | null) => void;
  handleFileSelected: (file: File) => void;
  handleShare: () => Promise<ShareResult | null>;
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
