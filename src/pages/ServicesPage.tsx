import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import {
  Pill,
  FlaskConical,
  Box,
  Heart,
  Files,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
const services = [
  {
    title: 'Prescription Delivery',
    icon: Pill,
    desc: 'Rapid pharmacy-to-patient and facility delivery. Secure handling for sensitive medication and high-priority patient documentation.',
    benefits: ['Rapid Optimized Routing', 'Proof of Delivery', 'Pharmacy Verified']
  },
  {
    title: 'Dental Prosthetics',
    icon: FlaskConical,
    desc: 'Specialized handling for non-biohazard dental molds, crowns, and retainers. We bridge the gap between labs and local NWI clinics.',
    benefits: ['Gentle Handling', 'Non-Biohazard Only', 'Stat Lab Links']
  },
  {
    title: 'Small Medical Supplies',
    icon: Box,
    desc: 'Delivery of outpatient supplies, PPE, and localized medical equipment too small for big-box couriers but too sensitive for mail.',
    benefits: ['Compact Secure Cargo', 'No Bulk Crowding', 'Clinic-to-Clinic']
  },
  {
    title: 'Vet Clinic Transport',
    icon: Heart,
    desc: 'Dedicated transport for veterinary medicine, supplies, and diagnostic paperwork tailored for NWI animal hospitals.',
    benefits: ['Animal Health Focus', 'Fast Clinic Pickup', 'Local Area Experts']
  },
  {
    title: 'Inter-Office Small Deliveries',
    icon: Files,
    desc: 'Scheduled routing between local clinic campuses for physical records, small instruments, and internal clinic paperwork.',
    benefits: ['Compact & Discreet', 'Fixed Daily Routes', 'Secure Logbooks']
  },
  {
    title: 'After-Hours Precision',
    icon: Clock,
    desc: 'Emergency small-parcel response for dental labs or pharmacies needing immediate night or weekend movement of small items.',
    benefits: ['24/7 Dispatch', 'Specialized Fleet Access', 'NWI Local Focus']
  }
];
const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } }
};
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
export function ServicesPage() {
  return (
    <>
      <SEO
        title="Small-Parcel Clinic Services"
        description="Specialized medical courier services for dental labs, pharmacies, and vet clinics. Professional transport for sensitive small parcels."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <motion.div
            className="max-w-3xl mb-16 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Precision Small <span className="text-mmc-teal">Parcels.</span></h1>
            <p className="text-xl text-mmc-gray leading-relaxed">
              We focus exclusively on small, sensitive deliveries for local clinics. No bulk vans, no industrial cargo—just professional, secure transport for your office's specific needs.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-mmc-teal/20 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-mmc-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-mmc-teal transition-all duration-300 group-hover:scale-110">
                  <s.icon className="h-8 w-8 text-mmc-teal group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-mmc-dark mb-4">{s.title}</h3>
                <p className="text-mmc-gray mb-8 flex-grow leading-relaxed">{s.desc}</p>
                <div className="space-y-3">
                  {s.benefits.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                      <Zap className="h-4 w-4 text-mmc-teal" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Service Commitment with Operational Visual */}
          <motion.div
            className="mt-24 bg-mmc-dark rounded-[3rem] p-10 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mmc-teal/20 to-transparent pointer-events-none" />
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black">Built for Local Clinics</h2>
              <p className="text-lg text-gray-400">
                While we maintain full compliance, we've optimized our operations for low-PHI scenarios and non-biohazard small items that require a more delicate, professional touch than standard couriers.
              </p>
              <ul className="space-y-4">
                {[
                  'Professional medical courier fleet for urban speed',
                  'Specialized non-biohazard dental mold handling',
                  'Low-PHI pharmacy-verified protocols',
                  'Small-parcel optimized cargo areas'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <div className="w-2 h-2 bg-mmc-teal rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full relative z-10">
              <div className="aspect-square bg-mmc-light rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                  alt="MMC Secure Small Parcel Handover"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-mmc-teal p-6 md:p-10 rounded-[2.5rem] shadow-2xl animate-bounce-subtle">
                <ShieldCheck className="h-10 w-10 md:h-16 md:w-16 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}