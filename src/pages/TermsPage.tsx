import React from 'react';
import { SEO } from '@/components/SEO';
export function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for Midwest Medical Delivery. Read our service agreements and policies."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-black text-mmc-dark">Terms of Service</h1>
          <p className="text-mmc-gray text-lg">Last Updated: May 2025</p>
          <div className="prose prose-lg text-mmc-gray">
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">1. Service Agreement</h2>
            <p>By using the services of Midwest Medical Delivery (MMD), you agree to these terms. MMD provides specialized regional medical logistics for clinics, pharmacies, and dental practices in Northwest Indiana.</p>
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">2. User Responsibilities</h2>
            <p>Clients are responsible for ensuring that all parcels are properly packaged according to clinical standards and do not contain prohibited biohazardous materials unless explicitly agreed upon under a specialized contract.</p>
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">3. Limitation of Liability</h2>
            <p>While MMD adheres to strict chain-of-custody protocols, our liability for lost or damaged items is limited to the terms specified in your individual service contract. MMD is not liable for indirect or consequential damages arising from delivery delays.</p>
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">4. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the State of Indiana, without regard to its conflict of law provisions.</p>
          </div>
        </div>
      </div>
    </>
  );
}