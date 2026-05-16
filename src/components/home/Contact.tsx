import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left translate-y-32"></div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Ready to start your <span className="text-primary">transformation?</span>
            </h2>
            <p className="font-body-lg text-on-surface-variant">
              Our team is available 24/7 to discuss your project requirements and provide a custom solution tailored to your business needs.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-label-bold">Email Us</p>
                  <p className="text-on-surface-variant">hello@paditech.com</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-label-bold">Call Support</p>
                  <p className="text-on-surface-variant">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-[40px] border border-outline-variant/20 shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-label-bold">Full Name</label>
                  <input
                    className="w-full bg-surface-container-low/50 border-outline-variant/30 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-label-bold">Email Address</label>
                  <input
                    className="w-full bg-surface-container-low/50 border-outline-variant/30 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-label-bold">Message</label>
                <textarea
                  className="w-full bg-surface-container-low/50 border-outline-variant/30 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Tell us about your project..."
                  rows={4}
                ></textarea>
              </div>
              <button
                className="w-full bg-primary text-on-primary py-4 rounded-full font-label-bold hover:shadow-lg active:scale-[0.98] transition-all"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
