import React from "react";

const Services = () => {
  return (
    <section id="services" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface scroll-mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center">
        <div className="max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Our Services</h2>
          <p className="font-body-lg text-on-surface-variant">We provide technical foundations and strategic expertise for the digital-first economy.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-10 rounded-[32px] border border-outline-variant/10 hover:border-primary/30 transition-all group bg-surface-container-low/30">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 mx-auto group-hover:bg-primary transition-all">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">rocket_launch</span>
            </div>
            <h3 className="font-headline-md text-[20px] mb-4">Rapid Deployment</h3>
            <p className="font-body-md text-on-surface-variant">Automated CI/CD pipelines to go from concept to production.</p>
          </div>
          <div className="p-10 rounded-[32px] border border-outline-variant/10 hover:border-primary/30 transition-all group bg-surface-container-low/30">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 mx-auto group-hover:bg-primary transition-all">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">security</span>
            </div>
            <h3 className="font-headline-md text-[20px] mb-4">Bank Security</h3>
            <p className="font-body-md text-on-surface-variant">Zero-trust architecture for enterprise-grade protection.</p>
          </div>
          <div className="p-10 rounded-[32px] border border-outline-variant/10 hover:border-primary/30 transition-all group bg-surface-container-low/30">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 mx-auto group-hover:bg-primary transition-all">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">monitoring</span>
            </div>
            <h3 className="font-headline-md text-[20px] mb-4">Real-time Insights</h3>
            <p className="font-body-md text-on-surface-variant">Deep telemetry and proactive alerting for your systems.</p>
          </div>
          <div className="p-10 rounded-[32px] border border-outline-variant/10 hover:border-primary/30 transition-all group bg-surface-container-low/30">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 mx-auto group-hover:bg-primary transition-all">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">hub</span>
            </div>
            <h3 className="font-headline-md text-[20px] mb-4">API Integration</h3>
            <p className="font-body-md text-on-surface-variant">Connect your tools with our well-documented API.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
