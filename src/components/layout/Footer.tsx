import React from "react";

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest text-on-surface pt-20 pb-12 border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Footer Header (Socials & Logo) */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-outline-variant/10 gap-8">
          <div className="font-headline-md text-[32px] font-extrabold text-primary tracking-tight">Paditech</div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-label-bold text-on-surface-variant uppercase tracking-widest mr-4">Social Media</span>
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-lg">X</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-lg">link</span>
            </a>
          </div>
        </div>
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          <div className="space-y-6">
            <p className="font-label-bold text-on-surface-variant uppercase tracking-widest">Reach out to us</p>
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">send</span>
              </div>
              <div>
                <p className="text-sm font-label-bold">Contact on Telegram</p>
                <p className="text-[12px] text-on-surface-variant">Our associate will reply within 24h</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-label-bold text-on-surface-variant uppercase tracking-widest mb-8">Features</p>
            <ul className="space-y-4">
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Subscription Management</a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Custom Checkout</a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Campaign Strategy</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-label-bold text-on-surface-variant uppercase tracking-widest mb-8">Explore</p>
            <ul className="space-y-4">
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Calculator</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-label-bold text-on-surface-variant uppercase tracking-widest mb-8">Help</p>
            <ul className="space-y-4">
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">FAQs</a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Email</a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Help Centre</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Giant Brand Watermark */}
        <div className="overflow-hidden py-10 opacity-[0.03] select-none pointer-events-none">
          <div className="text-[100px] md:text-[180px] font-extrabold leading-none tracking-tighter text-center">Paditech</div>
        </div>
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/10 text-sm text-on-surface-variant gap-4">
          <p>© 2024 Paditech Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
