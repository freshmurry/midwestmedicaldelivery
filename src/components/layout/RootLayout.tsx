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
      <Navbar />
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
      <Footer />
      {/* Mobile Sticky CTA Triggering Inquiry Modal */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Backdrop gradient with pointer-events-none to prevent touch block */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent -z-10 pointer-events-none" />
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