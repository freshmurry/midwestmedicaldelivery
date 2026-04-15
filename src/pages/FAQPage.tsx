import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SEO } from '@/components/SEO';

const faqs = [
  {
    question: "What types of medical facilities does MMD serve?",
    answer: "MMD serves a wide range of healthcare facilities across Northwest Indiana, including dental labs and dental offices, pharmacies, medical clinics and hospitals, veterinary clinics, medical spas, physical therapy practices, assisted living communities, nursing homes, and rehabilitation centers. If you have a specialized pickup or delivery need, contact us and we'll work with you."
  },
  {
    question: "What are your hours of operation?",
    answer: "We are open Monday through Friday from 7:00 AM to 5:00 PM, and Saturdays from 8:00 AM to 3:00 PM (CST). We are closed on Sundays. For after-hours emergencies, please email dispatch@midwestmedicaldelivery.com and we will respond as quickly as possible."
  },
  {
    question: "What areas do you serve?",
    answer: "MMD provides medical delivery services throughout Northwest Indiana, including Gary, Hammond, East Chicago, Whiting, Munster, Highland, Dyer, Schererville, Merrillville, Crown Point, Portage, Valparaiso, Chesterton, and the surrounding NWI communities. Contact us if you're unsure whether your location is in our service area."
  },
  {
    question: "Are your drivers HIPAA-compliant and background-checked?",
    answer: "Yes. All MMD drivers are fully background-checked, insured, HIPAA-trained, and OSHA 10 certified. We take patient privacy and the safe handling of medical materials seriously. Our operations are designed to meet the compliance standards required by healthcare providers."
  },
  {
    question: "What items can MMD deliver?",
    answer: "We handle a wide range of medical and healthcare items, including dental molds and impressions, lab specimens, prescription medications, medical supplies, sterile items, and other clinical materials. All items are handled with care following appropriate protocols for each item type."
  },
  {
    question: "Do you offer scheduled/recurring routes?",
    answer: "Yes. We offer both scheduled daily or weekly routes and on-demand dispatch. Many of our pharmacy and dental lab clients use us for regular pickup and delivery routes. We also provide daily and/or weekly pharmacy pickup and delivery to assisted living communities, nursing homes, and rehabilitation centers throughout Northwest Indiana."
  },
  {
    question: "How do I get a quote or set up service?",
    answer: "The best way to get started is to fill out our contact form at midwestmedicaldelivery.com/contact or email us at dispatch@midwestmedicaldelivery.com. Pricing is customized based on your route, delivery frequency, item type, and volume. We'll respond promptly to discuss your needs."
  },
  {
    question: "Do you handle pharmacy deliveries to long-term care facilities?",
    answer: "Yes — this is a core part of our service. MMD provides daily and weekly pharmacy pickup and delivery to assisted living communities, nursing homes, and rehabilitation centers across Northwest Indiana. We understand the time-sensitive nature of medication delivery for residents and work closely with pharmacy partners to ensure on-time, compliant delivery."
  },
  {
    question: "Is MMD licensed and insured?",
    answer: "Yes. MMD is fully licensed and insured to operate as a medical courier in the state of Indiana. We carry the appropriate commercial insurance coverage, and all drivers meet our rigorous vetting and certification requirements."
  },
  {
    question: "How do I track my delivery?",
    answer: "Upon scheduling a delivery, you'll receive a confirmation with a reference ID. For status updates on active deliveries, you can contact us directly at dispatch@midwestmedicaldelivery.com. We are working on expanding real-time tracking capabilities for our clients."
  },
  {
    question: "What makes MMD different from general courier services?",
    answer: "MMD is purpose-built for healthcare. Unlike general couriers, our drivers are HIPAA-trained, OSHA 10 certified, and experienced with the specific handling requirements of medical and clinical materials. We understand regulatory compliance, chain of custody, and the urgent nature of healthcare logistics — general couriers typically don't."
  },
];

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-bold text-mmc-dark text-base leading-snug">{faq.question}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-mmc-teal flex-shrink-0" />
          : <ChevronDown className="h-5 w-5 text-mmc-gray flex-shrink-0" />
        }
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 text-mmc-gray text-sm leading-relaxed border-t border-gray-100">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ — Midwest Medical Delivery"
        description="Answers to frequently asked questions about MMD's medical courier services, service areas, hours, HIPAA compliance, and more."
      />

      {/* Hero */}
      <section className="bg-mmc-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Frequently Asked <span className="text-mmc-teal">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-gray-300 text-lg"
          >
            Everything you need to know about MMD's medical delivery services.
          </motion.p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-20 bg-mmc-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
          <div className="bg-[#00A699] rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-black mb-2">Still have questions?</h2>
            <p className="text-white/85 mb-6">Our team is ready to help you set up service or answer any questions about your specific needs.</p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#00A699] font-bold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
