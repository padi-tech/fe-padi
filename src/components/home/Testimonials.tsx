import React from "react";

const Testimonials = () => {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low/50">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-20">
          <h2 className="font-headline-md text-headline-md text-on-surface">Trusted by Industry Leaders</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-surface p-10 rounded-[32px] border border-outline-variant/10 text-center flex flex-col items-center space-y-8">
            <p className="font-body-md text-on-surface-variant italic leading-relaxed">
              "Paditech has completely transformed how we manage our internal operations. The efficiency gains were immediate."
            </p>
            <div className="flex flex-col items-center gap-3">
              <img
                alt="Marcus Chen"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvcVz15rZHpWvHAEm0zawY2RUTXgL0ikIJ2pWOPyBN5Ne_lNRVlEGlyXBbGQdph2dlj3YNJUH_yQi1qg7MQ-n5BpWirLMrK621PINYkiy6i4dpNfljlK5BjfLRqAoTpne0wWI7kd5yC4TIklxU6nf-OSv17bNO6ccf1h_JZgTcyexyJqa89Mcj1jfM37R0unn0wi0grV-_r65cE-xHlex0G6uHIoqsmgFFQlt1gk6bXw3KC27lnemcXNyX0_O2lQk2GIWotlcUj0c"
              />
              <div>
                <h4 className="font-label-bold text-on-surface">Marcus Chen</h4>
                <p className="text-[12px] text-on-surface-variant uppercase tracking-wider">CTO at TechVertex</p>
              </div>
            </div>
          </div>
          <div className="bg-surface p-10 rounded-[32px] border border-outline-variant/10 text-center flex flex-col items-center space-y-8">
            <p className="font-body-md text-on-surface-variant italic leading-relaxed">
              "The level of support and technical expertise provided by the team is unparalleled. They are truly partners in growth."
            </p>
            <div className="flex flex-col items-center gap-3">
              <img
                alt="Sarah Jenkins"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRqja_UEthLacqjbEYuYoWroWS3umPb573duD5_fXz7OlgcLL49wzq4sZWTiY08FUy64U1DR84elMqdWgmsUef9mb77rRJvaOMOnDQNjRkRTVzxAZxSgMBBNDjButF26c0cFZ7UoIkBSTep--8DX_5dHslGK_qLhUMxDDYFtCA68rnKa6QNz75aQIEZyiZv5y1qZt13hQTJY93B0cn4THisZW-dhYG2F6mp9hY2P3swnroS1s3QxCZgXsOeTeEOpibDeajYQe2q1Q"
              />
              <div>
                <h4 className="font-label-bold text-on-surface">Sarah Jenkins</h4>
                <p className="text-[12px] text-on-surface-variant uppercase tracking-wider">Director at Globalize</p>
              </div>
            </div>
          </div>
          <div className="bg-surface p-10 rounded-[32px] border border-outline-variant/10 text-center flex flex-col items-center space-y-8">
            <p className="font-body-md text-on-surface-variant italic leading-relaxed">
              "Clean UI, robust performance, and incredibly easy to scale. Paditech is the standard for modern enterprise applications."
            </p>
            <div className="flex flex-col items-center gap-3">
              <img
                alt="David Miller"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG2H0M7SpPkU3Za7erbztKTgGP2KXL0Xz8SJYC9v9-TZqtKthzVueTaoJDorZeaN-tkp3K3qXVm8HFiH8h-ysWzvHayIIRRwppH_8gPdtlr_E6v2ItzexrqcxvQNZ2Hn-Q74vJvzXbEgq2ToAvNPm-C--rwEy2I_DrrSUP_TL4OLIpOyYDuaU5pJFkSHHR5D0MJ3RrvzmkfqcOEFpJ48ttH7eoS5JyM6qbpgX16fWJoP-zgHWSndivKGXPOCMjwiNuzndmyP4KgqI"
              />
              <div>
                <h4 className="font-label-bold text-on-surface">David Miller</h4>
                <p className="text-[12px] text-on-surface-variant uppercase tracking-wider">Founder of StreamLink</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
