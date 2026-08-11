import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
  schema?: object | object[];
}

const SEO = ({
  title = "Sysfotech - Web Development Company UK | IT Solutions Company UK",
  description = "Sysfotech is a leading web development company in the UK and website design company in London. We deliver custom software development, mobile app development, AI development, ERP software development, business automation solutions, and digital transformation services across the UK.",
  keywords = "web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk, sysfotech",
  type = "website",
  url = "https://sysfotech.uk/",
  image = "https://sysfotech.uk/og-image.jpg",
  schema
}: SEOProps) => {
  const SITE_URL = "https://sysfotech.uk";

  // Normalize title
  const fullTitle = title.includes('Sysfotech') ? title : `${title} | Sysfotech`;

  // Normalize URL
  let cleanUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  if (cleanUrl.includes('www.sysfotech.uk')) {
    cleanUrl = cleanUrl.replace('www.sysfotech.uk', 'sysfotech.uk');
  }
  if (cleanUrl.endsWith('/') && cleanUrl !== `${SITE_URL}/`) {
    cleanUrl = cleanUrl.slice(0, -1);
  } else if (cleanUrl === SITE_URL) {
    cleanUrl = `${SITE_URL}/`;
  }
  const fullUrl = cleanUrl;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  // Default Schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sysfotech",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "Leading web development and IT solutions company in the UK",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://linkedin.com/company/sysfotech",
      "https://twitter.com/sysfotech"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@sysfotech.uk"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": SITE_URL,
    "name": "Sysfotech",
    "description": "IT Solutions Company UK"
  };

  const schemasToRender: any[] = [organizationSchema, websiteSchema];
  if (schema) {
    if (Array.isArray(schema)) {
      schemasToRender.push(...schema);
    } else {
      schemasToRender.push(schema);
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sysfotech IT Services" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Sysfotech" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemasToRender)}
      </script>
    </Helmet>
  );
};

export default SEO;
