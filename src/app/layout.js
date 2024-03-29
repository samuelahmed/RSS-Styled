import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/themeProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RSS Reader',
  description: 'Simple RSS Reader', 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
      </ThemeProvider>
        
        </body>
    </html>
  )
}
