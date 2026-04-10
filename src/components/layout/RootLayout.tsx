import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Phone } from 'lucide-react';
interface RootLayoutProps {
  children: React.ReactNode;
}
export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-mmc-teal selection:text-white">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-40 bg-gradient-to-t from-white via-white/80 to-transparent">
        <a 
          href="tel:2195550123"
          className="flex items-center justify-center gap-3 w-full bg-mmc-teal text-white py-4 rounded-2xl font-bold shadow-airbnb active:scale-95 transition-transform"
        >
          <Phone className="h-5 w-5 fill-current" />
          Call Dispatch Now
        </a>
      </div>
    </div>
  );
}