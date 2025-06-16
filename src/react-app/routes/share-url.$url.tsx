import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ShareLink from '../components/share-link';
import Expired from '../components/expired';
// import { useFileContext } from '../context/file-context';

export const Route = createFileRoute('/share-url/$url')({
  component: ShareUrl,
});

function ShareUrl() {
  const { url } = Route.useParams();
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
  if (expiresAt < new Date() || error) {
    return <Expired />;
  }
  return (
    <div className="font-raleway h-screen max-w-4xl mx-auto flex flex-col items-center justify-center p-4 pt-8 -translate-y-1/8">
      <p className="text-2xl font-outfit mb-4">
        File is available to download at URL: <ShareLink url={url} />
      </p>
      <p className="font-outfit ">File will expire: {formattedExpiresAt}</p>
      <div className="w-full flex flex-col items-center justify-center gap-4"></div>
    </div>
  );
}
