import CanvasProvider from '@/Context/CanvasContext';
import './globals.css';


export const metadata = {
  title: "DocoPop",
  description: "Edit your PDF files",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='h-full w-screen m-0 p-0 bg-slate-50'>
      <CanvasProvider>
      <body className="min-h-full w-full flex overflow-x-hidden">
        <main className='flex-1 overflow-y-auto'>
        {children}
        </main>
      </body>
      </CanvasProvider>
    </html>
  );
}