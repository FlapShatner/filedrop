import { createFileRoute } from '@tanstack/react-router';
import Download from '../components/download';
import { useQuery } from '@tanstack/react-query';
import Expired from '../components/expired';
import RouteErrorBoundary from '../components/route-error-boundary';
import QueryErrorBoundary from '../components/query-error-boundary';

export const Route = createFileRoute('/download/$url')({
  component: RouteComponent,
});

function RouteComponent() {
  const { url } = Route.useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['download', url],
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
        <p className="mt-4 text-white/70">Loading file...</p>
      </div>
    );
  }

  if (isError || !data) {
    return <Expired />;
  }

  const fileExists = data.fileMeta?.length > 0;
  const isExpired =
    fileExists && new Date(data.fileMeta[0].expires_at) < new Date();

  if (!fileExists || isExpired) {
    return <Expired />;
  }

  return (
    <RouteErrorBoundary routeName="Download">
      <QueryErrorBoundary fallbackMessage="Failed to load file information. The file might have been removed or expired.">
        <Download
          url={url}
          data={data}
          error={error}
        />
      </QueryErrorBoundary>
    </RouteErrorBoundary>
  );
}
