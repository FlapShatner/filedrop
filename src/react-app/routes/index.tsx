import { createFileRoute } from '@tanstack/react-router';
import { Upload } from '../components/upload';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return <Upload />;
}
