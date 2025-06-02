import { useFileContext } from '../context/file-context';

function Share() {
  const { handleShare } = useFileContext();

  return (
    <button
      onClick={handleShare}
      className="font-raleway bg-accent text-white px-4 py-4 rounded-lg hover:bg-accent/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 w-full max-w-xl cursor-pointer font-semibold"
    >
      Share and get link
    </button>
  );
}

export default Share;
