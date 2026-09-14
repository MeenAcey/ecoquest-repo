import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0b12] border-t border-[#3d4460]/40 text-[#a6a9b2] py-8 px-4 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[#ffd700] text-sm">✦</span>
            <span className="hoyo-title text-[#ece5d8] font-bold tracking-[2px] text-sm">
              ECOQUEST TRANSMUTATION MATRIX
            </span>
          </div>
          <p className="hoyo-serif text-xs italic text-[#6b7280] max-w-sm">
            Empowering humanity to decode discarded matter, revitalize earth ecosystems, and cultivate zero-waste planetary stewardship.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 hoyo-title text-xs tracking-widest text-[#d3bc8e]">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <Link href="/scanner" className="hover:text-white transition-colors">
            SCANNER
          </Link>
          <Link href="/history" className="hover:text-white transition-colors">
            ARCHIVES
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            LORE & INFO
          </Link>
        </div>

        {/* System Stamp */}
        <div className="flex flex-col items-center md:items-end text-[10px] tracking-[2px] text-[#6b7280] hoyo-title">
          <span className="text-[#d3bc8e] font-bold">TERRABYTE INITIATIVE</span>
          <span>EARTH DAY 2026 • v0.2.1</span>
        </div>

      </div>
    </footer>
  );
}
