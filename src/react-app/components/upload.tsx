import ExpireIn from './expire-in';
import FileInput from './file-input';
import Share from './share';
import { useFileContext } from '../context/file-context';

export function Upload() {
  const { file, error, setError } = useFileContext();

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="font-raleway h-screen max-w-4xl mx-auto flex flex-col items-center justify-center p-4 pt-8 -translate-y-1/8">
      <h1 className="text-4xl font-outfit mb-8">Upload a file to share</h1>

      {error && (
        <div className="w-full max-w-xl mb-4 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-400">
                  Upload Error
                </h3>
                <p className="mt-1 text-sm text-red-300">{error}</p>
              </div>
            </div>
            <button
              onClick={handleDismissError}
              className="flex-shrink-0 ml-4 text-red-400 hover:text-red-300"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <ExpireIn />
        <FileInput />
        {file && <Share />}
      </div>
    </div>
  );
}
