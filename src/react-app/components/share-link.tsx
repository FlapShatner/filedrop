import { Link } from '@tanstack/react-router';
import { cn } from '../../lib/cn';
import React, { useRef, useState } from 'react';

function ShareLink({ url }: { url: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const text = linkRef.current?.textContent;
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="border border-accent rounded-md flex flex-col md:flex-row items-center gap-2 blur-bg-2 mt-2 p-2 md:p-0">
      <Link
        to="/download/$url"
        params={{ url: url }}
        className="text-lg md:text-2xl px-4"
        ref={linkRef}
      >
        localhost:5174/download/{url}
      </Link>
      <button
        className={cn(
          'bg-accent text-white rounded-md py-2 px-4 md:rounded-l-none cursor-pointer w-full md:w-24 text-base',
          isCopied && 'bg-accent-hover'
        )}
        onClick={handleCopy}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

export default ShareLink;
