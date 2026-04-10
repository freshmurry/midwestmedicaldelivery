import React from 'react';
import { SEO } from '@/components/SEO';
export function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Midwest Medical Delivery. Learn how we handle your data securely."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-black text-mmc-dark">Privacy Policy</h1>
          <p className="text-mmc-gray text-lg">Last Updated: May 2025</p>
          <div className="prose prose-lg text-mmc-gray">
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">1. Data Collection</h2>
            <p>We collect information you provide directly to us through our contact forms, including your name, email address, phone number, and delivery details. This information is used solely to provide our medical logistics services.</p>
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">2. HIPAA Compliance & PHI</h2>
            <p>Midwest Medical Delivery (MMD) is committed to maintaining the confidentiality of all clinical materials. We do not store Protected Health Information (PHI) on our public-facing web servers. All sensitive delivery details should be communicated through secure dispatch channels.</p>
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">3. Cookie Usage</h2>
            <p>We use essential cookies to ensure our website functions correctly. We may also use analytics cookies to understand how visitors interact with our site, helping us improve our regional services.</p>
            <h2 className="text-2xl font-bold text-mmc-dark mt-8 mb-4">4. Data Retention</h2>
            <p>We retain contact inquiry data only for as long as necessary to fulfill your request and maintain our operational records. You may request the deletion of your contact information by reaching out to our support team.</p>
          </div>
        </div>
      </div>
    </>
  );
}