import ExpireIn from './expire-in';
import FileInput from './file-input';
import Share from './share';
import { useFileContext } from '../context/file-context';

export function Upload() {
  const { file } = useFileContext();

  return (
    <div className="font-raleway h-screen max-w-4xl mx-auto flex flex-col items-center justify-center p-4 pt-8 -translate-y-1/8">
      <h1 className="text-4xl font-outfit mb-8">Upload a file to share</h1>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <ExpireIn />
        <FileInput />
        {file && <Share />}
      </div>
    </div>
  );
}
