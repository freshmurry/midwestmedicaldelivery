import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, Activity, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
export function HomePage() {
  return (
    <>
      <SEO
        title="Fast & Secure Medical Courier"
        description="Reliable medical courier services in Northwest Indiana. HIPAA compliant specimen transport, prescription delivery, and medical equipment logistics."
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-flex items-center gap-2 bg-mmc-teal/10 text-mmc-teal px-4 py-2 rounded-full text-sm font-bold tracking-tight">
                <Activity className="h-4 w-4" />
                NOW SERVING ALL OF NORTHWEST INDIANA
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-mmc-dark leading-[1.1] tracking-tight">
                Reliable Medical <span className="text-mmc-teal underline decoration-4 underline-offset-8">Delivery</span> Solutions.
              </h1>
              <p className="text-xl text-mmc-gray max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Fast, secure, and HIPAA-compliant courier services for labs, pharmacies, and healthcare providers in Lake & Porter Counties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl px-10 py-7 text-lg shadow-airbnb hover:-translate-y-1 transition-all">
                  <Link to="/contact">Request Delivery</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-mmc-dark text-mmc-dark hover:bg-mmc-dark hover:text-white rounded-2xl px-10 py-7 text-lg transition-all">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                  <CheckCircle2 className="h-5 w-5 text-mmc-teal" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                  <CheckCircle2 className="h-5 w-5 text-mmc-teal" />
                  OSHA 10 Certified
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                  <CheckCircle2 className="h-5 w-5 text-mmc-teal" />
                  Fully Insured
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg lg:max-w-none animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="aspect-[4/3] rounded-3xl bg-mmc-light overflow-hidden shadow-airbnb relative">
                <img
                  src="https://images.unsplash.com/photo-1541123287012-70691500f48f?auto=format&fit=crop&q=80&w=800"
                  alt="MMC Professional Delivery Vehicle"
                  className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mmc-teal/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trust Stats */}
      <section className="bg-mmc-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Delivery Time', value: '< 90m', sub: 'For STAT requests' },
              { label: 'Compliance', value: '100%', sub: 'HIPAA & OSHA' },
              { label: 'Coverage', value: '12+', sub: 'NWI Cities' },
              { label: 'Service', value: '24/7', sub: 'Emergency Support' }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-black text-mmc-teal">{stat.value}</div>
                <div className="text-sm font-bold text-mmc-dark uppercase tracking-wide">{stat.label}</div>
                <div className="text-xs text-mmc-gray">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Service Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-black text-mmc-teal uppercase tracking-widest">Why Choose MMC</h2>
            <h3 className="text-4xl md:text-5xl font-black text-mmc-dark">Precision handling for precious cargo.</h3>
            <p className="text-lg text-mmc-gray">We aren't just a delivery service. We are a specialized extension of your healthcare facility.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Strict Compliance',
                desc: 'Every driver is HIPAA trained and OSHA 10 certified, ensuring chain of custody and biohazard safety.'
              },
              {
                icon: Clock,
                title: 'Unmatched Speed',
                desc: 'Our STAT delivery protocols guarantee the fastest possible transport for time-sensitive lab specimens.'
              },
              {
                icon: Truck,
                title: 'Real-time Reliability',
                desc: 'Modern tracking and dedicated dispatch ensure you always know exactly where your delivery is.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-airbnb transition-all duration-300 group">
                <div className="w-14 h-14 bg-mmc-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-mmc-teal transition-colors">
                  <feature.icon className="h-7 w-7 text-mmc-teal group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-mmc-dark mb-4">{feature.title}</h4>
                <p className="text-mmc-gray leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Area Callout */}
      <section className="py-24 bg-mmc-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-mmc-teal opacity-10 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black max-w-xl">Localized expertise across Northwest Indiana.</h2>
              <p className="text-lg text-gray-400 max-w-lg">From Merrillville to Crown Point, we know the NWI medical corridor like the back of our hand.</p>
              <Button asChild variant="outline" className="border-mmc-teal text-mmc-teal hover:bg-mmc-teal hover:text-white rounded-xl">
                <Link to="/areas">View Coverage Map</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {['Munster', 'Schererville', 'Merrillville', 'Hammond'].map((city) => (
                <div key={city} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-mmc-teal" />
                  <span className="font-bold">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-mmc-teal rounded-[3rem] p-12 md:p-20 text-center text-white shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to streamline your medical logistics?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Contact us today for a custom quote or to request an immediate pickup.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-mmc-teal hover:bg-gray-100 rounded-2xl px-10 py-7 text-lg font-bold">
                <Link to="/contact">Request a Pickup</Link>
              </Button>
              <a href="tel:2195550123" className="inline-flex items-center justify-center gap-2 bg-mmc-dark text-white hover:bg-black rounded-2xl px-10 py-7 text-lg font-bold transition-all">
                Call Now: (219) 555-0123
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}