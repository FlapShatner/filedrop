import { Link } from '@tanstack/react-router';
import ErrorBoundary from './error-boundary';
import { ErrorInfo } from 'react';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  routeName?: string;
}

function RouteErrorFallback({
  routeName,
  error,
}: {
  routeName?: string;
  error?: Error;
}) {
  return (
    <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 relative p-4">
      <h1 className="text-2xl md:text-4xl font-outfit mb-4 mt-8 text-center">
        {routeName ? `Error in ${routeName}` : 'Page Error'}
      </h1>
      <p className="text-lg text-white/70 text-center max-w-2xl">
        Sorry, we encountered an unexpected error while loading this page. This
        could be due to a network issue or a temporary problem with our service.
      </p>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 max-w-2xl">
          <p className="text-sm text-red-300 font-mono">{error.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-hover transition-colors"
        >
          Try Again
        </button>
        <Link
          to="/"
          className="border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent hover:text-white transition-colors text-center"
        >
          Go to Upload
        </Link>
      </div>
    </div>
  );
}

function RouteErrorBoundary({ children, routeName }: RouteErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // You can integrate with error reporting services here
    console.error(
      `Route Error in ${routeName || 'Unknown Route'}:`,
      error,
      errorInfo
    );

    // Example: Send to error reporting service
    // errorReportingService.captureException(error, {
    //   extra: { routeName, errorInfo }
    // });
  };

  return (
    <ErrorBoundary
      onError={handleError}
      fallback={<RouteErrorFallback routeName={routeName} />}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RouteErrorBoundary;
