"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Bookmark, ListTodo } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog Logo" width={32} height={32} className="object-contain" />
          <span className="font-display font-bold text-xl uppercase tracking-wider text-white">FitLog</span>
        </Link>

        {/* Middle - Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link 
            href="/" 
            className={`transition-colors hover:text-white ${pathname === "/" ? "text-white font-semibold" : "text-neutral-400"}`}
          >
            Workout
          </Link>
          <Link 
            href="/my-plan" 
            className={`transition-colors hover:text-white ${pathname === "/my-plan" ? "text-white font-semibold" : "text-neutral-400"}`}
          >
            My Plan
          </Link>
        </div>

        {/* Right - Badges */}
        <div className="flex items-center gap-3">
          <Link href="/my-plan?tab=saved" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-600 text-sm font-medium hover:bg-neutral-800 transition-colors">
            <Bookmark className="w-4 h-4" />
            <span>Saved ({saved.length})</span>
          </Link>
          <Link href="/my-plan?tab=plan" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-black text-sm font-bold hover:bg-[#b3e600] transition-colors">
            <ListTodo className="w-4 h-4" />
            <span>Plan ({plan.length})</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
