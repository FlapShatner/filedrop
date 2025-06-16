import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Background from '../components/background';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Background>
          <Outlet />
          <TanStackRouterDevtools />
        </Background>
      </QueryClientProvider>
    );
  },
});
