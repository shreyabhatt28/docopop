import CanvasProvider from '@/Context/CanvasContext';
import './globals.css';
import Image from 'next/image';


export const metadata = {
  title: "DocoPop",
  description: "Edit your PDF files",
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='h-full w-screen m-0 p-0 '>
      <CanvasProvider>
      <body className="h-full w-full flex overflow-x-hidden flex-col">
      <header className='flex w-full fixed top-0 left-0 pt-4 pl-6 gap-2'>
        <Image src="/logo.svg" width={24} height={24} alt="docopop-logo"/>
        <Image src="/docopop-text.png" width={100} height={100} alt="docopop-logo"/>
      </header>
        <main className='flex-1 overflow-y-auto'>
        {children}
        </main>
      </body>
      </CanvasProvider>
    </html>
  );
}