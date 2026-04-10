import React from 'react';
import { SEO } from '@/components/SEO';
import { MapPin, Navigation } from 'lucide-react';
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
        <div className="py-16 md:py-24">
          <div className="max-w-3xl mb-20 space-y-6">
            <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Northwest Indiana <span className="text-mmc-teal">Coverage.</span></h1>
            <p className="text-xl text-mmc-gray leading-relaxed">
              We are strategically located to serve the entire Lake and Porter County medical communities with speed and efficiency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, i) => (
              <section key={i} className="bg-mmc-light rounded-3xl p-8 border border-transparent hover:border-mmc-teal/20 transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <MapPin className="h-5 w-5 text-mmc-teal" />
                  </div>
                  <h2 className="text-2xl font-black text-mmc-dark">Medical Courier in {region.city}, Indiana</h2>
                </div>
                <p className="text-mmc-gray leading-relaxed mb-6">
                  {region.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-mmc-teal">
                  <Navigation className="h-4 w-4" />
                  90-Min STAT Service Available
                </div>
              </section>
            ))}
          </div>
          <div className="mt-24 p-12 bg-white border-2 border-dashed border-gray-200 rounded-[3rem] text-center space-y-8">
            <h2 className="text-3xl font-black text-mmc-dark">Don't see your city listed?</h2>
            <p className="text-lg text-mmc-gray max-w-xl mx-auto">
              We frequently handle deliveries extending into Valparaiso, Chesterton, and the South Chicago suburbs. Contact our dispatch to verify coverage for your specific route.
            </p>
            <div className="flex justify-center">
              <a href="tel:2195550123" className="bg-mmc-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-mmc-teal transition-colors">
                Call for Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}