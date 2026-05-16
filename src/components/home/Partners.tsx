import React from "react";

export default function Partners() {
  const partners = ["VISA", "Mastercard", "PLAID", "Forbes", "Deloitte."];

  return (
    <section className="py-12 border-y border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-purple-600 font-semibold mb-8">Partner Companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <div key={index} className="text-2xl md:text-3xl font-bold text-gray-800">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
