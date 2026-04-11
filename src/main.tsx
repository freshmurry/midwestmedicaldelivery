import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import '@/index.css';
// Layout & Pages
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceAreasPage } from '@/pages/ServiceAreasPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CityPage } from '@/pages/CityPage';
import { CITY_DATA } from '@shared/city-data';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout><HomePage /></RootLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/services",
    element: <RootLayout><ServicesPage /></RootLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/areas",
    element: <RootLayout><ServiceAreasPage /></RootLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/about",
    element: <RootLayout><AboutPage /></RootLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/contact",
    element: <RootLayout><ContactPage /></RootLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  // Local SEO Pages
  ...Object.values(CITY_DATA).map(city => ({
    path: `/${city.slug}`,
    element: <RootLayout><CityPage city={city} /></RootLayout>,
    errorElement: <RouteErrorBoundary />,
  }))
]);
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
          <Toaster richColors closeButton position="top-center" />
        </ErrorBoundary>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);