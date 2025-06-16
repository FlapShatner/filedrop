import { useQuery } from '@tanstack/react-query';
import { formatBytes } from '../../lib/utils';
import { DownloadLoopIcon } from './icons/download-loop-icon';
import ShareNew from './share-new';

function Download({ url }: { url: string }) {
  const { data, error } = useQuery({
    queryKey: ['download', url],
    queryFn: () => fetch(`/api/download/${url}`).then((res) => res.json()),
  });
  console.log(data);
  console.log(error);
  const expiresAt = data?.fileMeta[0].expires_at;
  const formattedExpiresAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(expiresAt);

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/file/${url}`);

      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = data?.fileMeta[0].original_filename || 'download';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center  p-4 gap-4 relative">
      <ShareNew />
      <div className="-translate-y-1/8">
        <h1 className="text-2xl md:text-4xl font-outfit mb-4 mt-8">
          Your file is ready to download!
        </h1>
        <div className=" flex flex-col md:flex-row items-center justify-center gap-2 bg-accent/20 py-2 px-4 rounded-md backdrop-blur-lg blur-bg-2 border border-accent/60 shadow-lg w-full md:w-auto">
          <div className="flex flex-col gap-3 items-center justify-center  ">
            <div className="flex gap-2 items-center justify-center  ">
              <p className="md:text-2xl font-bold text-wrap max-w-xs md:max-w-lg break-words">
                {data?.fileMeta[0].original_filename}
              </p>
              <p>-</p>
              <p className="w-auto text-white/60">
                {formatBytes(data?.fileMeta[0].size_bytes)}
              </p>
            </div>
            <p className=" flex items-center justify-center text-white/60 text-sm">
              File will expire:
              <span className=" font-bold ml-2">{formattedExpiresAt}</span>
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-accent py-3 px-4 rounded-md flex items-center justify-center gap-2 ml-0 md:ml-6 my-2 md:my-auto cursor-pointer w-full md:w-auto"
          >
            <DownloadLoopIcon className="w-5 h-5 text-white" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default Download;
