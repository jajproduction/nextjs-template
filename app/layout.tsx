import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/lib/fonts'
import { TrpcProvider } from '@/providers/trpc'
import { ThemeProvider } from '@/providers/theme'

export const metadata: Metadata = {
  title: {
    default: 'Nextjs Template',
    template: 'Nextjs Template | %s'
  },
  description: 'Template from Jaj Dollesin'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <TrpcProvider>
          <ThemeProvider attribute='class' defaultTheme='light'>
            {children}
          </ThemeProvider>
        </TrpcProvider>
      </body>
    </html>
  )
}
