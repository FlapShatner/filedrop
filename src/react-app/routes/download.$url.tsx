import { createFileRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Download from '../components/download';

export const Route = createFileRoute('/download/$url')({
  component: RouteComponent,
});
const queryClient = new QueryClient();

function RouteComponent() {
  const { url } = Route.useParams();
  return (
    <QueryClientProvider client={queryClient}>
      <Download url={url} />
    </QueryClientProvider>
  );
}
