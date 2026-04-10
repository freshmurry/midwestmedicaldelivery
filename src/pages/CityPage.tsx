import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  MapPin,
  Zap,
  ArrowRight,
  CheckCircle2,
  Building2,
  Clock
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { QuickInquiryModal } from '@/components/QuickInquiryModal';
import { CitySEO } from '@shared/city-data';
interface CityPageProps {
  city: CitySEO;
}
export function CityPage({ city }: CityPageProps) {
  // Guard clause to handle missing city data gracefully
  if (!city) {
    return <Navigate to="/areas" replace />;
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Midwest Medical Delivery - ${city.name}`,
    "parentOrganization": {
      "@type": "Organization",
      "name": "Midwest Medical Delivery"
    },
    "description": city.metaDescription,
    "url": `https://midwestmedicaldelivery.com/${city.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": "IN"
    },
    "areaServed": `${city.name}, IN`
  };
  return (
    <>
      <SEO
        title={city.heroTitle}
        description={city.metaDescription}
        canonical={`/${city.slug}`}
        schema={schema}
      />
      {/* Hero Section */}
      <section className="bg-white pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="flex-1 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mmc-gray">
                <Link to="/areas" className="hover:text-mmc-teal transition-colors">Service Areas</Link>
                <span>/</span>
                <span className="text-mmc-teal">{city.name}, IN</span>
              </nav>
              <h1 className="text-5xl md:text-7xl font-black text-mmc-dark leading-tight tracking-tight">
                Medical Courier <br />
                <span className="text-mmc-teal underline decoration-4 underline-offset-8">
                  {city.name}, IN
                </span>
              </h1>
              <p className="text-xl text-mmc-gray leading-relaxed max-w-xl">
                Midwest Medical Delivery provides specialized professional medical logistics for {city.name} clinics, pharmacies, and dental practices. Secure and HIPAA compliant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl px-10 py-7 text-lg font-bold shadow-lg h-auto">
                  <Link to="/contact">Request {city.name} Pickup</Link>
                </Button>
                <QuickInquiryModal
                  trigger={
                    <Button variant="outline" size="lg" className="border-2 border-mmc-dark text-mmc-dark hover:bg-mmc-dark hover:text-white rounded-2xl px-10 py-7 text-lg font-bold h-auto">
                      Get Local Quote
                    </Button>
                  }
                />
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                  <ShieldCheck className="h-5 w-5 text-mmc-teal" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                  <Clock className="h-5 w-5 text-mmc-teal" />
                  STAT Available
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-mmc-light">
                <div className="absolute inset-0 bg-mmc-teal/5 z-0" />
                <div className="absolute inset-0 flex items-center justify-center z-10 p-12">
                   <div className="text-center space-y-6">
                      <MapPin className="h-20 w-20 text-mmc-teal mx-auto animate-bounce-subtle" />
                      <div className="space-y-2">
                        <div className="text-2xl font-black text-mmc-dark italic uppercase tracking-tighter">Lake County Core</div>
                        <div className="text-sm font-bold text-mmc-gray uppercase tracking-widest">{city.name} Regional Sector</div>
                      </div>
                   </div>
                </div>
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 20 L100 80 M0 50 L100 50 M0 80 L100 20" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Content Section */}
      <section className="py-24 bg-mmc-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-mmc-dark mb-8">
                  Medical Delivery Specialists in <span className="text-mmc-teal">{city.name}</span>
                </h2>
                {city.aboutText?.split('\n\n').map((para, i) => (
                  <p key={i} className="text-mmc-gray text-lg leading-relaxed mb-6">
                    {para}
                  </p>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <Building2 className="h-8 w-8 text-mmc-teal mb-4" />
                  <h3 className="text-xl font-bold text-mmc-dark mb-2">Local Landmarks</h3>
                  <ul className="space-y-2">
                    {city.landmarks?.map((mark, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-mmc-gray font-medium">
                        <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full" />
                        {mark}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <Zap className="h-8 w-8 text-mmc-teal mb-4" />
                  <h3 className="text-xl font-bold text-mmc-dark mb-2">Service Intensity</h3>
                  <p className="text-sm text-mmc-gray leading-relaxed">
                    High-density routing in the {city.name} sector ensures we can provide rapid pickups for healthcare facilities across Lake County.
                  </p>
                </div>
              </div>
            </div>
            <aside className="space-y-8">
              <div className="bg-mmc-dark p-8 rounded-[2.5rem] text-white space-y-6">
                <h3 className="text-2xl font-black tracking-tight">Standard Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'HIPAA & OSHA 10 Certified',
                    'Chain-of-Custody Protocols',
                    'Professional Medical Fleet',
                    'Clinic Route Optimization',
                    'Real-Time Dispatch Logs',
                    'Regional Local Expertise'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle2 className="h-5 w-5 text-mmc-teal shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                   <Button asChild className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-xl py-6 font-bold shadow-lg">
                      <Link to="/contact">Contact Support</Link>
                   </Button>
                </div>
              </div>
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-center">
                <h4 className="text-sm font-black text-mmc-dark uppercase tracking-widest mb-4">Need a regular route?</h4>
                <p className="text-xs text-mmc-gray mb-6 font-bold leading-relaxed">
                  We specialize in daily scheduled pickups for {city.name} dental offices and outpatient facilities.
                </p>
                <QuickInquiryModal
                  trigger={
                    <Button variant="link" className="text-mmc-teal font-black p-0 h-auto gap-2 group">
                      Inquire About Routes
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}