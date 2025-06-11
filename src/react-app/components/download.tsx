import { useQuery } from '@tanstack/react-query';
import { formatBytes } from '../../lib/utils';
import { DownloadLoopIcon } from './icons/download-loop-icon';

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
  return (
    <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center p-4 pt-8 -translate-y-1/8">
      <h1 className="text-4xl font-outfit mb-4">
        Your file is ready to download!
      </h1>
      <div className=" flex items-center justify-center gap-2 bg-accent/20 py-2 px-4 rounded-md">
        <div className="flex flex-col gap-2 items-center justify-center  ">
          <div className="flex gap-2 items-center justify-center  ">
            <p className="text-2xl font-bold ">
              {data?.fileMeta[0].original_filename}
            </p>
            <p>-</p>
            <p className=" text-white/60">
              {formatBytes(data?.fileMeta[0].size_bytes)}
            </p>
          </div>
          <p className=" flex items-center justify-center text-white/60 text-sm">
            File will expire:
            <span className=" font-bold ml-2">{formattedExpiresAt}</span>
          </p>
        </div>
        <button className="bg-accent py-3 px-4 rounded-md flex items-center justify-center gap-2 ml-6 my-auto cursor-pointer">
          <DownloadLoopIcon className="w-5 h-5 text-white" />
          Download
        </button>
      </div>
    </div>
  );
}

export default Download;
