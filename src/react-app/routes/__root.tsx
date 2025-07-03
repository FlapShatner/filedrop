import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Background from '../components/background';
import ErrorBoundary from '../components/error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Add global error handling for queries
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const Route = createRootRoute({
  component: () => {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Background>
            <Outlet />
            <TanStackRouterDevtools />
          </Background>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  },
});
