import { createFileRoute } from '@tanstack/react-router';
import { Upload } from '../components/upload';
import RouteErrorBoundary from '../components/route-error-boundary';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <RouteErrorBoundary routeName="Upload">
      <Upload />
    </RouteErrorBoundary>
  );
}
