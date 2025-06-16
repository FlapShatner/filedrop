import { Link } from '@tanstack/react-router';

function Expired() {
  return (
    <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 relative">
      <h1 className="text-2xl md:text-4xl font-outfit mb-4 mt-8">
        File does not exist or has expired
      </h1>
      <Link
        className="border border-accent rounded-md px-4 py-2 blur-bg-2"
        to="/"
      >
        Share a new file
      </Link>
    </div>
  );
}

export default Expired;
