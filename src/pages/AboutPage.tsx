import React from 'react';
import { SEO } from '@/components/SEO';
import { Award, ShieldCheck, Heart, UserCheck } from 'lucide-react';
export function AboutPage() {
  return (
    <>
      <SEO 
        title="About & Certifications" 
        description="Learn about Midwest Medical Delivery (MMC). HIPAA compliant, OSHA 10 certified, and fully insured medical courier experts in Indiana."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Commitment to <span className="text-mmc-teal">Compliance.</span></h1>
              <p className="text-xl text-mmc-gray leading-relaxed">
                Founded on the principles of reliability and safety, Midwest Medical Delivery (MMC) has grown to be the trusted partner for healthcare facilities across Northwest Indiana.
              </p>
              <p className="text-lg text-mmc-gray leading-relaxed">
                We understand that every package we carry represents a patient waiting for results, a pharmacy fulfilling a life-saving prescription, or a surgeon needing critical equipment. This sense of responsibility drives every delivery we make.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Award, title: 'OSHA 10 Certified', desc: 'Trained at Joliet Junior College for workplace safety standards.' },
                  { icon: ShieldCheck, title: 'HIPAA Compliant', desc: 'Continuous training in patient privacy and PHI security.' },
                  { icon: Heart, title: 'Care-First Approach', desc: 'Trained to handle sensitive cargo with maximum professionalism.' },
                  { icon: UserCheck, title: 'Fully Insured', desc: 'Comprehensive liability and cargo insurance for your peace of mind.' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-mmc-teal">
                      <item.icon className="h-5 w-5" />
                      <h3 className="font-black uppercase tracking-wider text-xs">{item.title}</h3>
                    </div>
                    <p className="text-sm text-mmc-gray leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] bg-mmc-light overflow-hidden shadow-airbnb">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                  alt="Medical Professional" 
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-airbnb max-w-xs space-y-4 border border-gray-100 hidden md:block">
                <div className="text-4xl font-black text-mmc-teal">Zero</div>
                <p className="text-sm font-bold text-mmc-dark leading-tight">Accidents or security breaches since our founding.</p>
              </div>
            </div>
          </div>
          <div className="mt-32 max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-black text-mmc-dark">Professional Excellence is our Standard</h2>
            <div className="grid md:grid-cols-2 gap-10 text-left">
              <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold text-mmc-dark mb-4">HIPAA Compliance</h3>
                <p className="text-mmc-gray leading-relaxed">
                  Our drivers are certified annually in HIPAA (Health Insurance Portability and Accountability Act) standards. We ensure that Protected Health Information (PHI) is never exposed and chain of custody is maintained through secure digital logs and physical verification.
                </p>
              </div>
              <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold text-mmc-dark mb-4">Biohazard Handling</h3>
                <p className="text-mmc-gray leading-relaxed">
                  Every MMC vehicle is equipped with biohazard spill kits and temperature-controlled storage solutions. Our staff is trained in the safe handling of bloodborne pathogens and diagnostic specimens, adhering strictly to OSHA 29 CFR 1910.1030 standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}