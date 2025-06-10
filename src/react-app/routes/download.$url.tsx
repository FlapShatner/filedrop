import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/download/$url')({
  component: RouteComponent,
});

function RouteComponent() {
  const { url } = Route.useParams();
  console.log(url);
  return <div>This is download/{url}!</div>;
}
