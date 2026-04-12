import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MessageCircle } from 'lucide-react';
import { QuickInquiryModal } from '@/components/QuickInquiryModal';
interface RootLayoutProps {
  children: React.ReactNode;
}
export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-mmc-teal selection:text-white antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-mmc-dark">
        Skip to Content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow pb-24 md:pb-0 outline-none">
        {children}
      </main>
      <Footer />
      {/* Mobile Sticky CTA Triggering Inquiry Modal */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 pointer-events-none">
        <div className="relative p-4 pointer-events-auto">
          {/* Refined gradient backdrop strictly behind the button area */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent -z-10 pointer-events-none" />
          <QuickInquiryModal
            trigger={
              <button
                className="flex items-center justify-center gap-3 w-full bg-mmc-teal text-white py-4 rounded-2xl font-bold shadow-2xl active:scale-95 transition-transform hover:bg-mmc-teal/90"
                aria-label="Open Inquiry Form"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                Contact Us
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}