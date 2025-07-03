import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="font-outfit h-screen max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 relative p-4">
          <h1 className="text-2xl md:text-4xl font-outfit mb-4 mt-8 text-center">
            Oops! Something went wrong
          </h1>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 max-w-2xl">
            <h2 className="text-lg font-semibold mb-2 text-red-400">
              Error Details:
            </h2>
            <p className="text-sm text-red-300 mb-2 font-mono">
              {this.state.error?.message}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4">
                <summary className="cursor-pointer text-red-400 hover:text-red-300">
                  Stack Trace (Development)
                </summary>
                <pre className="text-xs text-red-300 mt-2 overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition-colors"
            >
              Reload Page
            </button>
            <Link
              to="/"
              className="border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
