import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CapsuleCTA = () => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-xl">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
            >
                <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 pl-6 flex items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="hidden sm:block">
                        <h2 className="text-sm font-medium text-white tracking-tight">
                            Ready for <span className="text-orange-primary font-bold">IT Solutions?</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                        <Link to="/contact" className="flex-1 sm:flex-none">
                            <Button
                                variant="ghost"
                                className="h-10 px-5 rounded-full text-white hover:bg-white/10 flex items-center gap-2 text-[11px] font-bold transition-all w-full"
                            >
                                <Phone size={14} className="text-orange-primary" />
                                <span className="uppercase tracking-widest">Contact</span>
                            </Button>
                        </Link>

                        <a
                            href="https://wa.me/+447442193577"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none"
                        >
                            <Button
                                className="h-10 px-5 rounded-full bg-orange-primary text-white hover:bg-orange-dark shadow-lg shadow-orange-primary/20 transition-all flex items-center gap-2 text-[11px] font-bold w-full"
                            >
                                <MessageCircle size={14} />
                                <span className="uppercase tracking-widest">WhatsApp</span>
                            </Button>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CapsuleCTA;
