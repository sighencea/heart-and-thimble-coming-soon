import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
type ComingSoonLandingProps = Record<string, never>;

// @component: ComingSoonLanding
export const ComingSoonLanding = (_props: ComingSoonLandingProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  // @return
  return <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f5e6d3] px-6 py-12">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-8">
        <div className="w-48 h-48 relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M60 80 Q60 40, 100 40 Q140 40, 140 80 L140 100 Q140 140, 100 160 Q60 140, 60 100 Z" fill="none" stroke="#a07856" strokeWidth="2" className="animate-[draw_2s_ease-in-out]" />
            <circle cx="100" cy="110" r="20" fill="#8b7355" opacity="0.8" />
            <ellipse cx="85" cy="70" rx="8" ry="12" fill="#d4a5a5" opacity="0.7" />
            <ellipse cx="115" cy="70" rx="8" ry="12" fill="#d4a5a5" opacity="0.7" />
            <path d="M75 65 Q70 55, 65 60" stroke="#88a896" strokeWidth="2" fill="none" />
            <path d="M125 65 Q130 55, 135 60" stroke="#88a896" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl font-serif text-[#8b7355] tracking-wide">
            Heart & Thimble
          </h1>
          <p className="text-xl text-[#a07856] font-light">Coming Soon</p>
        </div>

        <p className="text-[#8b7355] text-base leading-relaxed max-w-sm">
          Something special is being crafted. Join our list to be the first to know when we launch.
        </p>

        {!isSubmitted ? <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-4 py-3 rounded-md border-2 border-[#a07856] bg-white/80 text-[#8b7355] placeholder:text-[#a07856]/50 focus:outline-none focus:border-[#8b7355] transition-colors" />
              <button type="submit" className="px-6 py-3 bg-[#8b7355] text-[#f5e6d3] rounded-md hover:bg-[#a07856] transition-colors font-medium whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </form> : <div className="w-full max-w-sm py-3 px-4 bg-[#88a896]/20 border-2 border-[#88a896] rounded-md">
            <p className="text-[#8b7355] font-medium">Thank you! We'll be in touch soon.</p>
          </div>}

        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#8b7355] hover:text-[#a07856] transition-colors group mt-6">
          <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Follow us on Instagram</span>
        </a>
      </div>
    </div>;
};