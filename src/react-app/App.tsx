import FileInput from './components/file-input'

function App() {
 const handleFileSelected = (file: File) => {
  console.log('Selected file:', file)
 }

 return (
  <div className='h-screen flex flex-col items-center justify-center p-4'>
   <h1 className='text-2xl font-monkey mb-8'>Upload a file to share</h1>
   <div className='w-full max-w-md'>
    <FileInput onFileSelect={handleFileSelected} />
   </div>
  </div>
 )
}

export default App
