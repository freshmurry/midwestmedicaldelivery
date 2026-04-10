import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import {
  FlaskConical,
  Pill,
  Stethoscope,
  Clock,
  ShieldCheck,
  Box,
  AlertCircle,
  Truck
} from 'lucide-react';
const services = [
  { title: 'Lab Specimen Transport', icon: FlaskConical, desc: 'Critical transportation for blood, tissue, and diagnostic samples. We maintain temperature sensitivity and strictly follow OSHA guidelines.', benefits: ['Temperature Controlled', 'Stat Options', 'Biohazard Trained'] },
  { title: 'Prescription Delivery', icon: Pill, desc: 'Pharmacy-to-patient and facility delivery. Secure handling for sensitive medication and documentation.', benefits: ['Proof of Delivery', 'Home or Facility', 'HIPAA Secure'] },
  { title: 'Medical Equipment', icon: Stethoscope, desc: 'Safe transport for sensitive devices and surgical kits between facilities or to private residences.', benefits: ['Careful Handling', 'Room of Choice', 'Assembly Support'] },
  { title: 'STAT & Emergency', icon: AlertCircle, desc: 'Immediate response for emergency deliveries. Our drivers prioritize these for under 90-minute turnaround.', benefits: ['90-min Response', '24/7 Availability', 'Dedicated Driver'] },
  { title: 'Inter-Facility Logistics', icon: Truck, desc: 'Scheduled routing between hospital campuses and clinics for documents, records, and supplies.', benefits: ['Fixed Routes', 'Daily Service', 'Bulk Savings'] },
  { title: 'Same-Day Supplies', icon: Box, desc: 'Delivery of general medical supplies, PPE, and office materials needed for daily operations.', benefits: ['Next-Hour Service', 'Bulk Cargo Space', 'Inventory Pickup'] }
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
        title="Medical Courier Services"
        description="Comprehensive medical delivery services including lab specimen transport, pharmacy delivery, STAT service, and medical equipment logistics."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <motion.div 
            className="max-w-3xl mb-16 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Specialized Medical <span className="text-mmc-teal">Logistics.</span></h1>
            <p className="text-xl text-mmc-gray leading-relaxed">
              We provide highly reliable, compliant, and fast transportation services tailored exclusively for the healthcare industry.
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
                className="flex flex-col bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-airbnb transition-all group"
              >
                <div className="w-16 h-16 bg-mmc-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-mmc-teal transition-all duration-300 group-hover:scale-110">
                  <s.icon className="h-8 w-8 text-mmc-teal group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-mmc-dark mb-4">{s.title}</h3>
                <p className="text-mmc-gray mb-8 flex-grow leading-relaxed">{s.desc}</p>
                <div className="space-y-3">
                  {s.benefits.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm font-bold text-mmc-dark">
                      <ShieldCheck className="h-4 w-4 text-mmc-teal" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Service Commitment */}
          <motion.div 
            className="mt-24 bg-mmc-dark rounded-[3rem] p-10 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mmc-teal/10 to-transparent pointer-events-none" />
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black">Our Compliance Commitment</h2>
              <p className="text-lg text-gray-400">
                In medical delivery, there is no room for error. Every member of our team undergoes rigorous background checks and continuous training in bloodborne pathogen safety and privacy laws.
              </p>
              <ul className="space-y-4">
                {[
                  'Annual HIPAA training certification',
                  'OSHA Bloodborne Pathogens compliance',
                  'Real-time chain of custody documentation',
                  'Emergency spill kit equipped vehicles'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <div className="w-2 h-2 bg-mmc-teal rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4 relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-white/10">
                <Clock className="h-10 w-10 text-mmc-teal mb-4" />
                <div className="text-3xl font-black mb-1">99.8%</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">On-Time Rate</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-white/10">
                <ShieldCheck className="h-10 w-10 text-mmc-teal mb-4" />
                <div className="text-3xl font-black mb-1">Zero</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Security Breaches</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}