import SEO from "../components/SEO";

const Terms = () => {
  return (
    <>
      <SEO 
        title="Terms of Service | Sysfotech" 
        description="Read the Sysfotech Terms of Service. These terms govern your use of our website, web development services, and IT solutions."
      />
      <div className="pt-32 pb-24 container max-w-4xl min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service constitute a legally binding agreement made between you and Sysfotech concerning your access to and use of the sysfotech.uk website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Intellectual Property Rights</h2>
            <p className="text-muted-foreground mb-4">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Representations</h2>
            <p className="text-muted-foreground mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Contact Us</h2>
            <p className="text-muted-foreground">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:<br/><br/>
              <strong>Sysfotech IT Services</strong><br/>
              Email: legal@sysfotech.uk
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms;
