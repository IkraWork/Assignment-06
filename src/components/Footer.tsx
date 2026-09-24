import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 mt-auto py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog Logo" width={24} height={24} className="object-contain" />
          <span className="font-display font-bold text-lg uppercase tracking-wider text-white">FitLog</span>
        </Link>

        {/* Right - Copyright */}
        <p className="text-neutral-500 text-sm text-center md:text-right">
          &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
