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
      <meta name="keywords" content="professional medical courier Northwest Indiana, dental delivery NWI, pharmacy logistics Indiana, secure medical transport, Gary, Hammond, East Chicago, Munster, Highland, Schererville, Dyer, Merrillville, Crown Point, St. John, Hobart, Whiting, Cedar Lake, Griffith" />
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