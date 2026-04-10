import * as React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { MapPin, Navigation, Info } from 'lucide-react';
import { QuickInquiryModal } from '@/components/QuickInquiryModal';
import { Button } from '@/components/ui/button';
const regions = [
  {
    city: 'Gary',
    description: 'Serving dental offices and local pharmacies across Gary, IN. We prioritize fast transport for orthodontic molds and prescriptions through the downtown medical corridor.'
  },
  {
    city: 'Hammond',
    description: 'Expert dental and pharmacy courier routes in Hammond. Our professional courier units navigate local clinics along Calumet Ave with precision small-parcel handling.'
  },
  {
    city: 'Munster',
    description: 'Dedicated small-parcel logistics for the Munster dental and medical corridor. Reliable delivery for outpatient centers and specialist dental offices daily.'
  },
  {
    city: 'Schererville',
    description: 'Precision vet and pharmacy delivery for Schererville providers. We ensure small, sensitive items reach your clinic without the delay of traditional large couriers.'
  },
  {
    city: 'Merrillville',
    description: 'Hub for clinic-to-clinic small deliveries in Merrillville. Supporting dental labs and independent pharmacies with frequent, secure medical transport routes.'
  },
  {
    city: 'Crown Point',
    description: 'Fast clinic courier service across Crown Point. From dental crowns to urgent prescriptions, we provide secure transport for the city\'s medical community.'
  },
  {
    city: 'Hobart',
    description: 'Specialized outpatient delivery in Hobart. We support local vet clinics and small dental practices with HIPAA-compliant small-parcel logistics.'
  },
  {
    city: 'East Chicago',
    description: 'Reliable pharmacy and dental delivery for East Chicago. Our professional medical transport fleet prioritizes safety and speed for small medical parcels.'
  },
  {
    city: 'Highland',
    description: 'Focused courier services for Highland dental and pharmacy hubs. Seamless integration for your daily outpatient delivery needs.'
  },
  {
    city: 'Dyer',
    description: 'Trusted partner for small clinics in Dyer. Secure transport for sensitive dental prosthetics and patient-ready prescriptions.'
  },
  {
    city: 'St. John',
    description: 'Premium small-parcel delivery for the growing St. John dental and medical landscape. Precision handling for high-value small medical cargo.'
  }
];
export function ServiceAreasPage() {
  return (
    <>
      <SEO
        title="NWI Clinic Coverage Map"
        description="Fast professional delivery for Dental, Pharmacy, and Vet clinics in Gary, Hammond, Munster, and across Northwest Indiana. View our coverage area."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="max-w-3xl mb-12 md:mb-16 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mmc-teal/10 text-mmc-teal text-xs font-bold uppercase tracking-widest">
              <Navigation className="h-3 w-3" />
              Clinic Coverage Map
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-mmc-dark leading-tight">
              Northwest Indiana <span className="text-mmc-teal">Network.</span>
            </h1>
            <p className="text-lg md:text-xl text-mmc-gray leading-relaxed max-w-2xl">
              Our professional courier fleet is strategically positioned to serve Lake and Porter County dental labs, pharmacies, and outpatient clinics with unparalleled speed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regions.map((region, i) => (
              <section key={i} className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-airbnb hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-mmc-teal transition-colors">
                    <MapPin className="h-6 w-6 text-mmc-teal group-hover:text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-mmc-dark group-hover:text-mmc-teal transition-colors leading-tight">
                    {region.city}, IN
                  </h2>
                </div>
                <p className="text-mmc-gray text-sm md:text-base leading-relaxed mb-6 min-h-[80px]">
                  {region.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-mmc-teal bg-mmc-teal/5 w-fit px-3 py-1.5 rounded-full">
                  <Info className="h-3.5 w-3.5" />
                  Clinic Routes Available
                </div>
              </section>
            ))}
          </div>
          <div className="mt-16 md:mt-24 p-8 md:p-16 bg-mmc-dark rounded-[2.5rem] md:rounded-[4rem] text-center space-y-6 md:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mmc-teal opacity-10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-white">Dental, Pharmacy, or Vet Clinic?</h2>
              <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                We specialize in professional courier routes for small-facility needs. If you're in Lake, Porter, or the Chicagoland border, we've got you covered.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <QuickInquiryModal
                trigger={
                  <Button size="lg" className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl px-8 h-14 text-lg font-bold w-full sm:w-auto">
                    Get Route Quote
                  </Button>
                }
              />
              <Button asChild variant="outline" className="border-2 border-white/20 text-white font-bold hover:bg-white/10 rounded-2xl px-8 h-14 text-lg w-full sm:w-auto transition-colors">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}