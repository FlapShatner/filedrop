import { ClearIcon } from './icons/clear-icon';
import { useFileContext } from '../context/file-context';
import { cn } from '../../../lib/cn';

function ClearFile() {
  const { handleClearFile, file } = useFileContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleClearFile();
  };

  return (
    <div
      className={cn(
        'cursor-pointer absolute top-1 right-1 flex items-center justify-center',
        file ? 'flex' : 'hidden'
      )}
      onClick={handleClick}
    >
      <ClearIcon className="w-8 h-8 opacity-50 hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}

export default ClearFile;
