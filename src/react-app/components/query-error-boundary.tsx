import { Link } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorBoundary from './error-boundary';
import { ErrorInfo } from 'react';

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

function QueryErrorFallback({
  error,
  resetErrorBoundary,
  fallbackMessage,
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
  fallbackMessage?: string;
}) {
  const isNetworkError =
    error?.message?.includes('fetch') ||
    error?.message?.includes('network') ||
    error?.message?.includes('Failed to fetch');

  return (
    <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 relative p-4">
      <h1 className="text-2xl md:text-4xl font-outfit mb-4 mt-8 text-center">
        {isNetworkError ? 'Connection Problem' : 'Data Loading Error'}
      </h1>

      <p className="text-lg text-white/70 text-center max-w-2xl">
        {fallbackMessage ||
          (isNetworkError ?
            'Unable to connect to our servers. Please check your internet connection and try again.'
          : 'We encountered an issue while loading your data. This might be a temporary problem.')}
      </p>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 max-w-2xl">
          <h3 className="text-sm font-semibold mb-2 text-red-400">
            Technical Details:
          </h3>
          <p className="text-sm text-red-300 font-mono">{error.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-hover transition-colors"
          >
            Retry
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent hover:text-white transition-colors"
        >
          Reload Page
        </button>
        <Link
          to="/"
          className="border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent hover:text-white transition-colors text-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

function QueryErrorBoundary({
  children,
  fallbackMessage,
}: QueryErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Query Error:', error, errorInfo);

    // You can send API/Query errors to your error reporting service
    // errorReportingService.captureException(error, {
    //   tags: { errorType: 'query' },
    //   extra: { errorInfo }
    // });
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={handleError}
          fallback={
            <QueryErrorFallback
              resetErrorBoundary={reset}
              fallbackMessage={fallbackMessage}
            />
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default QueryErrorBoundary;
