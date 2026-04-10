import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Package, Zap } from 'lucide-react';
const cities = [
  'Gary', 'Hammond', 'East Chicago', 'Munster', 'Highland',
  'Schererville', 'Dyer', 'Merrillville', 'Crown Point', 'St. John', 'Hobart'
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
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-mmc-dark">MMC</span>
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-mmc-teal -skew-x-12" />
                <div className="w-0.5 h-4 bg-mmc-teal -skew-x-12 opacity-60" />
              </div>
            </div>
            <p className="text-mmc-gray text-sm leading-relaxed">
              Specialized small-parcel medical courier utilizing agile Jeep transport for dental, pharmacy, and outpatient clinics across NWI.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-mmc-dark shadow-sm">
                <Package className="h-4 w-4 text-mmc-teal" />
                SMALL CARGO ONLY
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-mmc-dark shadow-sm">
                <Zap className="h-4 w-4 text-mmc-teal" />
                AGILE JEEP FLEET
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
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Clinic Coverage</h3>
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
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Small Parcel Dispatch</h3>
            <div className="space-y-4">
              <p className="text-mmc-gray text-sm">
                Local NWI Clinic Specialist
              </p>
              <a href="tel:2195550123" className="block text-mmc-dark font-bold hover:text-mmc-teal transition-colors">
                (219) 555-0123
              </a>
              <p className="text-mmc-gray text-sm">
                Optimized for Small Sensitive Items
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-mmc-gray leading-relaxed text-center max-w-4xl mx-auto">
            Midwest Medical Delivery (MMC) provides premium small-medical courier services in Gary, Hammond, Munster, and across Northwest Indiana. We specialize in non-biohazard delivery of dental crowns, prosthetics, pharmacy prescriptions, and vet supplies. Our agile Jeep Wrangler fleet ensures precision handling for small, sensitive items where traditional large vans fail. Fully HIPAA compliant even for low-PHI clinic scenarios across Lake and Porter Counties.
          </p>
          <div className="mt-6 text-center text-xs text-mmc-gray">
            © {new Date().getFullYear()} Midwest Medical Delivery. Licensed & Insured. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}