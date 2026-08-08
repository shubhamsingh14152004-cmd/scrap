import React from "react";

export function JsonLdSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "My Scrap Buddy",
    "url": "https://scrapbuddy.org",
    "description": "Mumbai's premier doorstep scrap collection and e-waste recycling platform offering transparent prices and instant payouts.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://scrapbuddy.org/pricing?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "My Scrap Buddy",
    "legalName": "K.A. Scrap Traders / My Scrap Buddy",
    "url": "https://scrapbuddy.org",
    "logo": "https://scrapbuddy.org/favicon.ico",
    "foundingDate": "2018",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8591770877",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Marathi"]
    },
    "sameAs": [
      "https://instagram.com/myscrapbuddy"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "My Scrap Buddy — Doorstep Scrap & E-Waste Pickup Mumbai",
    "image": "https://scrapbuddy.org/favicon.ico",
    "@id": "https://scrapbuddy.org/#localbusiness",
    "url": "https://scrapbuddy.org",
    "telephone": "+918591770877",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400093",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.1176",
      "longitude": "72.8631"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "areaServed": [
      { "@type": "City", "name": "Mumbai" },
      { "@type": "AdministrativeArea", "name": "Andheri East" },
      { "@type": "AdministrativeArea", "name": "Andheri West" },
      { "@type": "AdministrativeArea", "name": "MIDC" },
      { "@type": "AdministrativeArea", "name": "Powai" },
      { "@type": "AdministrativeArea", "name": "Saki Naka" },
      { "@type": "AdministrativeArea", "name": "Kurla" },
      { "@type": "AdministrativeArea", "name": "Bandra" },
      { "@type": "AdministrativeArea", "name": "Juhu" },
      { "@type": "AdministrativeArea", "name": "Malad" },
      { "@type": "AdministrativeArea", "name": "Goregaon" },
      { "@type": "AdministrativeArea", "name": "Borivali" },
      { "@type": "AdministrativeArea", "name": "Kandivali" },
      { "@type": "AdministrativeArea", "name": "Vile Parle" },
      { "@type": "AdministrativeArea", "name": "Santacruz" }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Recycling Service & Doorstep Scrap Collection",
    "provider": {
      "@type": "LocalBusiness",
      "name": "My Scrap Buddy"
    },
    "areaServed": {
      "@type": "City",
      "name": "Mumbai"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Scrap & Waste Materials Accepted",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Household Scrap Pickup" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Office & Corporate IT E-Waste Disposal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction & Demolition Waste Recycling" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Iron Rods, Steel & Metal Scrap Buying" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Old Furniture & Bulk Scrap Collection" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Appliances & Electronics Recycling" } }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
