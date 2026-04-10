import * as React from 'react';
import { SEO } from '@/components/SEO';
import { MapPin, Navigation, Info } from 'lucide-react';
import { QuickInquiryModal } from '@/components/QuickInquiryModal';
import { Button } from '@/components/ui/button';
const regions = [
  {
    city: 'Gary',
    description: 'Providing rapid lab transport and pharmaceutical delivery for Gary, IN hospitals and community clinics. We navigate the Broadway and Miller corridors daily for on-time specimen pickup.'
  },
  {
    city: 'Hammond',
    description: 'Dedicated medical courier routes across Hammond, Indiana. We specialize in serving medical offices near the Calumet and Indianapolis Blvd healthcare hubs with 24/7 STAT support.'
  },
  {
    city: 'Munster',
    description: 'Serving the premier Munster medical corridor. Reliable transportation for diagnostic clinics and specialist offices throughout Munster, IN, including immediate inter-facility transfers.'
  },
  {
    city: 'Schererville',
    description: 'Efficient medical logistics for Schererville, Indiana providers. Our couriers are experts in the US-30 corridor, ensuring specimens reach their destination without traffic delays.'
  },
  {
    city: 'Merrillville',
    description: 'Hub for medical transport in Merrillville, IN. We support large-scale medical centers and independent labs with frequent daily routes and emergency supply delivery.'
  },
  {
    city: 'Crown Point',
    description: 'Fast, secure medical delivery across Crown Point, Indiana. From the historic square to new medical developments, we offer comprehensive coverage for the Lake County seat.'
  },
  {
    city: 'Hobart',
    description: 'Reliable healthcare delivery solutions in Hobart, IN. Our HIPAA-trained drivers serve the medical communities surrounding St. Mary Medical Center and beyond.'
  },
  {
    city: 'East Chicago',
    description: 'Crucial medical courier services for East Chicago healthcare providers. We prioritize safe transport through the industrial and residential corridors of East Chicago, IN.'
  },
  {
    city: 'Highland',
    description: 'Focused delivery services for Highland, Indiana medical clinics. We provide seamless integration with your office schedule for daily laboratory specimen pickups.'
  },
  {
    city: 'Dyer',
    description: 'Trusted partner for medical facilities in Dyer, IN. Secure, timely transport for dialysis centers and rehabilitation clinics in the border town area.'
  },
  {
    city: 'St. John',
    description: 'Premium medical courier service for the growing healthcare landscape in St. John, Indiana. Ensuring patient privacy and safety with every delivery.'
  }
];
export function ServiceAreasPage() {
  return (
    <>
      <SEO
        title="Service Areas in Northwest Indiana"
        description="We provide medical courier services in Gary, Hammond, Munster, Merrillville, Crown Point, and across Northwest Indiana. View our full coverage map."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="max-w-3xl mb-12 md:mb-16 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mmc-teal/10 text-mmc-teal text-xs font-bold uppercase tracking-widest">
              <Navigation className="h-3 w-3" />
              Regional Coverage
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-mmc-dark leading-tight">
              Northwest Indiana <span className="text-mmc-teal">Coverage.</span>
            </h1>
            <p className="text-lg md:text-xl text-mmc-gray leading-relaxed max-w-2xl">
              We are strategically located to serve the entire Lake and Porter County medical communities with speed, security, and local expertise.
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
                  STAT Service Available
                </div>
              </section>
            ))}
          </div>
          <div className="mt-16 md:mt-24 p-8 md:p-16 bg-mmc-dark rounded-[2.5rem] md:rounded-[4rem] text-center space-y-6 md:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mmc-teal opacity-10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-white">Don't see your city listed?</h2>
              <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                We frequently extend our coverage into Valparaiso, Chesterton, and the South Chicago suburbs for dedicated clients.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <QuickInquiryModal 
                trigger={
                  <Button size="lg" className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl px-8 h-14 text-lg font-bold w-full sm:w-auto">
                    Check Custom Route
                  </Button>
                }
              />
              <a 
                href="tel:2195550123" 
                className="inline-flex items-center justify-center h-14 px-8 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                Call Dispatch
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}