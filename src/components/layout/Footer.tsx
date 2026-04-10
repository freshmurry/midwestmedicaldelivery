import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Clock } from 'lucide-react';
const cities = [
  'Gary', 'Hammond', 'East Chicago', 'Munster', 'Highland', 
  'Schererville', 'Dyer', 'Merrillville', 'Crown Point', 'St. John', 'Hobart'
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
              Professional medical courier services providing secure, timely, and compliant delivery solutions across Northwest Indiana.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-mmc-dark shadow-sm">
                <ShieldCheck className="h-4 w-4 text-mmc-teal" />
                HIPAA COMPLIANT
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-mmc-dark shadow-sm">
                <ShieldCheck className="h-4 w-4 text-mmc-teal" />
                OSHA 10 CERTIFIED
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Service Areas', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-mmc-gray hover:text-mmc-teal transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Service Areas */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Coverage</h3>
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
            <h3 className="text-sm font-black text-mmc-dark uppercase tracking-wider mb-6">Dispatch</h3>
            <div className="space-y-4">
              <p className="text-mmc-gray text-sm">
                Northwest Indiana & Chicagoland Area
              </p>
              <a href="tel:2195550123" className="block text-mmc-dark font-bold hover:text-mmc-teal transition-colors">
                (219) 555-0123
              </a>
              <p className="text-mmc-gray text-sm">
                24/7 Availability for STAT Deliveries
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-mmc-gray leading-relaxed text-center max-w-4xl mx-auto">
            Midwest Medical Delivery (MMC) provides premium medical courier services in Gary, Hammond, East Chicago, Munster, Highland, Schererville, Dyer, Merrillville, Crown Point, St. John, and Hobart, Indiana. We specialize in HIPAA-compliant specimen transport, prescription delivery, and medical equipment logistics. Our drivers are OSHA 10 certified and trained in biohazard handling, ensuring the highest standards of safety and reliability for healthcare facilities across Lake and Porter Counties.
          </p>
          <div className="mt-6 text-center text-xs text-mmc-gray">
            © {new Date().getFullYear()} Midwest Medical Delivery. All rights reserved. Licensed & Insured.
          </div>
        </div>
      </div>
    </footer>
  );
}