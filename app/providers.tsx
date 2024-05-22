'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LayoutProps } from './myadmin/layout'
import {useState} from 'react'

export default function Providers({ children }: LayoutProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ) 
}
