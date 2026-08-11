import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sysfotech_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    // Prevent multiple injections
    if (document.getElementById("ga-script")) return;

    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-J9WMBVJ7B1";
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.id = "ga-inline";
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-J9WMBVJ7B1');
    `;
    document.head.appendChild(inlineScript);
  };

  const handleAccept = () => {
    localStorage.setItem("sysfotech_cookie_consent", "accepted");
    loadGoogleAnalytics();
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("sysfotech_cookie_consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-20 md:pb-6 pointer-events-none flex justify-center">
      <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-6 w-full max-w-4xl pointer-events-auto flex flex-col md:flex-row items-center gap-6 justify-between animate-in slide-in-from-bottom-5">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-slate-900 mb-2">We value your privacy</h3>
            <button 
              onClick={() => setShow(false)}
              className="md:hidden text-slate-400 hover:text-slate-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. For more information, please read our{" "}
            <a href="/privacy-policy" className="text-orange-primary hover:underline font-medium">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button 
            variant="outline" 
            onClick={handleReject}
            className="w-full sm:w-auto px-6 whitespace-nowrap"
          >
            Reject Non-Essential
          </Button>
          <Button 
            onClick={handleAccept}
            className="w-full sm:w-auto px-6 whitespace-nowrap bg-orange-primary hover:bg-orange-primary/90 text-white"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
