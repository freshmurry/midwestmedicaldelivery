import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Award, ShieldCheck, Zap, ShieldAlert, Package } from 'lucide-react';
import { AuditSummary } from '@/components/AuditSummary';
export function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Midwest Medical Delivery",
    "description": "MMD specializes in professional medical delivery services for regional clinics, labs, and pharmacies. HIPAA and OSHA 10 certified for secure clinical transport.",
    "knowsAbout": ["Medical Logistics", "HIPAA Compliance", "OSHA 10 Safety", "Dental Prosthetic Transport", "Pharmacy Delivery"],
    "url": "https://midwestmedicaldelivery.com/about"
  };
  return (
    <>
      <SEO
        title="About Our Medical Logistics Specialization"
        description="MMD specializes in professional medical delivery services for regional clinics, labs, and pharmacies. HIPAA and OSHA 10 certified for secure clinical transport."
        schema={schema}
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
                  Medical Logistics <span className="text-mmc-teal">Elite.</span>
                </h1>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mmc-dark text-white text-[11px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                    <ShieldCheck className="h-4 w-4 text-mmc-teal" />
                    HIPAA Compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mmc-dark text-white text-[11px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                    <ShieldAlert className="h-4 w-4 text-mmc-teal" />
                    OSHA 10 Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mmc-dark text-white text-[11px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                    <Award className="h-4 w-4 text-mmc-teal" />
                    Licensed & Insured
                  </span>
                </div>
              </div>
              <p className="text-xl text-mmc-gray leading-relaxed">
                Midwest Medical Delivery (MMD) provides the Northwest Indiana region with the professional precision that clinical healthcare demands.
              </p>
              <p className="text-lg text-mmc-gray leading-relaxed">
                We've invested in a professional medical fleet, navigating urban routes with agility and ensuring clinical materials are handled with dedicated security and compliance.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: Award, title: 'Pharmacy Focus', desc: 'Optimized prescription routing for facility delivery.' },
                  { icon: ShieldCheck, title: 'Secure Transport', desc: 'Compliant protocols for sensitive clinic cargo.' },
                  { icon: Zap, title: 'Regional Experts', desc: 'Professional response times across the clinic network.' },
                  { icon: Package, title: 'Clinical Specialization', desc: 'Exclusively handling dental and medical parcels.' }
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
                  src="https://media.istockphoto.com/id/1616635387/photo/pharmacist-package-and-delivery-with-woman-in-drug-store-for-medical-supplies-with-courier.jpg?s=612x612&w=0&k=20&c=2I-y39cNmSe79YDu2Pg2_-1X6NuyccZjajx7IZWx18Q="
                  alt="Secure Medical Handling in Professional Fleet"
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mmc-dark/40 to-transparent pointer-events-none" />
              </div>
              <motion.div
                className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-airbnb max-w-xs space-y-4 border border-white/20 hidden md:block z-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="text-2xl font-black text-mmc-dark">Regional Logistics</div>
                <p className="text-sm font-bold text-mmc-dark leading-tight">Providing professional medical logistics for over 50 regional clinic partners.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AuditSummary />
      </div>
    </>
  );
}