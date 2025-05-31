import { useState } from 'react';
import ExpireIn from './components/expire-in';
import FileInput from './components/file-input';
import Share from './components/share';
import ClearFile from './components/clear-file';
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [expireIn, setExpireIn] = useState<number>(1);
  const handleFileSelected = (file: File) => {
    setFile(file);
  };
  const handleShare = () => {
    console.log('share');
  };
  const handleClearFile = () => {
    setFile(null);
  };
  console.log(file, expireIn);

  return (
    <div className="font-raleway h-screen max-w-4xl mx-auto flex flex-col items-center justify-start p-4 pt-8">
      <h1 className="text-2xl font-outfit mb-8">Upload a file to share</h1>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <ExpireIn
          expireIn={expireIn}
          setExpireIn={setExpireIn}
        />
        <FileInput onFileSelect={handleFileSelected} />
        {file && <Share onClick={handleShare} />}
        {file && <ClearFile onClick={handleClearFile} />}
      </div>
    </div>
  );
}

export default App;
