import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from '@/context/AuthContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'highlight.js/styles/base16/material-palenight.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </AuthProvider>
  </QueryClientProvider>
)