import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Package, ShieldAlert } from 'lucide-react';
import { Logo } from '@/components/Logo';
const cities = [
  'Gary', 'Hammond', 'Munster', 'Highland', 'Schererville', 'Dyer', 'Merrillville', 'Crown Point', 'East Chicago', 'Hobart'
];
const navigationMapping = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Service Areas', path: '/areas' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
export function Footer() {
  return (
    <footer className="bg-mmc-light border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Certs */}
          <div className="space-y-6">
            <Logo className="h-12" variant="primary" />
            <p className="text-mmc-gray text-sm leading-relaxed">
              Specialized small-parcel medical courier for Lake County & Northwest Indiana. Serving dental, pharmacy, and clinic hubs with HIPAA and OSHA 10 compliance.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-mmc-dark shadow-sm">
                <Package className="h-3.5 w-3.5 text-mmc-teal" />
                SMALL CARGO ONLY
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-mmc-dark shadow-sm">
                <ShieldAlert className="h-3.5 w-3.5 text-mmc-teal" />
                OSHA 10 CERTIFIED
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-mmc-dark shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-mmc-teal" />
                HIPAA COMPLIANT
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              {navigationMapping.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-mmc-gray hover:text-mmc-teal transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Service Areas */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Lake County Coverage</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {cities.map((city) => (
                <Link key={city} to="/areas" className="text-mmc-gray hover:text-mmc-teal transition-colors text-sm">
                  {city}, IN
                </Link>
              ))}
            </div>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Dispatch Support</h3>
            <div className="space-y-4">
              <p className="text-mmc-gray text-sm">
                Lake County Clinic Specialist
              </p>
              <Link to="/contact" className="block text-mmc-dark font-bold hover:text-mmc-teal transition-colors underline decoration-mmc-teal/30 underline-offset-4">
                Submit Delivery Request
              </Link>
              <p className="text-mmc-gray text-xs">
                Inquiries are monitored 24/7 for clinic partners.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-mmc-gray leading-relaxed text-center max-w-4xl mx-auto">
            Midwest Medical Delivery (MMC) provides specialized small-medical courier services in Gary, Hammond, Munster, and across Lake County, Indiana. We focus on non-biohazard delivery of dental crowns, prosthetics, and pharmacy prescriptions for outpatient facilities. Our professional fleet ensures precision handling for sensitive small items across the NWI region. Fully HIPAA compliant and OSHA 10 safety certified.
          </p>
          <div className="mt-6 text-center text-xs text-mmc-gray">
            © {new Date().getFullYear()} Midwest Medical Delivery. Licensed & Insured. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}