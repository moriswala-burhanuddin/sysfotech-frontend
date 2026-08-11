import { Mail, Phone, MapPin, Facebook, Github, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/64x64-1.svg";
import { useNavigation } from "@/hooks/use-navigation";

interface ContactInfo {
  facebook: string;
  github: string;
  linkedin: string;
  instagram: string;
}

const Footer = () => {
  // Default fallback social links
  const defaultSocialLinks: ContactInfo = {
    facebook: "https://facebook.com/sysfotech",
    github: "https://github.com/Sysfotech",
    linkedin: "https://www.linkedin.com/company/sysfotech-uk",
    instagram: "https://instagram.com/sysfotech"
  };

  const [socialLinks, setSocialLinks] = useState<ContactInfo>(defaultSocialLinks);
  const [loading, setLoading] = useState(false);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const fetchContactInfo = async () => {
      // Skip API call during local development to avoid CORS errors
      const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      if (isLocalDev) {
        console.log('Local development: Using default social links');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('https://sysfotech.uk/api/contact-info/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const contactInfo = data.results[0];
            setSocialLinks({
              facebook: contactInfo.facebook || defaultSocialLinks.facebook,
              github: contactInfo.github || defaultSocialLinks.github,
              linkedin: contactInfo.linkedin || defaultSocialLinks.linkedin,
              instagram: contactInfo.instagram || defaultSocialLinks.instagram,
            });
          }
        }
      } catch (error) {
        // Silently fail and use default links
        console.log('Using default social links (API not available)');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleMenuClick = (path: string) => {
    navigateTo(path, { type: 'menu' });
  };

  return (
    <footer className="text-white" style={{ backgroundColor: 'rgb(40, 40, 42)' }}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Sysfotech Logo"
                width="48"
                height="48"
                loading="lazy"
                className="w-12 h-12"
              />
              <div>
                <span className="text-xl font-bold">Sysfotech</span>
                <div className="text-xs text-gray-400 uppercase tracking-wide">IT Services</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Leading web development company in the UK delivering custom software development, AI solutions, ERP software development, and digital transformation services. Your trusted IT solutions partner.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-orange-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleMenuClick('/')}
                  className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:translate-x-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick('/about')}
                  className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:translate-x-1"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick('/services')}
                  className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:translate-x-1"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick('/testimonials')}
                  className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:translate-x-1"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick('/contact')}
                  className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:translate-x-1"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-orange-primary">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Custom Software Development</span></li>
              <li><span className="text-gray-300">Mobile App Development</span></li>
              <li><span className="text-gray-300">Website Design & UI/UX</span></li>
              <li><span className="text-gray-300">ERP Software Development</span></li>
              <li><span className="text-gray-300">AI Development & Automation</span></li>
              <li><span className="text-gray-300">Digital Transformation Services</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-orange-primary">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-orange-primary" />
                <span className="text-gray-300 text-sm">50th High View, Byron Way, London <br></br>UB5 6BL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-orange-primary" />
                <span className="text-gray-300 text-sm">+44 74421 93577</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-orange-primary" />
                <span className="text-gray-300 text-sm">info@sysfotech.uk</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {!loading && socialLinks && (
                <>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:scale-110"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:scale-110"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:scale-110"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-primary transition-all duration-200 hover:scale-110"
                  >
                    <Instagram size={20} />
                  </a>
                </>
              )}
              {loading && (
                <div className="flex space-x-4">
                  <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sysfotech — Web Development Company UK | IT Solutions Company UK. All rights reserved. |{" "}
            <button type="button" onClick={() => navigateTo('/privacy-policy', { type: 'menu' })} className="hover:text-orange-primary transition-colors underline">Privacy Policy</button>{" "}|{" "}
            <button type="button" onClick={() => navigateTo('/terms', { type: 'menu' })} className="hover:text-orange-primary transition-colors underline">Terms of Service</button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;