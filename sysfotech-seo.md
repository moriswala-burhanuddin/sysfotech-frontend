# SEO Configuration for Sysfotech

## How to Use This Guide
This document provided all the necessary metadata to make your website rank higher on Google.

### For Developers / Implementation
1.  **Meta Tags**: Copy the `<SEO ... />` component props for each page and paste them into your page code (e.g., `src/pages/Home.tsx`).
2.  **JSON-LD**: Copy the JSON object inside `schema={{ ... }}` and pass it to the `schema` prop of the `<SEO />` component.
3.  **Keywords**: Use the specific keywords string provided for each page.

### Example Implementation
In your page file (e.g., `About.tsx`):
```tsx
import SEO from '../components/SEO';

return (
  <>
    {/* Copy the configuration from section "2. About Us" below */}
    <SEO 
      title="About Us - Sysfotech" 
      description="Sysfotech is a leading IT services agency..."
      keywords="About Sysfotech, IT Agency London..."
      // Add the JSON-LD schema if provided
      schema={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        // ... rest of schema
      }}
    />
    {/* Your page content */}
  </>
);
```

---

This document contains the SEO Meta Tags and JSON-LD Structured Data configurations for **Sysfotech**.

## Global Configuration
- **Site Name**: Sysfotech
- **Base URL**: https://sysfotech.uk/
- **Support Email**: info@sysfotech.uk
- **Phone**: +44 74421 93577
- **Address**: 50th High View, Byron Way, London, UB5 6BL

---

## 1. Home Page
**Page**: Home
**URL**: `https://sysfotech.uk/`

### Meta Tags (HTML/JSX)
```tsx
<SEO 
  title="Sysfotech - IT Services & Digital Excellence" 
  description="Transforming businesses through innovative technology solutions. Sysfotech is your trusted partner for UI/UX Design, Web Development, and Digital Marketing in London."
  keywords="Sysfotech, IT Services London, Web Development UK, Mobile App Development, UI/UX Design, Digital Marketing, SEO Services, Software Testing, IT Support London, Tech Agency UB5 6BL, Custom Software Solutions"
  type="website"
  url="https://sysfotech.uk/"
  image="https://sysfotech.uk/og-image.jpg"
/>
```

### JSON-LD (WebSite & Organization)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sysfotech",
    "url": "https://sysfotech.uk/",
    "logo": "https://sysfotech.uk/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44 74421 93577",
      "contactType": "customer service",
      "email": "info@sysfotech.uk",
      "areaServed": "GB",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "50th High View, Byron Way",
      "addressLocality": "London",
      "postalCode": "UB5 6BL",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://www.facebook.com/sysfotech",
      "https://www.linkedin.com/company/sysfotech",
      "https://twitter.com/sysfotech"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sysfotech",
    "url": "https://sysfotech.uk/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sysfotech.uk/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
]
```

---

## 2. About Us
**Page**: About Us
**URL**: `https://sysfotech.uk/about`

### Meta Tags
```tsx
<SEO 
  title="About Us - Sysfotech" 
  description="Sysfotech is a leading IT services agency in London transforming businesses through technology. Learn about our mission, vision, and expert team."
  keywords="About Sysfotech, IT Agency London, Tech Partners UK, Digital Excellence"
  type="website"
  url="https://sysfotech.uk/about"
/>
```

### JSON-LD (LocalBusiness)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sysfotech",
  "image": "https://sysfotech.uk/office.jpg",
  "description": "Transforming businesses through innovative technology solutions.",
  "url": "https://sysfotech.uk/about",
  "telephone": "+44 74421 93577",
  "email": "info@sysfotech.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "50th High View, Byron Way",
    "addressLocality": "London",
    "postalCode": "UB5 6BL",
    "addressCountry": "GB"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
}
```

---

## 3. Services (Main Page)
**Page**: Services
**URL**: `https://sysfotech.uk/services`

### Meta Tags
```tsx
<SEO 
  title="Our Services - Sysfotech" 
  description="Comprehensive IT services including UI/UX Design, Web & Mobile App Development, SEO, and Support. Tailored solutions for your business growth."
  keywords="IT Services List, Web Development Services, App Development London, QA Testing Services, Digital Marketing Packages, SEO Audits, UI/UX Design Agency, IT Support Contracts"
  type="website"
  url="https://sysfotech.uk/services"
/>
```

---

## 4. Specific Services

### A. UI/UX Design
**Page**: UI/UX Design
**URL**: `https://sysfotech.uk/services/ui-ux-design`

```tsx
<SEO 
  title="UI/UX Design Services - Sysfotech" 
  description="Create engaging and intuitive digital experiences with Sysfotech's expert UI/UX design services. User-centric design that drives conversion."
  keywords="UI Design, UX Research, User Interface Design London, User Experience Strategy"
  type="website"
  schema={{
    "@type": "Service",
    "serviceType": "UI/UX Design",
    "provider": { "@type": "Organization", "name": "Sysfotech" },
    "areaServed": "GB",
    "description": "User-centric design solutions driven by research and strategy."
  }}
/>
```

### B. Web Development
**Page**: Web Development
**URL**: `https://sysfotech.uk/services/web-development`

```tsx
<SEO 
  title="Web Development Services - Sysfotech" 
  description="Custom web development solutions using the latest technologies. Scalable, secure, and high-performance websites built by Sysfotech."
  keywords="Web Development London, Custom Websites, React Development, Corporate Website Design"
  type="website"
  schema={{
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": { "@type": "Organization", "name": "Sysfotech" },
    "areaServed": "GB",
    "description": "High-performance web applications and sites."
  }}
/>
```

