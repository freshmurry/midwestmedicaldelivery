import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Award, ShieldCheck, Zap, ShieldAlert } from 'lucide-react';
import { Logo } from '@/components/Logo';
export function AboutPage() {
  return (
    <>
      <SEO
        title="About Lake County Specialty"
        description="MMC specializes in professional medical delivery for Lake County clinics, labs, and pharmacies. HIPAA and OSHA 10 certified for secure NWI transport."
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
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-black text-mmc-dark leading-tight">
                  Lake County <span className="text-mmc-teal">Specialists.</span>
                </h1>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-mmc-dark text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-mmc-teal" />
                    HIPAA Compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-mmc-dark text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                    <ShieldAlert className="h-3.5 w-3.5 text-mmc-teal" />
                    OSHA 10 Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-mmc-dark text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                    <Award className="h-3.5 w-3.5 text-mmc-teal" />
                    Licensed & Insured
                  </span>
                </div>
              </div>
              <p className="text-xl text-mmc-gray leading-relaxed">
                Midwest Medical Delivery (MMC) provides Lake County and the surrounding NWI region with the professional precision that dental prosthetics and pharmacy prescriptions require.
              </p>
              <p className="text-lg text-mmc-gray leading-relaxed">
                We've invested in a dedicated medical transport fleet, navigating Lake County urban routes with agility and ensuring small parcels never share space with bulk industrial freight.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: Award, title: 'Pharmacy Focus', desc: 'Optimized prescription routing for patient facility delivery.' },
                  { icon: ShieldCheck, title: 'Secure Transport', desc: 'Compliant protocols for sensitive clinic cargo.' },
                  { icon: Zap, title: 'NWI Local Experts', desc: 'Professional response times across the Lake County network.' },
                  { icon: ShieldAlert, title: 'Safety First', desc: 'Rigorous OSHA 10 standards for medical handling.' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="space-y-2 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <div className="flex items-center gap-2 text-mmc-teal">
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
              <div className="aspect-[4/5] rounded-[3rem] bg-mmc-light overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800"
                  alt="Professional Medical Delivery to Lake County Clinic"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <motion.div
                className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-xl max-w-xs space-y-4 border border-gray-100 hidden md:block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Logo variant="primary" showText={false} className="mb-2" />
                <div className="text-2xl font-black text-mmc-dark">Lake Co. Hub</div>
                <p className="text-sm font-bold text-mmc-dark leading-tight">Focusing exclusively on Lake County parcel logistics.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}