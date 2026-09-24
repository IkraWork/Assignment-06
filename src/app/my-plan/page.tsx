"use client";

import { useWorkout } from "@/context/WorkoutContext";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Clock, Flame, Star, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function MyPlanContent() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useWorkout();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  
  // Hydration state check to avoid mismatch between server/client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const tab = searchParams.get("tab");
    if (tab === "saved") {
      setActiveTab("saved");
    }
  }, [searchParams]);

  const metrics = useMemo(() => {
    const totalExercises = plan.length;
    const totalMinutes = plan.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCalories = plan.reduce((acc, curr) => acc + curr.caloriesBurned, 0);
    return { totalExercises, totalMinutes, totalCalories };
  }, [plan]);

  if (!isMounted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <h2 className="text-xl font-medium text-neutral-300">Loading your plan...</h2>
      </div>
    );
  }

  const currentList = activeTab === "plan" ? plan : saved;

  const handleMarkAsDone = (id: number, name: string) => {
    markAsDone(id);
    toast.success(`Great job! Marked ${name} as done.`);
  };

  const handleRemove = (id: number, name: string, type: "plan" | "saved") => {
    if (type === "plan") {
      removeFromPlan(id);
      toast.success(`Removed ${name} from today's plan`);
    } else {
      removeFromSaved(id);
      toast.success(`Removed ${name} from saved`);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white mb-3">My Plan</h1>
        <p className="text-neutral-400 text-lg">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col">
          <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs mb-2">Exercises</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-white">{metrics.totalExercises}</span>
            <span className="text-neutral-400">/ 5</span>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col">
          <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs mb-2">Minutes</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-white">{metrics.totalMinutes}</span>
            <span className="text-neutral-400">min</span>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col">
          <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs mb-2">Calories</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-white">{metrics.totalCalories}</span>
            <span className="text-neutral-400">kcal</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 mb-8">
        <button 
          onClick={() => setActiveTab("plan")}
          className={`px-6 py-4 font-bold tracking-wide uppercase transition-colors border-b-2 ${activeTab === "plan" ? "border-accent text-accent" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
        >
          Today's Plan ({plan.length})
        </button>
        <button 
          onClick={() => setActiveTab("saved")}
          className={`px-6 py-4 font-bold tracking-wide uppercase transition-colors border-b-2 ${activeTab === "saved" ? "border-accent text-accent" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <h3 className="font-display text-2xl font-bold uppercase text-white mb-4">Nothing here yet</h3>
          <p className="text-neutral-400 mb-8 max-w-md">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-accent text-black font-bold uppercase tracking-wide px-8 py-4 rounded-md hover:bg-[#b3e600] transition-colors">
            Go to workouts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentList.map((workout) => (
            <div 
              key={workout.id} 
              className={`flex flex-col md:flex-row gap-6 bg-neutral-900 border ${workout.done ? "border-neutral-700 opacity-60" : "border-neutral-800"} rounded-xl p-4 transition-all`}
            >
              <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden flex-shrink-0 bg-neutral-800">
                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`font-display text-2xl font-bold uppercase tracking-wide ${workout.done ? "text-neutral-400 line-through" : "text-white"} mb-1`}>
                      {workout.name}
                    </h3>
                    
                    {/* Action Buttons for Card */}
                    <div className="flex items-center gap-2">
                      {activeTab === "plan" && !workout.done && (
                        <button 
                          onClick={() => handleMarkAsDone(workout.id, workout.name)}
                          title="Mark as Done"
                          className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-accent hover:bg-neutral-700 transition-colors"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleRemove(workout.id, workout.name, activeTab)}
                        title="Remove"
                        className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-red-400 hover:bg-neutral-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4">{workout.equipment}</p>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm font-medium text-neutral-300">{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm font-medium text-neutral-300">{workout.caloriesBurned} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-neutral-300">{workout.rating}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/workout/${workout.id}`}
                    className="text-sm font-bold uppercase tracking-widest text-accent hover:text-[#b3e600] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}

export default function MyPlan() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <h2 className="text-xl font-medium text-neutral-300">Loading your plan...</h2>
      </div>
    }>
      <MyPlanContent />
    </Suspense>
  );
}
