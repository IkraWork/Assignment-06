"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/context/WorkoutContext";
import { Clock, Flame, Star, ChevronDown } from "lucide-react";

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">("Duration");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Duration") return b.duration - a.duration;
    if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="library" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold text-white uppercase tracking-wide mb-2">The Library</h2>
            <p className="text-neutral-400">Twelve lifts covering every major muscle group.</p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 text-white px-4 py-2 rounded-md hover:border-neutral-500 transition-colors">
              <span>Sort By: {sortBy}</span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
              {(["Duration", "Calories", "Rating"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full text-left px-4 py-2 hover:bg-neutral-800 transition-colors ${sortBy === option ? "text-accent font-medium bg-neutral-800/50" : "text-neutral-300"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedWorkouts.map((workout) => (
            <Link key={workout.id} href={`/workout/${workout.id}`} className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-colors flex flex-col">
              
              {/* Image */}
              <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                <Image 
                  src={workout.image} 
                  alt={workout.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {workout.muscleGroups.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="font-display text-xl font-bold text-white mb-1 uppercase tracking-wide group-hover:text-accent transition-colors">{workout.name}</h3>
                <p className="text-sm text-neutral-400 mb-6">{workout.equipment}</p>
                
                {/* Stats Row */}
                <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-neutral-800">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-medium text-neutral-300">{workout.duration} min</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 border-x border-neutral-800">
                    <Flame className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-medium text-neutral-300">{workout.caloriesBurned} kcal</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-neutral-300">{workout.rating}</span>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
