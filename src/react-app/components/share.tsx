import { cn } from '../../lib/cn.ts';
import { useFileContext } from '../context/file-context';
import { useNavigate } from '@tanstack/react-router';
import Loader from './icons/loader';

function Share() {
  const navigate = useNavigate();
  const { handleShare, isLoading } = useFileContext();

  const handleClick = async () => {
    const result = await handleShare();
    const url = result?.insertResult[0].id;
    console.log('result:', result);
    console.log('url:', url);
    if (url) {
      navigate({ to: `/share-url/$url`, params: { url } });
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
