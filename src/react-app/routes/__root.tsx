import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Background from '../components/background';

export const Route = createRootRoute({
  component: () => {
    return (
      <Background>
        <Outlet />
        <TanStackRouterDevtools />
      </Background>
    );
  },
});
