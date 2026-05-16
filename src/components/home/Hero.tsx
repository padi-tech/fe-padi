import React from "react";

const Hero = () => {
  return (
    <section id="home" className="py-20 md:py-32 scroll-mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center space-y-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface leading-tight">
            Unlock the Power of <span className="text-primary">Modern Subscriptions</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Paditech is an all-in-one platform that helps merchants manage operations, optimize growth, and boost retention with smart analytics and seamless workflows.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary-container text-on-primary px-10 py-4 rounded-full font-label-bold hover:shadow-lg transition-all active:scale-95">
            Get Started
          </button>
          <button className="border border-primary/20 text-primary px-10 py-4 rounded-full font-label-bold hover:bg-primary/5 transition-all active:scale-95">
            Book a Call
          </button>
        </div>
        <div className="pt-12 max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-400 rounded-card blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <img
              alt="Modern Dashboard"
              className="relative w-full h-auto rounded-card border border-outline-variant/20 shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChDrsYqXMelGeJNQMytdXuQHkTWxaNl7-O4mhlPCAxbUvv_UtwuAxuS1zF_m-I_imMsPo_FJ6nuxvqyr0ZrsSCOfhfxemkgfnthKvcHaRopW7lsboZFCgOkvESOK3K--WxgfZs1FfkufMS0WYSSiig7AHSSzG65lKj2OcHnQkE0KDgucdQM27vu0OZahBzshORwl4YtbJIgoZFBvloD55RYBaXAWNPZubfcIC6jkLKTF9GL9qQv4R5GXor2VtMsXKPPnT43pN8E-s"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
