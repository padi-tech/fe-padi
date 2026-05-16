import React from "react";

const Projects = () => {
  return (
    <section id="projects" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest scroll-mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Featured Projects</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Discover how we've helped industry leaders transform their digital landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-surface rounded-[32px] overflow-hidden border border-outline-variant/10 level-1-shadow hover:-translate-y-2 transition-all duration-300">
            <img
              alt="Visionary Analytics"
              className="w-full h-64 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPSIV0uILpGoU3U4zyEZ_QkSjpqkfaTn2Ha5tUZUJKQDhdqN4htCnNkCHXcjr3GrHoogkcjVeET1x3-fg_Z4M0j6vvj9XhfqotInRWch0O3sTJCLvPoSehzRxViXFaMZnUn_NiNb0qnC_B8yl4Z7wdckTG8mWLBUxyRTdw56mu0TcynQKPZk1mDb-mw1m5viJ-qXo7FOJ2XTaaGRFhzc3v7upsfbprJOcjXNVjET1uVKkKCQjK7uuweTbovv_a82GH_yszFDn4LIk"
            />
            <div className="p-10 text-center space-y-4">
              <h3 className="font-headline-md text-[24px] text-on-surface">Visionary Analytics</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2">
                Comprehensive data visualization platform for Fortune 500 companies.
              </p>
              <a className="inline-flex items-center text-primary font-label-bold group" href="#">
                View Project <span className="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
          {/* Project Card 2 */}
          <div className="bg-surface rounded-[32px] overflow-hidden border border-outline-variant/10 level-1-shadow hover:-translate-y-2 transition-all duration-300">
            <img
              alt="CloudScale Core"
              className="w-full h-64 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNi0oNMz7Hl00LvKfStUIPr33bUq1CuPsbZAMPv-tO3yGLKxve4gpSgWaNaC23Bm-H4_dAA-a5gSJftExPBU79y4NpgGVKQGwB_rl3wMANN8HKy8GoXJRW3kCLKemYD1JXwXdRc8UUxpQL13ixzKjGj8uPNZB-qdHHQLQ3EDJdxvFx1Qlg4TyBdImvWm86QYG8zvbu75CZmw1EFuk1MYFOoBKC-MjHU9P3ZyRWPQIoeCrlUS7WeXt9xPEWCm8-E0ohDYVaZU3iAfM"
            />
            <div className="p-10 text-center space-y-4">
              <h3 className="font-headline-md text-[24px] text-on-surface">CloudScale Core</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2">
                Re-engineering backend infrastructure for global e-commerce scaling.
              </p>
              <a className="inline-flex items-center text-primary font-label-bold group" href="#">
                View Project <span className="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
          {/* Project Card 3 */}
          <div className="bg-surface rounded-[32px] overflow-hidden border border-outline-variant/10 level-1-shadow hover:-translate-y-2 transition-all duration-300">
            <img
              alt="NovaMobile UX"
              className="w-full h-64 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Ao86IsoGK43SOQzXDRtjMrUY-lQdJg5QkiRsH5trE6gbLN19w3I7k5aFYA5LFzoOYP2GOToYwvNmjdI_t0DPHkoSdofOi4x-6rWKUTHBod2Nv8wLLVGiCTPG2dgvyU9SOMGc34HSm1r--acayt-bcvwzDjXt3haNl6VMTtduiD7YnmYAHkn_ShrzxSoqQcoFcJJfcb86QFQEBQjmA50aRS3fn9jzVx9UorrX6lUWfjyAOGb11HhMy4VEUQ99xaYmhn9yZ_rTFik"
            />
            <div className="p-10 text-center space-y-4">
              <h3 className="font-headline-md text-[24px] text-on-surface">NovaMobile UX</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2">
                Designing next-gen mobile experiences for high-growth fintechs.
              </p>
              <a className="inline-flex items-center text-primary font-label-bold group" href="#">
                View Project <span className="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
