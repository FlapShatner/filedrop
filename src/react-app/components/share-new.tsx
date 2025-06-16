import { Link } from '@tanstack/react-router';

function ShareNew() {
  return (
    <div className="top-4 right-4 absolute border border-accent rounded-md px-4 py-2 blur-bg-2">
      <Link to="/">Share a new file</Link>
    </div>
  );
}

export default ShareNew;
