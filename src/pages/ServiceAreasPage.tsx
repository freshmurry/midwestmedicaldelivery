import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { MapPin, Navigation, Info } from 'lucide-react';
import { QuickInquiryModal } from '@/components/QuickInquiryModal';
import { Button } from '@/components/ui/button';
import { CityMap } from '@/components/CityMap';
import { CITY_DATA } from '@shared/city-data';
export function ServiceAreasPage() {
  const { hash } = useLocation();
  const regions = Object.values(CITY_DATA);
  React.useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);
  return (
    <>
      <SEO
        title="Regional Coverage Map"
        description="Professional medical delivery for Dental, Pharmacy, and Vet clinics across Gary, Hammond, Munster, and the Northwest Indiana region."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="max-w-3xl mb-12 md:mb-16 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mmc-teal/10 text-mmc-teal text-xs font-bold uppercase tracking-widest">
              <Navigation className="h-3 w-3" />
              Service Coverage Area
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-mmc-dark leading-tight">
              Regional <span className="text-mmc-teal">Network.</span>
            </h1>
            <p className="text-lg md:text-xl text-mmc-gray leading-relaxed max-w-2xl">
              Our professional medical fleet is strategically positioned to serve local clinics and regional hubs with unparalleled local speed.
            </p>
          </div>
          {/* Lake County Map Section */}
          <div className="mb-24 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-sm font-black text-mmc-teal uppercase tracking-widest">Interactive Network</h2>
                <h3 className="text-3xl md:text-4xl font-black text-mmc-dark">Lake County Coverage</h3>
              </div>
              <p className="text-xs font-bold text-mmc-gray uppercase tracking-wider max-w-[200px] sm:text-right">
                Explore our clinic logistics network across Northwest Indiana.
              </p>
            </div>
            <CityMap />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regions.map((city) => (
              <section
                key={city.slug}
                id={city.slug}
                className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 scroll-mt-24 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center group-hover:bg-mmc-teal transition-colors shrink-0">
                    <MapPin className="h-6 w-6 text-mmc-teal group-hover:text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-mmc-dark group-hover:text-mmc-teal transition-colors leading-tight">
                    {city.name}, IN
                  </h2>
                </div>
                <p className="text-mmc-gray text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  {city.metaDescription}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-mmc-teal bg-mmc-teal/5 w-fit px-3 py-1.5 rounded-full">
                    <Info className="h-3.5 w-3.5" />
                    Clinic Routes Available
                  </div>
                  <Link
                    to={`/${city.slug}`}
                    className="inline-flex items-center text-sm font-black text-mmc-dark hover:text-mmc-teal transition-colors"
                  >
                    View City Details <Navigation className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </section>
            ))}
          </div>
          <div className="mt-16 md:mt-24 p-8 md:p-16 bg-mmc-dark rounded-[2.5rem] md:rounded-[4rem] text-center space-y-6 md:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mmc-teal opacity-10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-black text-white relative z-10">Local Clinic Provider?</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed relative z-10">
              We specialize in regional clinical logistics. If your facility is within our coverage area, we have a solution for your secure delivery needs.
            </p>
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