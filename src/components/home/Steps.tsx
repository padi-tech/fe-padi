import React from "react";

export default function Steps() {
  const steps = [
    {
      title: "Sign Up and Connect",
      desc: "Link your apps and wallets with enterprise-level encryption.",
      icon: "1"
    },
    {
      title: "Smart Insights",
      desc: "AI-backed recommendations tailored to your risk profile.",
      icon: "2"
    },
    {
      title: "Secure Sync",
      desc: "All your data in one place — encrypted and always up-to-date.",
      icon: "3"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-600 to-purple-900 text-white relative overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black opacity-5 pointer-events-none whitespace-nowrap">
        MANAGE
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <div className="bg-gray-900 rounded-[3rem] p-10 shadow-2xl text-white border border-gray-800">
              <div className="flex justify-between items-center mb-14">
                <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="text-purple-400">●</span> Project Balance
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center opacity-50">
                  ⤢
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-3 font-medium">Available Total Balance</p>
              <h3 className="text-5xl font-extrabold mb-14 tracking-tight">$ 47,586.32</h3>
              
              <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-full border border-gray-700 hover:bg-gray-800 transition text-sm font-semibold">
                  ⊙ Request
                </button>
                <button className="flex-1 py-4 rounded-full border border-gray-700 hover:bg-gray-800 transition text-sm font-semibold">
                  ⊙ Transfer
                </button>
                <button className="w-14 h-14 shrink-0 rounded-full bg-purple-500 hover:bg-purple-600 transition flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/30">
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-16 leading-tight">
              Start Managing Your<br />Projects in 3 Easy Steps
            </h2>
            
            <div className="space-y-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="w-16 h-16 rounded-full bg-purple-800/50 flex items-center justify-center text-2xl font-bold border border-purple-400 group-hover:bg-purple-400 group-hover:text-purple-900 transition-colors shrink-0 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                    <p className="text-purple-100 opacity-80 leading-relaxed text-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
