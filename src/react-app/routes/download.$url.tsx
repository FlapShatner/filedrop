import { createFileRoute } from '@tanstack/react-router';
import Download from '../components/download';
import { useQuery } from '@tanstack/react-query';
import Expired from '../components/expired';

export const Route = createFileRoute('/download/$url')({
  component: RouteComponent,
});

function RouteComponent() {
  const { url } = Route.useParams();
  const { data, error } = useQuery({
    queryKey: ['download', url],
    queryFn: () => fetch(`/api/download/${url}`).then((res) => res.json()),
  });
  console.log(data);
  console.log(error);
  const expiresAt = data?.fileMeta[0].expires_at;
  if (expiresAt < new Date() || error) {
    return <Expired />;
  }

  return <Download url={url} />;
}
