import { ArrowRight, BrainCircuit, Cog, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvenzaBento = () => {
  return (
    <section className="pt-24 pb-32 bg-tech-dark text-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-10 relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <div className="container max-w-7xl mx-auto px-6">
        
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              {/* Invenza Logo & Text */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl shadow-sm flex items-center justify-center">
                  <img 
                    src="https://invenza.uk/assets/invenza-bg-CoV5E7Gx.png" 
                    alt="Invenza Logo" 
                    className="h-8 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-3xl font-extrabold tracking-tight text-white">Invenza</span>
              </div>
              
              <div className="h-6 w-px bg-white/20"></div>
              <span className="text-orange-primary font-bold text-sm uppercase tracking-wider">Built by Sysfotech</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
              Smart software to run your business easily.
            </h2>
            <p className="text-xl text-slate-300 max-w-lg">
              Manage everything in one place with our simple, fast, and automated ERP system.
            </p>
          </div>
          <Button asChild className="bg-orange-primary hover:bg-orange-dark text-white rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-orange-primary/20 transition-colors w-full md:w-auto">
            <a href="https://invenza.uk" target="_blank" rel="noopener noreferrer">
              Visit Website <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>

        {/* Features & Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Mockup Image (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-2 md:p-4 overflow-hidden relative min-h-[300px] flex items-center justify-center">
            <img 
              src="/Invenza ERP Dashboard Overview.png" 
              alt="Invenza Dashboard Preview" 
              className="w-full h-auto rounded-2xl shadow-xl object-cover"
              onError={(e) => {
                // Fallback just in case the image path is slightly different
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-center p-10"><p class="text-xl font-bold">Dashboard Preview</p><p class="text-slate-400 mt-2">Image: /Invenza ERP Dashboard Overview.png</p></div>';
              }}
            />
          </div>

          {/* Feature Cards Column */}
          <div className="flex flex-col gap-6">
            
            {/* Card 1: Intelligent */}
            <div className="rounded-3xl bg-white text-slate-900 p-8 flex-1 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-primary/10 flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-orange-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Access real-time insights and advanced analytics to help you make data-driven business decisions instantly.
              </p>
            </div>

            {/* Card 2: Automated */}
            <div className="rounded-3xl bg-white text-slate-900 p-8 flex-1 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-primary/10 flex items-center justify-center">
                  <Cog className="w-6 h-6 text-orange-primary" />
                </div>
                <h3 className="text-xl font-bold">Automated</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Streamline your daily operations by automatically handling repetitive tasks, invoicing, and complex workflows.
              </p>
            </div>

            {/* Card 3: Seamless */}
            <div className="rounded-3xl bg-white text-slate-900 p-8 flex-1 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-primary" />
                </div>
                <h3 className="text-xl font-bold">Connected</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Unify your entire business with a single platform that keeps every department perfectly synced in real time.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default InvenzaBento;
