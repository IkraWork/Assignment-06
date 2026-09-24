import Image from "next/image";
import Link from "next/link";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { ArrowRight } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

export const revalidate = 3600; // revalidate at most every hour

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return res.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="flex-1 flex flex-col">
      
      {/* Hero / Banner Section */}
      <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-900">
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 inline-block">Workout Library</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[1.1] text-white mb-6">
              Train with intent.<br />
              Log every set.
            </h1>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            
            <Link 
              href="#library"
              className="inline-flex items-center gap-2 bg-accent text-black font-bold uppercase tracking-wide px-8 py-4 rounded-md hover:bg-[#b3e600] transition-transform hover:-translate-y-1"
            >
              Browse Workouts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative w-full max-w-lg lg:max-w-xl aspect-square rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <Image 
              src="/assets/banner.png" 
              alt="FitLog Hero" 
              fill 
              priority
              className="object-cover"
            />
            {/* Gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          </div>
          
        </div>
      </section>

      {/* Library Section */}
      <WorkoutLibrary workouts={workouts} />

    </main>
  );
}
