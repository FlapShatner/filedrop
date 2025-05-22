import ExpireIn from './components/expire-in'
import FileInput from './components/file-input'

function App() {
 const handleFileSelected = (file: File) => {
  console.log('Selected file:', file)
 }

 return (
  <div className='font-monkey h-screen max-w-4xl mx-auto flex flex-col items-center justify-start p-4 pt-8'>
   <h1 className='text-2xl font-monkey mb-8'>Upload a file to share</h1>
   <div className='w-full '>
    <ExpireIn />
    <FileInput onFileSelect={handleFileSelected} />
   </div>
  </div>
 )
}

export default App
