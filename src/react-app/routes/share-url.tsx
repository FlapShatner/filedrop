import { createFileRoute } from '@tanstack/react-router';
// import { useFileContext } from '../context/file-context';

export const Route = createFileRoute('/share-url')({
  component: ShareUrl,
});

function ShareUrl() {
  // const { key } = useFileContext();

  return (
    <div className="font-raleway h-screen max-w-4xl mx-auto flex flex-col items-center justify-center p-4 pt-8 -translate-y-1/8">
      <h1 className="text-4xl font-outfit mb-8">File is available at URL: </h1>
      <div className="w-full flex flex-col items-center justify-center gap-4"></div>
    </div>
  );
}
