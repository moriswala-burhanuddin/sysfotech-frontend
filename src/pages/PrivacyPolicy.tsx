import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy | Sysfotech" 
        description="Read the Sysfotech Privacy Policy to understand how we collect, use, and protect your data when you use our web development and IT solutions services."
      />
      <div className="pt-32 pb-24 container max-w-4xl min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              At Sysfotech, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website sysfotech.uk and use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We may collect information about you in a variety of ways. The information we may collect includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number that you voluntarily give to us when choosing to participate in various activities related to our services.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the website, such as your IP address, your browser type, your operating system, and your access times.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Use of Your Information</h2>
            <p className="text-muted-foreground mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Create and manage your account.</li>
              <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the website to you.</li>
              <li>Email you regarding your account or order.</li>
              <li>Respond to product and customer service requests.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions or comments about this Privacy Policy, please contact us at:<br/><br/>
              <strong>Sysfotech IT Services</strong><br/>
              Email: privacy@sysfotech.uk
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
