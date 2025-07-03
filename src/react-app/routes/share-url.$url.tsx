import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ShareLink from '../components/share-link';
import Expired from '../components/expired';
import RouteErrorBoundary from '../components/route-error-boundary';
import QueryErrorBoundary from '../components/query-error-boundary';
import ShareNew from '../components/share-new';

export const Route = createFileRoute('/share-url/$url')({
  component: ShareUrl,
});

function ShareUrl() {
  const { url } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['share-url', url],
    queryFn: async () => {
      const response = await fetch(`/api/download/${url}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch file metadata: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    },
    retry: (failureCount, error) => {
      // Don't retry on 404 errors (file not found)
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  if (isLoading) {
    return (
      <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        <p className="mt-4 text-white/70">Loading share information...</p>
      </div>
    );
  }

  if (isError || !data || !data.fileMeta?.length) {
    return <Expired />;
  }

  const expiresAt = new Date(data.fileMeta[0].expires_at);
  const isExpired = expiresAt < new Date();

  if (isExpired) {
    return <Expired />;
  }

  const formattedExpiresAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(expiresAt);

  return (
    <RouteErrorBoundary routeName="Share URL">
      <QueryErrorBoundary fallbackMessage="Failed to load share information. The file might have been removed or expired.">
        <div className="font-raleway h-screen max-w-4xl mx-auto flex flex-col items-center justify-center p-4 pt-8 -translate-y-1/8 relative">
          <ShareNew />
          <p className="text-2xl font-outfit mb-4">
            File is available to download at URL: <ShareLink url={url} />
          </p>
          <p className="font-outfit">File will expire: {formattedExpiresAt}</p>
          <div className="w-full flex flex-col items-center justify-center gap-4"></div>
        </div>
      </QueryErrorBoundary>
    </RouteErrorBoundary>
  );
}
