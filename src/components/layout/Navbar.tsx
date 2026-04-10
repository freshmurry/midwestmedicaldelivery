import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Service Areas', path: '/areas' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-mmc-dark">
                MMC
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-6 bg-mmc-teal -skew-x-12" />
              <div className="w-1 h-6 bg-mmc-teal -skew-x-12 opacity-70" />
              <div className="w-1 h-6 bg-mmc-teal -skew-x-12 opacity-40" />
            </div>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-mmc-teal",
                  location.pathname === link.path 
                    ? "text-mmc-teal" 
                    : "text-mmc-dark"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-full px-6">
              <Link to="/contact">Request Delivery</Link>
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-mmc-dark hover:text-mmc-teal transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-4 px-4 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-lg font-medium py-2",
                location.pathname === link.path ? "text-mmc-teal" : "text-mmc-dark"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-xl py-6 text-lg">
            <Link to="/contact" onClick={() => setIsOpen(false)}>Request Delivery</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}