import * as React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Package, Zap, CheckCircle2, ShieldCheck, Box, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { QuickInquiryModal } from '@/components/QuickInquiryModal';
import { Logo } from '@/components/Logo';
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Midwest Medical Delivery",
    "description": "Professional medical delivery for Dental, Pharmacy & Vet Clinics in Northwest Indiana.",
    "url": "https://midwestmedicaldelivery.com",
    "email": "dispatch@midwestmedicaldelivery.com",
    "areaServed": [
      "Gary, IN", "Hammond, IN", "East Chicago, IN", "Munster, IN", 
      "Highland, IN", "Schererville, IN", "Dyer, IN", "Merrillville, IN", 
      "Crown Point, IN", "St. John, IN", "Hobart, IN", "Whiting, IN", 
      "Cedar Lake, IN", "Griffith, IN"
    ],
    "openingHours": "Mo-Su 00:00-23:59"
  };
  return (
    <>
      <SEO
        title="Regional Medical Delivery Specialist"
        description="Professional medical delivery for Dental, Pharmacy & Vet Clinics in Northwest Indiana. Secure transport for sensitive clinical materials across the region."
        schema={schema}
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
                MIDWEST MEDICAL DELIVERY
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-mmc-dark leading-[1.1] tracking-tight">
                Secure Medical <span className="text-mmc-teal underline decoration-4 underline-offset-8">Delivery</span>
              </h1>
              <p className="text-xl text-mmc-gray max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Fast, secure, and professional delivery for dental prosthetics, pharmacy prescriptions, and clinic supplies across Northwest Indiana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="z-10 bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl px-10 py-7 text-lg shadow-lg hover:-translate-y-1 transition-all">
                  <Link to="/contact">Request Pickup</Link>
                </Button>
                <QuickInquiryModal
                  trigger={
                    <Button variant="outline" size="lg" className="z-10 border-2 border-mmc-dark text-mmc-dark hover:bg-mmc-dark hover:text-white rounded-2xl px-10 py-7 text-lg transition-all shadow-sm hover:shadow-md">
                      Get Route Quote
                    </Button>
                  }
                />
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-4">
                {['Clinic Optimized', 'HIPAA Compliant', 'Regional Focus'].map((text, i) => (
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
              <div className="aspect-[4/3] rounded-3xl bg-mmc-light overflow-hidden shadow-xl relative">
                <img
                  src="https://images.unsplash.com/photo-1566274360936-692e10aa39f4?auto=format&fit=crop&q=80&w=1200"
                  alt="Midwest Medical Delivery Professional Vehicle"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                  style={{ objectPosition: 'center 40%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mmc-teal/10 to-transparent pointer-events-none" />
                <div className="absolute top-6 right-6 z-10">
                  <Logo variant="alt" showText={false} className="shadow-2xl ring-1 ring-black/5 backdrop-blur-sm" />
                </div>
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
              { label: 'Regional', value: '100%', sub: 'Local Hub focus' },
              { label: 'Clinic Partners', value: '50+', sub: 'NWI Coverage' },
              { label: 'Transport', value: 'Secure', sub: 'Clinical focus' },
              { label: 'Response', value: 'Instant', sub: 'Dispatch Monitoring' }
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
      {/* Operational Precision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div
              className="flex-1 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <h2 className="text-sm font-black text-mmc-teal uppercase tracking-widest">Operational Proof</h2>
                <h3 className="text-4xl md:text-5xl font-black text-mmc-dark leading-tight">Hand-to-Hand <span className="text-mmc-teal">Security.</span></h3>
                <p className="text-xl text-mmc-gray leading-relaxed">
                  Our couriers are trained medical logistics professionals. We specialize in the high-stakes handover of dental molds and sensitive prescriptions directly to your clinic staff.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: 'Chain of Custody', text: 'Logged handovers for all PHI-sensitive items.' },
                  { icon: Box, title: 'Clinic Logistics', text: 'Optimized for dental lab materials and pharmacy bags.' },
                ].map((item, i) => (
                  <li key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-mmc-teal">
                      <item.icon className="h-5 w-5" />
                      <span className="font-black uppercase tracking-wider text-xs">{item.title}</span>
                    </div>
                    <p className="text-sm text-mmc-gray">{item.text}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="border-2 border-mmc-teal text-mmc-teal hover:bg-mmc-teal hover:text-white rounded-xl py-6 px-8 transition-all font-bold">
                <Link to="/about">Our Certification Standards</Link>
              </Button>
            </motion.div>
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-mmc-teal/5 rounded-[2.5rem] -z-10 group-hover:bg-mmc-teal/10 transition-colors" />
                <div className="aspect-video rounded-3xl overflow-hidden shadow-airbnb relative">
                  <img
                    src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1200"
                    alt="Midwest Medical Delivery Delivering Clinical Packages"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Service Highlights */}
      <section className="py-24 bg-mmc-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-sm font-black text-mmc-teal uppercase tracking-widest">Focused Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-mmc-dark">Built for Regional Clinics.</h3>
            <p className="text-lg text-mmc-gray">Refined logistics specifically for regional dental offices and pharmacies.</p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              { icon: Package, title: 'Dental & Ortho', desc: 'Secure transport for crowns, molds, and retainers between labs and clinics.' },
              { icon: Pill, title: 'Pharmacy Routing', desc: 'High-priority prescription delivery for facilities that need a dedicated professional partner.' },
              { icon: Heart, title: 'Vet & Supplies', desc: 'Urgent supplies and document transport for veterinary hospitals throughout the NWI region.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
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
      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-mmc-teal rounded-[3rem] p-12 md:p-20 text-center text-white shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Upgrade Your Regional Logistics.</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10">Contact our dispatch team today for immediate pickup or scheduled clinic routes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button asChild size="lg" className="bg-white text-mmc-teal hover:bg-gray-100 rounded-2xl px-10 py-7 text-lg font-bold">
                <Link to="/contact">Request Pickup</Link>
              </Button>
              <QuickInquiryModal
                trigger={
                  <Button size="lg" className="bg-mmc-dark text-white hover:bg-black rounded-2xl px-10 py-7 text-lg font-bold transition-all">
                    Request Quote
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}