import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './app'
import AppProviders from './app/providers/AppProviders'
import "./i18n";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/QueryClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
