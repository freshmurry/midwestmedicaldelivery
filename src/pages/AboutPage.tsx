import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Award, ShieldCheck, Zap, Package } from 'lucide-react';
export function AboutPage() {
  return (
    <>
      <SEO
        title="About Our Small-Parcel Specialty"
        description="Learn how MMC specializes in professional medical delivery for dental offices, pharmacies, and vet clinics in Northwest Indiana."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Specialized for <span className="text-mmc-teal">Clinics.</span></h1>
              <p className="text-xl text-mmc-gray leading-relaxed">
                Midwest Medical Delivery (MMC) was founded to fill the gap in medical logistics: a courier that treats small dental prosthetics and pharmacy prescriptions with the precision they deserve.
              </p>
              <p className="text-lg text-mmc-gray leading-relaxed">
                We've invested in a dedicated medical transport fleet, allowing us to navigate NWI urban routes faster while ensuring sensitive small cargo never shares space with heavy industrial freight.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Award, title: 'Pharmacy Precision', desc: 'Optimized protocols for patient prescription delivery.' },
                  { icon: ShieldCheck, title: 'HIPAA Compliant', desc: 'Compliant even in low-PHI clinic scenarios.' },
                  { icon: Zap, title: 'Rapid Fleet Response', desc: 'Professional transport for faster local clinic routing.' },
                  { icon: Package, title: 'Dental Specialist', desc: 'Secure, gentle handling for prosthetics and molds.' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="space-y-2 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <div className="flex items-center gap-2 text-mmc-teal group-hover:translate-x-1 transition-transform">
                      <item.icon className="h-5 w-5" />
                      <h3 className="font-black uppercase tracking-wider text-xs">{item.title}</h3>
                    </div>
                    <p className="text-sm text-mmc-gray leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="aspect-[4/5] rounded-[3rem] bg-mmc-light overflow-hidden shadow-airbnb">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800"
                  alt="Professional Medical Courier Vehicle Delivering Small Package to Local Clinic"
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <motion.div
                className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-airbnb max-w-xs space-y-4 border border-gray-100 hidden md:block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="text-4xl font-black text-mmc-teal">Small</div>
                <p className="text-sm font-bold text-mmc-dark leading-tight">Focusing exclusively on clinic-level parcel logistics.</p>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="mt-32 max-w-4xl mx-auto text-center space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-mmc-dark">Redefining Clinic Logistics</h2>
            <div className="grid md:grid-cols-2 gap-10 text-left">
              <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-glow transition-shadow duration-500">
                <h3 className="text-xl font-bold text-mmc-dark mb-4">Precision over Bulk</h3>
                <p className="text-mmc-gray leading-relaxed">
                  We don't do trucks or heavy pallets. By specializing in small-parcel medical courier work, we offer a more personalized, higher-security service for dental labs, pharmacies, and vet clinics that traditional delivery companies overlook.
                </p>
              </div>
              <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-glow transition-shadow duration-500">
                <h3 className="text-xl font-bold text-mmc-dark mb-4">Professional Delivery Fleet</h3>
                <p className="text-mmc-gray leading-relaxed">
                  Our professional delivery fleet is more than a branding choice—it's a strategic advantage. It allows us to access tight clinic parking lots and navigate NWI traffic with ease, ensuring your time-sensitive prescriptions or molds arrive ahead of schedule through agile transport.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}