### C. Mobile App Development
**Page**: Mobile App Development
**URL**: `https://sysfotech.uk/services/mobile-app-development`

```tsx
<SEO 
  title="Mobile App Development - Sysfotech" 
  description="Native and cross-platform mobile app development for iOS and Android. Sysfotech builds apps that users love."
  keywords="Mobile App Developers London, iOS App Development, Android Apps, Flutter Development"
  type="website"
  schema={{
    "@type": "Service",
    "serviceType": "Mobile App Development",
    "provider": { "@type": "Organization", "name": "Sysfotech" },
    "areaServed": "GB",
    "description": "Native and cross-platform mobile applications."
  }}
/>
```

### D. Testing & QA
**Page**: Testing & QA
**URL**: `https://sysfotech.uk/services/testing-qa`

```tsx
<SEO 
  title="Testing & QA Services - Sysfotech" 
  description="Ensure flawless performance with Sysfotech's comprehensive software testing and QA services. Manual and automated testing solutions."
  keywords="Software Testing, QA Services, Automated Testing, Bug Fixing"
  type="website"
  schema={{
    "@type": "Service",
    "serviceType": "Testing & Quality Assurance",
    "provider": { "@type": "Organization", "name": "Sysfotech" },
    "areaServed": "GB",
    "description": "Rigorous software testing to ensure quality and reliability."
  }}
/>
```

### E. SEO Services & Digital Marketing
**Page**: Digital Marketing
**URL**: `https://sysfotech.uk/services/digital-marketing`

```tsx
<SEO 
  title="SEO & Digital Marketing - Sysfotech" 
  description="Boost your online presence with Sysfotech's SEO and Digital Marketing strategies. Drive traffic, improve rankings, and increase ROI."
  keywords="SEO Services London, Digital Marketing Agency, Social Media Marketing, PPC Management"
  type="website"
  schema={{
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": { "@type": "Organization", "name": "Sysfotech" },
    "areaServed": "GB",
    "description": "Strategies to increase visibility and drive business growth."
  }}
/>
```

### F. Support & Maintenance
**Page**: Support & Maintenance
**URL**: `https://sysfotech.uk/services/support-maintenance`

```tsx
<SEO 
  title="IT Support & Maintenance - Sysfotech" 
  description="Reliable 24/7 IT support and software maintenance services. Keep your business running smoothly with Sysfotech."
  keywords="IT Support London, Software Maintenance, Website Support, 24/7 Tech Support"
  type="website"
  schema={{
    "@type": "Service",
    "serviceType": "Support & Maintenance",
    "provider": { "@type": "Organization", "name": "Sysfotech" },
    "areaServed": "GB",
    "description": "Ongoing support and maintenance to ensure operational stability."
  }}
/>
```

---

## 5. Contact Us
**Page**: Contact Us
**URL**: `https://sysfotech.uk/contact`

### Meta Tags
```tsx
<SEO 
  title="Contact Us - Sysfotech" 
  description="Get in touch with Sysfotech. Visit our London office, call us at +44 74421 93577, or email info@sysfotech.uk. Available 24/7."
  keywords="Contact Sysfotech, IT Company Contact UK, London Tech Agency Address"
  type="website"
  url="https://sysfotech.uk/contact"
/>
```

### JSON-LD (ContactPage)
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Sysfotech",
  "description": "Get in touch with our team for inquiries and support.",
  "url": "https://sysfotech.uk/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "Sysfotech",
    "telephone": "+44 74421 93577",
    "email": "info@sysfotech.uk",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44 74421 93577",
      "contactType": "customer support",
      "availableLanguage": "En",
      "areaServed": "GB"
    }
  }
}
```

---

## 6. Strategic Keywords List

### Primary Keywords (Brand & Location)
- Sysfotech
- Sysfotech UK
- IT Services London
- Digital Agency London
- Web Design Company London
- IT Support UB5 6BL
- Tech Partner UK

### Service-Specific Keywords

#### UI/UX Design
- User Interface Design
- UX Research Agency
- Wireframing & Prototyping
- Mobile App Design
- Web Design Trends 2024
- User Experience Strategy
- Figma Expertes London

#### Web Development
- Custom Web Development
- ReactJS Development London
- Corporate Website Design
- E-commerce Development UK
- Shopify Experts London
- Full Stack Development
- Progressive Web Apps (PWA)

#### Mobile App Development
- iOS App Development UK
- Android App Developers
- Cross-Platform Apps
- Flutter Development London
- React Native Experts
- Mobile App Strategy
- Enterprise Mobility Solutions

#### Digital Marketing & SEO
- SEO Services London
- Local SEO UK
- Technical SEO Audit
- Content Marketing Strategy
- Social Media Management
- Pay Per Click (PPC) London
- Digital Growth Agency
- Conversion Rate Optimization (CRO)

#### Testing & Quality Assurance
- Software Testing Services
- Automated Testing UK
- Manual Testing
- Mobile App Testing
- Performance Testing
- Security Testing
- QA Outsourcing

#### Support & Maintenance
- 24/7 IT Support London
- Website Maintenance Packages
- App Maintenance Services
- Cloud Support UK
- Legacy System Support
- Emergency IT Services
