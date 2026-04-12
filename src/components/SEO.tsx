import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
  noindex?: boolean;
}
export function SEO({ title, description, canonical, schema, noindex }: SEOProps) {
  const location = useLocation();
  const fullTitle = `${title} | Midwest Medical Delivery`;
  const siteUrl = 'https://midwestmedicaldelivery.com';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${location.pathname}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="professional medical delivery Northwest Indiana, dental delivery NWI, pharmacy logistics Indiana, secure medical transport, Gary, Hammond, East Chicago, Munster, Highland, Schererville, Dyer, Merrillville, Crown Point, St. John, Hobart, Whiting, Cedar Lake, Griffith" />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}