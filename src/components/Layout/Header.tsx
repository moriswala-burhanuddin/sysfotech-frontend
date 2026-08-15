import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigation } from "@/hooks/use-navigation";
import logo from "@/assets/64x64-1.svg";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("magic_link_token"));
  }, [location.pathname]); // re-check on route change

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleMenuClick = (path: string) => {
    navigateTo(path, { type: 'menu' });
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigateTo('/', { type: 'menu' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3",
          scrolled ? "pt-4" : "pt-6"
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-2xl border transition-all duration-300",
            "bg-background border-border shadow-lg",
            "flex items-center justify-between px-6 pr-4",
            scrolled ? "h-16 shadow-orange-primary/5" : "h-20"
          )}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <img
                src={logo}
                alt="Sysfotech Logo"
                width="40"
                height="40"
                className="w-10 h-10"
              />
            </motion.div>
            <div className="flex flex-col items-start translate-y-[1px]">
              <span className="text-xl font-bold text-foreground tracking-tight group-hover:text-orange-primary transition-colors">
                Sysfotech
              </span>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-widest -mt-1 group-hover:text-orange-primary/70 transition-colors">
                IT Services
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleMenuClick(item.path)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full bg-orange-primary/10 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.name}
                </button>
              );
            })}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMenuClick(isLoggedIn ? '/dashboard' : '/login')}
              className="ml-4 px-6 py-2 rounded-full bg-orange-primary text-white text-sm font-medium shadow-lg shadow-orange-primary/25 hover:bg-orange-600 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoggedIn ? 'Dashboard' : 'Access Courses'}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:bg-secondary rounded-full transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden pt-28 px-4"
          >
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col space-y-2 bg-card border rounded-2xl p-4 shadow-2xl max-w-sm mx-auto"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  type="button"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                  onClick={() => handleMenuClick(item.path)}
                  className={cn(
                    "flex items-center justify-between w-full p-4 rounded-xl text-left text-base font-medium transition-all",
                    isActive(item.path)
                      ? "bg-orange-primary/10 text-orange-primary"
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="mobile-active-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-orange-primary"
                    />
                  )}
                </motion.button>
              ))}
              <div className="flex pt-4 mt-4 border-t">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMenuClick(isLoggedIn ? '/dashboard' : '/login')}
                  className="w-full py-3 text-center rounded-xl font-medium text-white bg-orange-primary hover:bg-orange-600 transition-colors"
                >
                  {isLoggedIn ? 'Dashboard' : 'Access Courses'}
                </motion.button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;