import { cn } from '../../../lib/cn.ts';
import { useFileContext } from '../context/file-context';
import Loader from './icons/loader';

function Share() {
  const { handleShare, isLoading } = useFileContext();

  const handleClick = async () => {
    const key = await handleShare();
    if (key) {
      window.location.href = `${window.location.origin}/file/${key}`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'font-raleway bg-accent text-white px-4 py-4 rounded-lg hover:bg-accent/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 w-full max-w-xl cursor-pointer font-semibold',
        isLoading && 'opacity-50 cursor-not-allowed'
      )}
    >
      {isLoading ?
        <Loader />
      : 'Share and get link'}
    </button>
  );
}

export default Share;
