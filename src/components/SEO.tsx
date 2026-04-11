import React from 'react';
import { Helmet } from 'react-helmet-async';
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
}
export function SEO({ title, description, canonical, schema }: SEOProps) {
  const fullTitle = `${title} | MMC Northwest Indiana Medical & Dental Courier`;
  const siteUrl = 'https://midwestmedicaldelivery.com';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="small medical delivery Northwest Indiana, dental courier NWI, pharmacy prescription delivery Indiana, professional medical courier NWI, secure clinic transport Northwest Indiana, NWI medical logistics, vet clinic transport NWI, medical courier Indiana" />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}