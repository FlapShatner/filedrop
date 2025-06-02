import { createFileRoute } from '@tanstack/react-router';
import { useFileContext } from '../context/file-context';

export const Route = createFileRoute('/share-url')({
  component: ShareUrl,
});

function ShareUrl() {
  const { file } = useFileContext();

  return <div>Hello "/share-url"!</div>;
}
