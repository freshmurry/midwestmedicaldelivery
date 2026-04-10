import * as React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Package, Zap, Activity, MapPin, CheckCircle2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};
const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
export function HomePage() {
  return (
    <>
      <SEO
        title="Small-Parcel Medical Courier for NWI Clinics"
        description="Fast small-parcel medical delivery for Dental, Pharmacy & Vet Clinics in Northwest Indiana. Agile Jeep Wrangler transport for sensitive small items."
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1 text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-mmc-teal/10 text-mmc-teal px-4 py-2 rounded-full text-sm font-bold tracking-tight">
                <Zap className="h-4 w-4" />
                AGILE JEEP WRANGLER TRANSPORT
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-mmc-dark leading-[1.1] tracking-tight">
                Small-Parcel Medical <span className="text-mmc-teal underline decoration-4 underline-offset-8">Courier</span> for Clinics.
              </h1>
              <p className="text-xl text-mmc-gray max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Fast, secure, and compact delivery for dental prosthetics, pharmacy prescriptions, and clinic supplies across Lake & Porter Counties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl px-10 py-7 text-lg shadow-airbnb hover:-translate-y-1 transition-all">
                  <Link to="/contact">Request Pickup</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-mmc-dark text-mmc-dark hover:bg-mmc-dark hover:text-white rounded-2xl px-10 py-7 text-lg transition-all">
                  <Link to="/services">Clinic Services</Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-4">
                {['Small Cargo Specialist', 'HIPAA Compliant', 'Fully Insured'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                    <CheckCircle2 className="h-5 w-5 text-mmc-teal" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="flex-1 w-full max-w-lg lg:max-w-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="aspect-[4/3] rounded-3xl bg-mmc-light overflow-hidden shadow-airbnb relative">
                <img
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
                  alt="Agile Jeep Wrangler Delivery Vehicle"
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mmc-teal/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Trust Stats */}
      <section className="bg-mmc-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { label: 'Precision Handling', value: '100%', sub: 'No Bulk Cargo' },
              { label: 'Clinic Hubs', value: '12+', sub: 'Active NWI Cities' },
              { label: 'Transport', value: 'Agile', sub: 'Jeep Wrangler Fleet' },
              { label: 'Service', value: '24/7', sub: 'Small Parcel Dispatch' }
            ].map((stat, i) => (
              <motion.div key={i} className="text-center space-y-1" variants={fadeIn}>
                <div className="text-3xl md:text-4xl font-black text-mmc-teal">{stat.value}</div>
                <div className="text-sm font-bold text-mmc-dark uppercase tracking-wide">{stat.label}</div>
                <div className="text-xs text-mmc-gray">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Service Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-sm font-black text-mmc-teal uppercase tracking-widest">Focused Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-mmc-dark">Precision for sensitive small cargo.</h3>
            <p className="text-lg text-mmc-gray">We've traded heavy vans for agile Jeep transport to better serve local dental, pharmacy, and outpatient clinics.</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              { icon: Package, title: 'Dental & Ortho', desc: 'Secure transport for non-biohazard crowns, molds, and retainers. We handle the bridge between the lab and your clinic.' },
              { icon: Pill, title: 'Pharmacy Precision', desc: 'Pharmacy-to-patient and office delivery for sensitive medications. Agile routing ensures zero-delay patient care.' },
              { icon: Heart, title: 'Vet & Outpatient', desc: 'Urgent supplies and document transport for veterinary and outpatient facilities that need small items fast.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-airbnb transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-mmc-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-mmc-teal transition-colors">
                  <feature.icon className="h-7 w-7 text-mmc-teal group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-mmc-dark mb-4">{feature.title}</h4>
                <p className="text-mmc-gray leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Area Callout */}
      <section className="py-24 bg-mmc-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-mmc-teal opacity-10 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black max-w-xl">Streamline small medical logistics for your office.</h2>
              <p className="text-lg text-gray-400 max-w-lg">Dedicated routes for clinics that need a courier partner who understands small-parcel precision.</p>
              <Button asChild variant="outline" className="border-mmc-teal text-mmc-teal hover:bg-mmc-teal hover:text-white rounded-xl">
                <Link to="/areas">Explore Clinic Routes</Link>
              </Button>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4 w-full md:w-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {['Munster', 'Schererville', 'Merrillville', 'Hammond'].map((city) => (
                <motion.div key={city} variants={fadeIn} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-mmc-teal" />
                  <span className="font-bold">{city}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-mmc-teal rounded-[3rem] p-12 md:p-20 text-center text-white shadow-glow relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to upgrade your clinic delivery?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Contact our small-parcel dispatch team today for immediate pickup or scheduled clinic routes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-mmc-teal hover:bg-gray-100 rounded-2xl px-10 py-7 text-lg font-bold">
                <Link to="/contact">Request Pickup</Link>
              </Button>
              <a href="tel:2195550123" className="inline-flex items-center justify-center gap-2 bg-mmc-dark text-white hover:bg-black rounded-2xl px-10 py-7 text-lg font-bold transition-all">
                Call Now: (219) 555-0123
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}